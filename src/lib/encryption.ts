/**
 * Encryption utility — mirrors the backend's CryptoJS AES middleware exactly.
 *
 * Backend uses:
 *   CryptoJS.AES.encrypt(plain, passphrase).toString()  → standard base64
 *   CryptoJS.AES.decrypt(base64, passphrase).toString(CryptoJS.enc.Utf8)
 *
 * Response from backend comes as base64url (+ → -, / → _, no =).
 * Request payload goes as standard CryptoJS base64.
 *
 * Install: npm install crypto-js && npm install --save-dev @types/crypto-js
 */

import CryptoJS from 'crypto-js';

const PASSPHRASE = process.env.NEXT_PUBLIC_ENCRYPT_PASS ?? '';

// ── base64 ↔ base64url helpers ────────────────────────────────────────────────

export function base64ToBase64Url(b64: string): string {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64UrlToBase64(b64url: string): string {
  let s = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return s;
}

// ── core encrypt / decrypt ────────────────────────────────────────────────────

/**
 * Encrypt a plain string → CryptoJS standard base64 (what backend expects in payload).
 */
export function encryptString(plain: string): string {
  if (!PASSPHRASE) throw new Error('NEXT_PUBLIC_ENCRYPT_PASS is not set');
  return CryptoJS.AES.encrypt(plain, PASSPHRASE).toString();
}

/**
 * Decrypt a CryptoJS base64 or base64url string → plain string.
 * Accepts both formats (backend sends base64url in responses).
 */
export function decryptString(cipher: string): string {
  if (!PASSPHRASE) throw new Error('NEXT_PUBLIC_ENCRYPT_PASS is not set');
  // normalise: if it looks like base64url convert it first
  const b64 = cipher.includes('-') || cipher.includes('_')
    ? base64UrlToBase64(cipher)
    : cipher;
  const bytes = CryptoJS.AES.decrypt(b64, PASSPHRASE);
  const plain = bytes.toString(CryptoJS.enc.Utf8);
  if (!plain) throw new Error('Decryption failed — bad passphrase or corrupted ciphertext');
  return plain;
}

// ── JSON helpers (used by the base query) ─────────────────────────────────────

/** Wrap any JSON-serialisable body as { payload: "<encrypted base64>" } */
export function encryptBody(body: unknown): { payload: string } {
  return { payload: encryptString(JSON.stringify(body)) };
}

/**
 * Decrypt a backend response.
 * Backend sends: { data: "<base64url>" }
 * Returns the parsed JSON object inside.
 */
export function decryptResponse<T = unknown>(data: string): T {
  const plain = decryptString(data);
  return JSON.parse(plain) as T;
}