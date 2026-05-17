"use client";
import React from "react";

export default function PaymentsSection({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Payments</h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-4 py-2 text-left">Payment Type</th>
                            <th className="border px-4 py-2 text-right">Amount</th>
                            <th className="border px-4 py-2 text-center">Mode</th>
                            <th className="border px-4 py-2 text-center">Currency</th>
                            <th className="border px-4 py-2 text-center">
                                Exemption Allowed
                            </th>
                            <th className="border px-4 py-2 text-left">
                                Exemption Reason
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((payment, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {/* Payment Type */}
                                <td className="border px-4 py-2">
                                    {payment.paymentType || "—"}
                                </td>

                                {/* Amount */}
                                <td className="border px-4 py-2 text-right">
                                    {payment.amount ?? "—"}
                                </td>

                                {/* Payment Mode */}
                                <td className="border px-4 py-2 text-center">
                                    {payment.paymentMode || "—"}
                                </td>

                                {/* Currency */}
                                <td className="border px-4 py-2 text-center">
                                    {payment.paymentCurrency || "—"}
                                </td>

                                {/* Exemption Allowed */}
                                <td className="border px-4 py-2 text-center">
                                    {payment.exemptionAllowed === "Y" ? "Yes" : "No"}
                                </td>

                                {/* Exemption Reason */}
                                <td className="border px-4 py-2">
                                    {payment.exemptionReason || "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}