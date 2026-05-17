"use client";
import { HoverText } from "@/utils/HoverText";
import React from "react";

// Define the types for the data
interface Category {
    label?: string;
    categoryDescription?: string;
}

interface FormattedDate {
    formatted?: string;
}

interface TenderData {
    tenderTitle?: string;
    tenderReferenceNo?: string;
    systemTenderNo?: string;
    tenderType?: string;
    procurementCategory?: string;
    tenderCurrency?: string;
    biddingCurrency?: string;
    estimatedValueVisibilityFlag?: string;
    minimumNumberOfBids?: number;
    rankingSequence?: string;
    offerValidityInDays?: number;
    tenderCreator?: string;
    tenderIssuingAuthorityName?: string;
    tenderApprovingAuthorityName?: string;
    detailedDescription?: string;
    externalSystemDisplayTenderId?: string;
    shortTenderReason?: string;
    NIT?: string;
    organizationHierarchy?: string[];
    category?: Category;
    createdOn?: FormattedDate;
}

interface GeneralInfoSectionProps {
    data?: TenderData;
}

export default function GeneralInfoSection({ data = {} }: GeneralInfoSectionProps) {
    const {
        tenderTitle,
        tenderReferenceNo,
        systemTenderNo,
        tenderType,
        procurementCategory,
        tenderCurrency,
        biddingCurrency,
        estimatedValueVisibilityFlag,
        minimumNumberOfBids,
        rankingSequence,
        offerValidityInDays,
        tenderCreator,
        tenderIssuingAuthorityName,
        tenderApprovingAuthorityName,
        detailedDescription,
        externalSystemDisplayTenderId,
        shortTenderReason,
        NIT,
        organizationHierarchy,
        category,
        createdOn,
    } = data;

    interface RenderFieldProps {
        label: string;
        keyName: string;
        value: any;
        isTextArea?: boolean;
    }

    const renderField = ({ label, keyName, value, isTextArea = false }: RenderFieldProps) => (
        <div className="border p-3 flex gap-4">
            <div className="text-sm font-semibold text-gray-600 min-w-[180px]">
                {label}
                <span className="text-black font-semibold text-lg ml-1">:</span>
            </div>
            <div className="text-gray-800">
                {value ?? "N/A"}
            </div>
        </div>
    );

    // Helper function to render hover text for tender title
    const renderHoverText = (text?: string, maxLength: number = 50) => {
        if (!text) return "N/A";
        return <HoverText text={text} maxLength={maxLength} />;
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">General Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300">
                <div className="border p-3 flex gap-4">
                    <div className="text-sm font-semibold text-gray-600 min-w-[180px]">
                        Tender Title
                        <span className="text-black font-semibold text-lg ml-1">:</span>
                    </div>
                    <div className="text-gray-800">
                        {renderHoverText(tenderTitle, 50)}
                    </div>
                </div>

                {renderField({ label: "Reference No.", keyName: "tenderReferenceNo", value: tenderReferenceNo })}

                <div className="border p-3 flex gap-4">
                    <div className="text-sm font-semibold text-gray-600 min-w-[180px]">
                        System Tender No.
                        <span className="text-black font-semibold text-lg ml-1">:</span>
                    </div>
                    <div className="text-gray-800">
                        {externalSystemDisplayTenderId || "N/A"}
                    </div>
                </div>

                {renderField({ label: "Tender Type", keyName: "tenderType", value: tenderType })}
                {renderField({ label: "Procurement Category", keyName: "procurementCategory", value: procurementCategory })}
                {renderField({ label: "Tender Currency", keyName: "tenderCurrency", value: tenderCurrency })}
                {renderField({ label: "Bidding Currency", keyName: "biddingCurrency", value: biddingCurrency })}
                {renderField({ label: "Estimated Value Visibility", keyName: "estimatedValueVisibilityFlag", value: estimatedValueVisibilityFlag })}
                {renderField({ label: "Minimum Bids", keyName: "minimumNumberOfBids", value: minimumNumberOfBids })}
                {renderField({ label: "Ranking Sequence", keyName: "rankingSequence", value: rankingSequence })}
                {renderField({ label: "Offer Validity (Days)", keyName: "offerValidityInDays", value: offerValidityInDays })}
                {renderField({ label: "Tender Creator", keyName: "tenderCreator", value: tenderCreator })}
                {renderField({ label: "Issuing Authority", keyName: "tenderIssuingAuthorityName", value: tenderIssuingAuthorityName })}
                {renderField({ label: "Approving Authority", keyName: "tenderApprovingAuthorityName", value: tenderApprovingAuthorityName })}
            </div>

            {/* Extra details in full width */}
            <div className="border border-t-0 border-gray-300">
                <div className="border px-3 py-3">
                    <span className="text-sm font-semibold text-gray-600">
                        Department:
                    </span>
                    <span className="ml-2 text-gray-800">
                        {Array.isArray(organizationHierarchy) && organizationHierarchy.length > 0
                            ? organizationHierarchy.join(" › ")
                            : "N/A"}
                    </span>
                </div>

                <div className="border px-3 py-3">
                    <span className="text-sm font-semibold text-gray-600">
                        Category:
                    </span>
                    <span className="ml-2 text-gray-800">
                        {category?.label ?? "N/A"}{" "}
                        {category?.categoryDescription
                            ? `- ${category.categoryDescription}`
                            : ""}
                    </span>
                </div>

                <div className="border px-3 py-3">
                    <span className="text-sm font-semibold text-gray-600">
                        Created On:
                    </span>
                    <span className="ml-2 text-gray-800">
                        {createdOn?.formatted ?? "N/A"}
                    </span>
                </div>

                {renderField({
                    label: "Short Tender Reason",
                    keyName: "shortTenderReason",
                    value: shortTenderReason,
                    isTextArea: true
                })}

                {renderField({
                    label: "Detailed Description",
                    keyName: "detailedDescription",
                    value: detailedDescription,
                    isTextArea: true
                })}

                {renderField({ label: "NIT", keyName: "NIT", value: NIT, isTextArea: true })}
            </div>
        </div>
    );
}