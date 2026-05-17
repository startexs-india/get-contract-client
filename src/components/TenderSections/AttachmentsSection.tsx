"use client";
import React from "react";

export default function AttachmentsSection({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Attachments</h2>

            {data.map((item, idx) => (
                <div
                    key={idx}
                    className="border border-gray-300 rounded mb-3 grid grid-cols-1 md:grid-cols-2"
                >
                    {["label", "fileName", "filePath"].map((field) => (
                        <div key={field} className="border p-3 flex gap-4">
                            <div className="text-sm font-semibold text-gray-600 min-w-[140px]">
                                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                                <span className="text-black font-semibold text-lg ml-1">:</span>
                            </div>

                            <div className="text-gray-800 break-all">
                                {item[field] ?? "N/A"}
                            </div>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
