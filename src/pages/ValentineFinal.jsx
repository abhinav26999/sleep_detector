import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const NAME = "Hy baby";

export default function ValentineFinal() {
    useEffect(() => {
        confetti({
            particleCount: 250,
            spread: 180,
            startVelocity: 45,
            gravity: 0.8,
            origin: { y: 0.6 },
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-pink-800 to-black relative overflow-hidden">

            {/* Floating hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 18 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute animate-float text-rose-300/40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            fontSize: `${16 + Math.random() * 22}px`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        ❤️
                    </span>
                ))}
            </div>

            {/* Card */}
            <motion.main
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-xl mx-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-rose-400/30 p-10 text-center shadow-2xl"
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-extrabold text-rose-300 mb-6"
                >
                    Happy Valentine’s Day ❤️
                </motion.h1>

                <p className="text-rose-100/90 text-lg leading-relaxed mb-8">
                    {NAME},
                    <br /><br />
                    Miles apart, but you’re still the closest to my heart… my everything.
                    Thank you for existing, for being you, and for being in my life.
                    <br /><br />
                    I may not have the perfect words to define what we are,
                    but I know exactly what you mean to me.
                    I love you more than you’ll ever know.🫶🏻❤️
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-10"
                >
                    <span className="inline-block px-8 py-4 rounded-xl bg-rose-700 text-white font-bold text-lg shadow-lg animate-glow">
                        ❤️ Forever ❤️
                    </span>
                </motion.div>
            </motion.main>
        </div>
    );
}
