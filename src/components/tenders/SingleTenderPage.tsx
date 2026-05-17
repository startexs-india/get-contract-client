"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Loader from "@/components/common/Loader";

import BoqSection from "../TenderSections/BoqSection";
import RequiredAttachmentsSection from "../TenderSections/RequiredAttachmentsSection";
import GeneralInfoSection from "../TenderSections/GeneralInfoSection";
import DateScheduleSection from "../TenderSections/DateScheduleSection";
import PreBidSection from "../TenderSections/PreBidSection";
import PaymentsSection from "../TenderSections/PaymentsSection";
import GeneralParticularsSection from "../TenderSections/GeneralParticularsSection";
import TermsConditionsSection from "../TenderSections/TermsConditionsSection";
import AttachmentsSection from "../TenderSections/AttachmentsSection.tsx";
import { X } from "lucide-react";

interface TenderData {
    tenderId?: string;
    externalSystemDisplayTenderId?: string;

    generalInformation?: any;
    dateSchedule?: any;
    preBidDiscussion?: any;

    payments?: any[];
    generalParticulars?: any[];
    termsAndConditions?: any[];
    attachments?: any[];
    requiredAttachments?: any[];
    boq?: any[];
}

interface SingleTenderViewPageProps {
    tender_id: string;
    onClose: () => void;
}

export default function SingleTenderViewPage({
    tender_id,
    onClose,
}: SingleTenderViewPageProps) {

    const [editMode, setEditMode] =
        useState<boolean>(false);

    const [tenderData, setTenderData] =
        useState<TenderData | null>(null);

    const [form, setForm] =
        useState<TenderData | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [errorMessage, setErrorMessage] =
        useState<string>("");

    const [updateLoading, setUpdateLoading] =
        useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement | null>(
        null
    );

    const fetchData = async () => {
        if (!tender_id) {
            setErrorMessage("Tender ID required");
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/tender/${tender_id}`
            );

            if (response?.data?.success) {
                const tender = response.data.data;

                setTenderData(tender);

                setForm({
                    ...tender,

                    generalInformation:
                        tender.generalInformation || {},

                    dateSchedule:
                        tender.dateSchedule || {},

                    preBidDiscussion:
                        tender.preBidDiscussion || {},

                    payments: tender.payments || [],

                    generalParticulars:
                        tender.generalParticulars || [],

                    termsAndConditions:
                        tender.termsAndConditions || [],

                    attachments:
                        tender.attachments || [],

                    requiredAttachments:
                        tender.requiredAttachments || [],

                    boq: tender.boq || [],
                });
            } else {
                setErrorMessage(
                    response?.data?.message ||
                    "Something went wrong"
                );
            }
        } catch (err: any) {
            setErrorMessage(
                "Error: " + err.message
            );
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [tender_id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorMessage) {
                setErrorMessage("");
                onClose();
            }
        }, 1000);

        const closeModal = (
            e: MouseEvent
        ) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(
                    e.target as Node
                )
            ) {
                onClose();
            }
        };

        document.addEventListener(
            "mousedown",
            closeModal
        );

        return () => {
            clearTimeout(timer);

            document.removeEventListener(
                "mousedown",
                closeModal
            );
        };
    }, [errorMessage, onClose]);

    const updateArray = (
        section: keyof TenderData,
        index: number,
        key: string,
        value: any
    ) => {
        setForm((prev) => {
            if (!prev) return prev;

            const sectionData = [
                ...(prev[section] as any[]),
            ];

            sectionData[index] = {
                ...sectionData[index],
                [key]: value,
            };

            return {
                ...prev,
                [section]: sectionData,
            };
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
            {loading ? (
                <div
                    ref={modalRef}
                    className="w-full h-full flex items-center justify-center"
                >
                    <Loader />
                </div>
            ) : errorMessage ? (
                <div
                    ref={modalRef}
                    className="rounded-xl border-2 border-red-500 bg-red-100 px-6 py-5 text-red-700 shadow-xl"
                >
                    <h2 className="text-lg font-semibold">
                        {errorMessage}
                    </h2>
                </div>
            ) : (
                <div
                    ref={modalRef}
                    className="w-full max-w-7xl h-[95vh] overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4 text-white">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Tender Details
                            </h1>

                            <p className="mt-1 text-sm text-blue-100">
                                Tender ID:{" "}
                                {form?.tenderId || "N/A"}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-full p-2 transition hover:bg-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 p-6">
                        {form && (
                            <>
                                <GeneralInfoSection
                                    data={{
                                        ...form.generalInformation,
                                        externalSystemDisplayTenderId:
                                            form?.externalSystemDisplayTenderId,
                                    }}
                                />

                                <DateScheduleSection
                                    data={form.dateSchedule}
                                />

                                <PreBidSection
                                    data={form.preBidDiscussion}
                                />

                                <PaymentsSection
                                    data={form.payments}
                                />

                                <GeneralParticularsSection
                                    data={
                                        form.generalParticulars
                                    }
                                />

                                <TermsConditionsSection
                                    data={
                                        form.termsAndConditions
                                    }
                                />

                                <AttachmentsSection
                                    data={form.attachments}
                                />

                                <RequiredAttachmentsSection
                                    data={
                                        form.requiredAttachments
                                    }
                                />

                                <BoqSection
                                    data={form.boq}
                                />
                            </>
                        )}
                    </div>

                    {/* Loading Overlay */}
                    {updateLoading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <Loader />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}