import Link from "next/link";
import {
    Download,
    FileText,
} from "lucide-react";

export const metadata = {
    title: "Circulars | BidSmartAI",

    description:
        "Browse and download latest company circulars, announcements, and important notices.",
};

interface Circular {
    id: number;
    title: string;
    postDate: string;
    fileUrl: string;
}

const circulars: Circular[] = [
    {
        id: 1,
        title:
            "New Tender Submission Guidelines 2026",
        postDate: "18 May 2026",
        fileUrl: "/documents/sample.pdf",
    },

    {
        id: 2,
        title:
            "Vendor Registration Process Update",
        postDate: "15 May 2026",
        fileUrl: "/documents/sample.pdf",
    },

    {
        id: 3,
        title:
            "Mandatory Compliance Document Notice",
        postDate: "10 May 2026",
        fileUrl: "/documents/sample.pdf",
    },

    {
        id: 4,
        title:
            "Upcoming Procurement Policy Changes",
        postDate: "05 May 2026",
        fileUrl: "/documents/sample.pdf",
    },
];

export default function CircularsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r text-black">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="max-w-3xl">
                        <p className="uppercase tracking-[0.3em] text-gray-800 text-sm font-semibold mb-4">
                            Official Notices
                        </p>

                        <h1 className="text-5xl font-bold leading-tight">
                            Circulars & Announcements
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            Stay updated with the latest
                            circulars, notices, procurement
                            updates, and important company
                            announcements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5 bg-slate-50">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <FileText className="text-blue-700" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Latest Circulars
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                Download official circulars
                                and notices
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        S.No
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        Circular Name
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        Post Date
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                        Download
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {circulars.map(
                                    (circular, index) => (
                                        <tr
                                            key={circular.id}
                                            className="border-t border-slate-200 hover:bg-slate-50 transition"
                                        >
                                            {/* Serial */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {index + 1}
                                            </td>

                                            {/* Title */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1">
                                                        <FileText className="w-5 h-5 text-blue-600" />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium text-slate-800">
                                                            {
                                                                circular.title
                                                            }
                                                        </h3>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {
                                                    circular.postDate
                                                }
                                            </td>

                                            {/* Download */}
                                            <td className="px-6 py-5 text-center">
                                                <Link
                                                    href={
                                                        circular.fileUrl
                                                    }
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
                                                >
                                                    <Download size={16} />
                                                    Download
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )}

                                {/* Empty State */}
                                {circulars.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-10 text-center text-slate-500"
                                        >
                                            No circulars available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
}