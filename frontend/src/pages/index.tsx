"use client";
import Link from "next/link";
import React, { useState } from "react";
import ChatIcon from "../components/ChatIcon"; // Assuming ChatIcon.tsx is in the same directory
import ChatWindow from "../components/Chatwindow"; // Adjust path to where ChatWindow is located

const Home: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <div className="flex flex-col p-28 mt-30">
                <h1 className="text-4xl font-semibold tracking-wide">
                    Find the most affordable
                    <br />
                    medical services
                </h1>
                <h2 className="font-light text-lg mt-4 text-gray-400">
                    Healthcare Connect provides progressive, and affordable
                    <br />
                    healthcare, accessible on mobile and online
                    <br />
                    for everyone
                </h2>
                <div className="flex mt-8">
                    <Link href="/signin">
                        <p className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                            Get Started
                        </p>
                    </Link>
                    <Link href="/services">
                        <p className="py-2 px-4 bg-white text-blue-600 rounded-lg ml-4">
                            Services
                        </p>
                    </Link>
                    <Link href="/insurances">
                        <p className="py-2 px-4 bg-white text-blue-600 rounded-lg ml-4">
                            Insurances
                        </p>
                    </Link>
                </div>
            </div>

            {/* Integrate ChatBot */}
            {isChatOpen && <ChatWindow onClose={toggleChatWindow} />}
            <ChatIcon onClick={toggleChatWindow} />
        </>
    );
};

export default Home;
