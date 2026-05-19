'use client';

import React from 'react';

interface WithdrawModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    tender: {
        tenderId?: string;
        title?: string;
        department?: string;
    } | null;
}

export default function WithdrawModal({
    open,
    onClose,
    onConfirm,
    loading = false,
    tender,
}: WithdrawModalProps) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            {/* MODAL */}
            <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* HEADER */}
                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Withdraw Application
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Please confirm before withdrawing
                        this tender application.
                    </p>
                </div>

                {/* BODY */}
                <div className="px-6 py-5 space-y-5">

                    {/* TENDER DETAILS */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        {/* Tender ID */}
                        <div className="mb-4">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Tender ID
                            </p>

                            <h3 className="mt-1 font-semibold text-slate-800">
                                {tender?.tenderId || 'N/A'}
                            </h3>
                        </div>

                        {/* Tender Name */}
                        <div className="mb-4">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Tender Name
                            </p>

                            <h3 className="mt-1 font-semibold text-slate-800">
                                {tender?.title || 'N/A'}
                            </h3>
                        </div>

                        {/* Department */}
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Department
                            </p>

                            <h3 className="mt-1 font-semibold text-slate-800">
                                {tender?.department || 'N/A'}
                            </h3>
                        </div>
                    </div>

                    {/* WARNING */}
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                        <p className="text-sm leading-relaxed text-red-700">
                            Are you sure you want to
                            withdraw this application?
                            This action may not be reversible.
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    {/* CANCEL */}
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        No
                    </button>

                    {/* CONFIRM */}
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? 'Withdrawing...'
                            : 'Yes, Withdraw'}
                    </button>
                </div>
            </div>
        </div>
    );
}