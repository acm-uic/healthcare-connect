"use client";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <div className="flex flex-col border border-solid p-16 mt-32">
                <h1 className="text-6xl font-bold">
                    Find the most affordable
                    <br />
                    medical services
                </h1>
                <h2 className="text-lg mt-4 text-gray-400">
                    Healthcare Connect provides progressive, and affordable
                    <br />
                    healthcare, accessible on mobile and online
                    <br />
                    for everyone
                </h2>
                <button className="w-44 h-12 mt-4 bg-blue-500 text-white px-4 py-2 rounded-3xl">
                    Get Started
                </button>
            </div>
        </>
    )
}

export default Home
