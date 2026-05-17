/**
 * encryptedBaseQuery
 *
 * Drop-in replacement for fetchBaseQuery that transparently:
 *   - ENCRYPTS outgoing request bodies  →  { payload: "<CryptoJS base64>" }
 *   - DECRYPTS incoming responses       ←  { data: "<base64url>" }
 *
 * Controlled by a single env var:
 *   NEXT_PUBLIC_ENCRYPT_PAYLOAD=true   → encryption ON
 *   (anything else / unset)            → pass-through, behaves like normal fetchBaseQuery
 *
 * Bypass routes (never encrypted — matches backend bypass list):
 *   /debug/decrypt, /health, /public/*
 *
 * Usage: replace fetchBaseQuery with encryptedBaseQuery in baseApi.ts — nothing else changes.
 */

import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { encryptBody, decryptResponse } from '@/lib/encryption';
import type { RootState } from '@/store/store';

// ── config ────────────────────────────────────────────────────────────────────

const ENCRYPTION_ENABLED =
    process.env.NEXT_PUBLIC_ENCRYPT_PAYLOAD === 'true';

const BYPASS_PREFIXES = ['/debug', '/health', '/public'];

function isBypassed(url: string): boolean {
    const path = url.startsWith('http')
        ? new URL(url).pathname
        : url;

    return BYPASS_PREFIXES.some((prefix) =>
        path.startsWith(prefix)
    );
}

// ── raw base query (handles auth headers) ────────────────────────────────────

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');

        return headers;
    },
});

// ── encrypted base query ──────────────────────────────────────────────────────

const encryptedBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    let modifiedArgs: FetchArgs =
        typeof args === 'string'
            ? { url: args }
            : { ...args };

    const url = modifiedArgs.url ?? '';

    // ── encrypt request body ────────────────────────────────────────────────

    if (
        ENCRYPTION_ENABLED &&
        !isBypassed(url) &&
        modifiedArgs.body !== undefined
    ) {
        try {
            modifiedArgs = {
                ...modifiedArgs,
                body: encryptBody(modifiedArgs.body),
            };
        } catch (err) {
            return {
                error: {
                    status: 'CUSTOM_ERROR',
                    error: 'Request encryption failed',
                },
            };
        }
    }

    // ── execute request ─────────────────────────────────────────────────────

    const result = await rawBaseQuery(
        modifiedArgs,
        api,
        extraOptions
    );

    // ── if request failed, return immediately ──────────────────────────────

    if ('error' in result) {
        return result;
    }

    // ── decrypt response ────────────────────────────────────────────────────

    if (
        ENCRYPTION_ENABLED &&
        !isBypassed(url) &&
        result.data
    ) {
        const responseData = result.data as Record<string, unknown>;

        if (
            typeof responseData.data === 'string' &&
            responseData.data.startsWith('U2Fsd')
        ) {
            try {
                const decrypted = decryptResponse(responseData.data);

                return {
                    data: decrypted,
                    meta: result.meta,
                };
            } catch (err) {
                return {
                    error: {
                        status: 'CUSTOM_ERROR',
                        error: 'Response decryption failed',
                    },
                };
            }
        }
    }

    return result;
};

export default encryptedBaseQuery;