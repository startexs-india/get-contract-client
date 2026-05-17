"use client";

import React from "react";
import { formatDateTime } from "@/utils/formatDate";

interface DateField {
    raw?: string;
    formatted?: string;
}

interface DateScheduleData {
    bidSubmissionStartDate?: DateField;
    bidSubmissionDueDate?: DateField;
    bidOpenDate?: DateField;
    physicalDocSubmissionEndDate?: DateField;
}

interface DateScheduleSectionProps {
    data?: DateScheduleData;
}

interface RowItem {
    label: string;
    key: keyof DateScheduleData;
    value?: DateField;
}

export default function DateScheduleSection({
    data = {},
}: DateScheduleSectionProps) {

    const getFormatted = (
        obj?: DateField
    ): string => {
        return obj?.formatted ?? obj?.raw ?? "—";
    };

    const rows: RowItem[] = [
        {
            label: "Bid Submission Start Date",
            key: "bidSubmissionStartDate",
            value: data.bidSubmissionStartDate,
        },
        {
            label: "Bid Submission Due Date",
            key: "bidSubmissionDueDate",
            value: data.bidSubmissionDueDate,
        },
        {
            label: "Bid Open Date",
            key: "bidOpenDate",
            value: data.bidOpenDate,
        },
        {
            label: "Physical Doc Submission End Date",
            key: "physicalDocSubmissionEndDate",
            value: data.physicalDocSubmissionEndDate,
        },
    ];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
                Date Schedule
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
                                Event
                            </th>

                            <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
                                Date & Time
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-slate-50 transition-colors"
                            >
                                {/* Label */}
                                <td className="border-b border-slate-100 px-4 py-3 font-medium text-slate-700">
                                    {row.label}
                                </td>

                                {/* Value */}
                                <td className="border-b border-slate-100 px-4 py-3 text-slate-600">
                                    {formatDateTime(
                                        getFormatted(row.value)
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