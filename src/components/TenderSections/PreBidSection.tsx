"use client";

import React from "react";

interface DateField {
    raw?: string;
    formatted?: string;
}

interface PreBidData {
    discussionType?: string;
    meetingStartDate?: DateField;
    meetingEndDate?: DateField;
    venue?: string;
    remarks?: string;
}

interface PreBidSectionProps {
    data?: PreBidData;
}

interface InputRowProps {
    label: string;
    value?: string;
}

interface DateRowProps {
    label: string;
    value?: DateField;
}

export default function PreBidSection({
    data = {},
}: PreBidSectionProps) {
    const {
        discussionType,
        meetingStartDate,
        meetingEndDate,
        venue,
        remarks,
    } = data;

    const getFormatted = (
        obj?: DateField
    ): string => {
        return obj?.formatted ?? obj?.raw ?? "N/A";
    };

    const renderInput = ({
        label,
        value,
    }: InputRowProps) => (
        <div className="border border-slate-200 p-4 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-slate-50 transition-colors">
            <div className="text-sm font-semibold text-slate-600 min-w-[180px]">
                {label}
                <span className="text-slate-900 font-bold ml-1">
                    :
                </span>
            </div>

            <div className="text-slate-800 text-sm">
                {value || "N/A"}
            </div>
        </div>
    );

    const renderDate = ({
        label,
        value,
    }: DateRowProps) => (
        <div className="border border-slate-200 p-4 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-slate-50 transition-colors">
            <div className="text-sm font-semibold text-slate-600 min-w-[180px]">
                {label}
                <span className="text-slate-900 font-bold ml-1">
                    :
                </span>
            </div>

            <div className="text-slate-800 text-sm">
                {getFormatted(value)}
            </div>
        </div>
    );

    return (
        <div className="mt-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Pre-Bid Discussion
            </h2>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                {renderInput({
                    label: "Discussion Type",
                    value: discussionType,
                })}

                {renderInput({
                    label: "Venue",
                    value: venue,
                })}

                {renderDate({
                    label: "Meeting Start Date",
                    value: meetingStartDate,
                })}

                {renderDate({
                    label: "Meeting End Date",
                    value: meetingEndDate,
                })}
            </div>

            {/* Remarks */}
            <div className="border border-t-0 border-slate-200 rounded-b-2xl overflow-hidden shadow-sm bg-white">
                {renderInput({
                    label: "Remarks",
                    value: remarks,
                })}
            </div>
        </div>
    );
}