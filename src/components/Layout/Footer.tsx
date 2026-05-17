'use client'
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#0056b3] text-white py-[25px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-5">
                    {/* Left Section with Logos */}
                    <div className="flex gap-1.5">
                        <span>
                            <img
                                src="/assets/images/bidsmartai_logo.png"
                                alt="bidsmartai"
                                className="block w-[60px] rounded"
                            />
                        </span>
                        <span className="flex flex-col justify-center items-center pb-[3px]">
                            <img
                                src="/assets/images/logo2.jpg"
                                alt="new hope"
                                className="block w-[60px] rounded"
                            />
                            <p className="font-semibold text-sm">NHAASCPL</p>
                        </span>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h4 className="font-normal text-base mb-2.5">Quick Links</h4>
                        <ul className="list-none flex flex-wrap gap-5">
                            <li className="footer__footerItem">
                                <Link href="/" className="text-sm py-[5px] px-[5px] text-white no-underline">
                                    Home
                                </Link>
                            </li>
                            <li className="footer__footerItem">
                                <Link href="/tenders" className="text-sm py-[5px] px-[5px] text-white no-underline">
                                    Tenders
                                </Link>
                            </li>
                            <li className="footer__footerItem">
                                <Link href="/gallery" className="text-sm py-[5px] px-[5px] text-white no-underline">
                                    Gallery
                                </Link>
                            </li>
                            <li className="footer__footerItem">
                                <Link href="/news" className="text-sm py-[5px] px-[5px] text-white no-underline">
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h4 className="font-normal text-base mb-2.5">Follow Us</h4>
                        <div className="flex gap-2 text-lg mr-2.5 cursor-pointer">
                            <FaFacebook />
                            <FaSquareXTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center mt-2.5 text-[13px] px-4">
                © 2026 BidSmartAi. All Rights Reserved. | Regd Address: 101 Sai Narayan Hardaspura Khgaul, Patna | Corp Office: 102, Radhika Appartment, Indrapuri, Patna 800024
            </p>
        </footer>
    )
}

export default Footer;