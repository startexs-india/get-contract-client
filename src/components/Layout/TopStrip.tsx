"use client";
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaCaretDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const TopStrip = () => {
    const [date, setDate] = useState<string>("");
    useEffect(() => {
        let x = new Date().toLocaleDateString();
        setDate(x);
    }, [])

    return (
        <section className="z-100 bg-primary text-white text-[13px] py-[5px]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <div className="font-medium flex items-center gap-[7px]">
                        <FaPhone /> +91 9876543210 <span> | </span> <FaEnvelope /> support@bidsmartai.com
                    </div>
                    <div className="max-[540px]:hidden">
                        {date}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopStrip;