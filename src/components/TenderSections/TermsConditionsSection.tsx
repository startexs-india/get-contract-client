"use client";
import React from "react";

export default function TermsConditionsSection({
    data = []
}) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Terms & Conditions</h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-4 py-2 text-left">Clause No</th>
                            <th className="border px-4 py-2 text-left">Specification</th>
                            <th className="border px-4 py-2 text-center">Attachment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {/* Clause No */}
                                <td className="border px-4 py-2">
                                    {item.clauseNo || "—"}
                                </td>

                                {/* Specification */}
                                <td className="border px-4 py-2">
                                    {item.specification || "—"}
                                </td>

                                {/* Attachment */}
                                <td className="border px-4 py-2 text-center">
                                    {item.attachment ? (
                                        <a
                                            href={item.attachment}
                                            target="_blank"
                                            className="text-blue-600 underline"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}