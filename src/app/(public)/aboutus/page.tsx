import Link from "next/link";
import {
    ArrowRight,
    Building2,
    ShieldCheck,
    Target,
    Users,
} from "lucide-react";

export const metadata = {
    title: "About Us | BidSmartAI",

    description:
        "Learn more about BidSmartAI, our mission, vision, and how we help businesses manage tenders and contracts efficiently.",
};

export default function AboutPage() {
    return (
        <main className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
                    <div className="max-w-3xl">
                        <p className="uppercase tracking-[0.3em] text-blue-200 text-sm font-semibold mb-4">
                            About BidSmartAI
                        </p>

                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Simplifying Tender &
                            Contract Management
                        </h1>

                        <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                            BidSmartAI helps businesses
                            discover, manage, and track
                            tenders efficiently through a
                            modern and intelligent digital
                            platform.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-blue-700 font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-2xl border border-white/30 px-6 py-3 font-medium hover:bg-white/10 transition"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Intro */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    {/* Left */}
                    <div>
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            Who We Are
                        </span>

                        <h2 className="mt-5 text-4xl font-bold text-slate-900 leading-tight">
                            Building Smarter Procurement
                            Solutions
                        </h2>

                        <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                            BidSmartAI is a modern tender
                            and contract management
                            platform built to help
                            businesses streamline bidding,
                            document management, and
                            project tracking.
                        </p>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            Our platform combines
                            automation, intelligent
                            workflows, and a professional
                            user experience to improve
                            operational efficiency and save
                            valuable time.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="relative">
                        <div className="rounded-3xl bg-white p-10 shadow-2xl border border-slate-200">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="rounded-2xl bg-blue-50 p-6">
                                    <Building2 className="w-10 h-10 text-blue-700" />

                                    <h3 className="mt-4 text-3xl font-bold text-slate-900">
                                        500+
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Companies
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-emerald-50 p-6">
                                    <Users className="w-10 h-10 text-emerald-600" />

                                    <h3 className="mt-4 text-3xl font-bold text-slate-900">
                                        10K+
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Users
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-orange-50 p-6">
                                    <Target className="w-10 h-10 text-orange-500" />

                                    <h3 className="mt-4 text-3xl font-bold text-slate-900">
                                        98%
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Success Rate
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-purple-50 p-6">
                                    <ShieldCheck className="w-10 h-10 text-purple-600" />

                                    <h3 className="mt-4 text-3xl font-bold text-slate-900">
                                        Secure
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Platform
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="rounded-3xl border border-slate-200 p-10 shadow-sm hover:shadow-xl transition">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Target className="text-blue-700" />
                            </div>

                            <h3 className="mt-6 text-3xl font-bold text-slate-900">
                                Our Mission
                            </h3>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                To modernize procurement and
                                tender management through
                                intelligent digital solutions
                                that improve efficiency,
                                transparency, and business
                                growth.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="rounded-3xl border border-slate-200 p-10 shadow-sm hover:shadow-xl transition">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                <ShieldCheck className="text-emerald-600" />
                            </div>

                            <h3 className="mt-6 text-3xl font-bold text-slate-900">
                                Our Vision
                            </h3>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                To become the leading digital
                                procurement ecosystem helping
                                organizations manage tenders,
                                contracts, and compliance
                                seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 p-12 text-center text-white shadow-2xl">
                    <h2 className="text-4xl font-bold">
                        Ready to Transform Your
                        Tender Workflow?
                    </h2>

                    <p className="mt-5 text-lg text-blue-100 max-w-2xl mx-auto">
                        Join businesses using BidSmartAI
                        to simplify procurement and
                        accelerate growth.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-blue-700 font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Create Free Account
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}