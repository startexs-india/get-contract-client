"use client";
import { formatDateTime } from "@/utils/formatDate";
import { FaEye } from "react-icons/fa";

export default function TenderCard({ tender, onOpenTender }) {

    const description = tender?.description || "Untitled Tender";

    const department =
        tender?.department?.join(" → ") || "Not Available";

    const deadline =
        tender?.endDate?.formatted || "No Deadline";

    const status = tender?.status || "UNKNOWN";

    return (
        <tr className="hover:bg-gray-200 transition-all text-sm w-full">

            {/* Tender ID */}
            <td className="pl-5 font-semibold text-gray-700">
                <span
                    title={tender?.externalSystemDisplayTenderId}
                    className="block truncate max-w-full"
                >
                    {tender?.externalSystemDisplayTenderId}
                </span>
            </td>

            {/* DESCRIPTION */}
            <td className="p-2 font-semibold text-gray-700">
                <span
                    title={description}
                    className="block truncate max-w-full"
                >
                    {description}
                </span>
            </td>

            {/* AMOUNT */}
            <td className="p-2 text-gray-700">
                <span
                    title={tender?.amount}
                    className="block truncate max-w-full"
                >
                    {tender?.amount ? `$${tender.amount}` : "Not Available"}
                </span>
            </td>

            {/* REFERENCE NO */}
            <td className="p-2 text-gray-600">
                <span
                    title={tender?.tenderReferenceNo}
                    className="block truncate max-w-full"
                >
                    {tender?.tenderReferenceNo}
                </span>
            </td>

            {/* DEPARTMENT */}
            <td className="p-2 text-gray-600">
                <span
                    title={department}
                    className="block truncate max-w-full"
                >
                    {department}
                </span>
            </td>

            {/* DEADLINE */}
            <td className="p-2 text-gray-700">
                {formatDateTime(deadline)}
            </td>

            {/* ACTION */}
            <td className="pr-5 p-2 flex justify-end items-center">
                <button
                    onClick={() => onOpenTender(tender._id)}
                    className="px-3 py-2 bg-[#2e5f9b] hover:bg-[#084c9d] text-white rounded-lg transition-all flex items-center gap-1"
                >
                    <FaEye size={18} />
                </button>
            </td>

        </tr>
    );
}