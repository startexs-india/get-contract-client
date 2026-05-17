"use client";
import React from "react";

export default function RequiredAttachmentsSection({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Required Attachment</h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-4 py-2 text-left">
                                Supporting Document
                            </th>
                            <th className="border px-4 py-2 text-center">Mandatory</th>
                            <th className="border px-4 py-2 text-center">
                                Allow Exemption
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Attachment Group
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Evaluation Type
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                    {item.supportingDocument}
                                </td>

                                <td className="border px-4 py-2 text-center font-semibold">
                                    {item.mandatory}
                                </td>

                                <td className="border px-4 py-2 text-center font-semibold">
                                    {item.allowExemption}
                                </td>

                                <td className="border px-4 py-2 text-center">
                                    {item.group}
                                </td>

                                <td className="border px-4 py-2 text-center">
                                    {item.evaluationType}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}