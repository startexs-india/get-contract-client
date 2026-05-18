import Link from "next/link";
import {
    CalendarDays,
    Eye,
    FileText,
    Search,
} from "lucide-react";

export const metadata = {
    title: "Applied Tenders | BidSmartAI",

    description:
        "View and track all applied tenders and their current application status.",
};

interface AppliedTender {
    id: string;
    tenderId: string;
    title: string;
    department: string;
    appliedDate: string;
    closingDate: string;
    status:
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Rejected";
}

const appliedTenders: AppliedTender[] = [
    {
        id: "1",
        tenderId: "TN-2026-001",
        title:
            "Road Construction Project Phase 2",
        department:
            "Public Works Department",
        appliedDate: "18 May 2026",
        closingDate: "30 May 2026",
        status: "Submitted",
    },

    {
        id: "2",
        tenderId: "TN-2026-002",
        title:
            "Smart City Electrical Installation",
        department:
            "Urban Development Authority",
        appliedDate: "14 May 2026",
        closingDate: "28 May 2026",
        status: "Under Review",
    },

    {
        id: "3",
        tenderId: "TN-2026-003",
        title:
            "Bridge Maintenance Contract",
        department:
            "Infrastructure Board",
        appliedDate: "10 May 2026",
        closingDate: "22 May 2026",
        status: "Approved",
    },

    {
        id: "4",
        tenderId: "TN-2026-004",
        title:
            "Government School Renovation",
        department:
            "Education Department",
        appliedDate: "08 May 2026",
        closingDate: "20 May 2026",
        status: "Rejected",
    },
];

const getStatusStyles = (
    status: AppliedTender["status"]
) => {
    switch (status) {
        case "Submitted":
            return "bg-blue-100 text-blue-700";

        case "Under Review":
            return "bg-yellow-100 text-yellow-700";

        case "Approved":
            return "bg-green-100 text-green-700";

        case "Rejected":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function AppliedTendersPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6">
                {/* Search */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            My Applications
                        </h2>

                        <p className="text-slate-500 mt-2">
                            All tender applications in one
                            place
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="flex items-center">
                        <div className="relative w-full md:w-[350px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

                            <input
                                type="text"
                                placeholder="Search tenders..."
                                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 text-center">
                                <h3 className="text-xl font-bold">
                                    24
                                </h3>

                                <p className="text-gray-700 mt-1 text-sm">
                                    Total Applied
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 text-center">
                                <h3 className="text-xl font-bold">
                                    8
                                </h3>

                                <p className="text-gray-700 mt-1 text-sm">
                                    Under Review
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
                    <table className="w-full min-w-[1000px]">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                    Tender ID
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                    Tender Name
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                    Applied Date
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                    Closing Date
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {appliedTenders.map(
                                (tender) => (
                                    <tr
                                        key={tender.id}
                                        className="border-t border-slate-200 hover:bg-slate-50 transition"
                                    >
                                        {/* Tender ID */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-blue-600" />

                                                <span className="font-medium text-slate-800">
                                                    {
                                                        tender.tenderId
                                                    }
                                                </span>
                                            </div>
                                        </td>

                                        {/* Title */}
                                        <td className="px-6 py-5">
                                            <h3 className="font-medium text-slate-800">
                                                {tender.title}
                                            </h3>
                                        </td>

                                        {/* Department */}
                                        <td className="px-6 py-5 text-slate-600">
                                            {
                                                tender.department
                                            }
                                        </td>

                                        {/* Applied Date */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <CalendarDays className="w-4 h-4" />

                                                {
                                                    tender.appliedDate
                                                }
                                            </div>
                                        </td>

                                        {/* Closing Date */}
                                        <td className="px-6 py-5 text-slate-600">
                                            {
                                                tender.closingDate
                                            }
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyles(
                                                    tender.status
                                                )}`}
                                            >
                                                {tender.status}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-5 text-center">
                                            <Link
                                                href={`/tenders/${tender.id}`}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#2e5f9b] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#084c9d] transition"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )}

                            {/* Empty State */}
                            {appliedTenders.length ===
                                0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-12 text-center text-slate-500"
                                        >
                                            No applied tenders
                                            found.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}