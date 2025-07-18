"use client";
import { Github, Linkedin, ExternalLink, Mail } from "lucide-react";
import SocialPinCard from "@/components/SocialPinCard";
import Hyperspeed from "@/ReactBits/Hyperspeed/Hyperspeed";
import TrueFocus from "@/ReactBits/TrueFocus/TrueFocus";


export default function ContactSection() {
    return (
        <section
            id="contact"
            className="relative min-h-[90vh] overflow-hidden scroll-mt-20"
            style={{
                // Add your desired background color here.
                // This will completely cover the global tsparticles background.
                backgroundColor: '#0b0f13ff', // Example: a dark background color. Adjust as needed.
                // You can also use a Tailwind class: className="bg-gray-900"
                position: 'relative', // Ensure it has a positioning context for its children
                zIndex: 10, // Ensure this section is above the global particles (which are z-index: -1)
                // Tailwind's default z-index is often enough, but explicitly setting ensures it.
            }}
        >
            {/* 🔮 Hyperspeed Background - This is your EXISTING background for this section */}
            {/* Keep its z-index relative to this section's content. */}
            <div className="absolute inset-0 z-0 cursor-pointer">
                <Hyperspeed
                    effectOptions={{
                        onSpeedUp: () => { },
                        onSlowDown: () => { },
                        distortion: "turbulentDistortion",
                        length: 400,
                        roadWidth: 10,
                        islandWidth: 2,
                        lanesPerRoad: 4,
                        fov: 90,
                        fovSpeedUp: 150,
                        speedUp: 2,
                        carLightsFade: 0.4,
                        totalSideLightSticks: 20,
                        lightPairsPerRoadWay: 40,
                        shoulderLinesWidthPercentage: 0.05,
                        brokenLinesWidthPercentage: 0.1,
                        brokenLinesLengthPercentage: 0.5,
                        lightStickWidth: [0.12, 0.5],
                        lightStickHeight: [1.3, 1.7],
                        movingAwaySpeed: [60, 80],
                        movingCloserSpeed: [-120, -160],
                        carLightsLength: [400 * 0.03, 400 * 0.2],
                        carLightsRadius: [0.05, 0.14],
                        carWidthPercentage: [0.3, 0.5],
                        carShiftX: [-0.8, 0.8],
                        carFloorSeparation: [0, 5],
                        colors: {
                            roadColor: 0x080808,
                            islandColor: 0x0a0a0a,
                            background: 0x000000,
                            shoulderLines: 0xffffff,
                            brokenLines: 0xffffff,
                            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                            sticks: 0x03b3c3,
                        },
                    }}
                />
            </div>

            {/* ✨ Foreground Content */}
            {/* This div already has z-10, which is good for being over Hyperspeed (z-0) */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <h1 className="text-4xl md:text-5xl font-bold text-center text-primary drop-shadow-lg mb-8">
                    <TrueFocus
                        sentence="Contact Me"
                        manualMode={false}
                        blurAmount={5}
                        borderColor="#77DFDD"
                        animationDuration={0.5}
                        pauseBetweenAnimations={1}
                    />
                </h1>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                    I'm always open to opportunities, collaborations, or just a good tech talk. Reach out to me anytime!
                </p>

                <div className="flex justify-center mb-16">
                    <SocialPinCard
                        title="Email Me"
                        description="Click to send me an email directly."
                        href="mailto:soubhik0727@gmail.com"
                        Icon={Mail}
                        gradient="bg-gradient-to-br from-[#EA4335] via-[#FBBC05] to-[#34A853]"
                        showBackgroundIcon={true}
                        backgroundImage="/images/soubhik.png"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    <SocialPinCard
                        title="GitHub"
                        description="Check out my open-source projects and contributions."
                        href="https://github.com/Soubhik-07-ops"
                        Icon={Github}
                        gradient="bg-gradient-to-br from-gray-800 via-gray-700 to-purple-800"
                        showBackgroundIcon={true}
                        backgroundImage="/images/icons/github-logo.svg"
                    />
                    <SocialPinCard
                        title="LinkedIn"
                        description="Connect with me professionally and see my career journey."
                        href="https://www.linkedin.com/in/soubhik-roy07/"
                        Icon={Linkedin}
                        gradient="bg-gradient-to-br from-blue-200 via-blue-400 to-cyan-300"
                        showBackgroundIcon={true}
                        backgroundImage="/images/icons/linkedin-logo.svg"
                    />
                    <SocialPinCard
                        title="LeetCode"
                        description="Check my problem-solving progress on LeetCode."
                        href="https://leetcode.com/u/Soubhik_roy/"
                        Icon={ExternalLink}
                        gradient="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500"
                        showBackgroundIcon={true}
                        backgroundImage="/images/icons/leetcode-logo.svg"
                    />
                    <SocialPinCard
                        title="GeeksforGeeks"
                        description="Explore my coding articles and GFG problem history."
                        href="https://www.geeksforgeeks.org/user/soubhi72yw/"
                        Icon={ExternalLink}
                        gradient="bg-gradient-to-br from-green-500 via-lime-400 to-emerald-500"
                        showBackgroundIcon={true}
                        backgroundImage="/images/icons/gfg-logo.svg"
                    />
                </div>
            </div>
        </section>
    );
}