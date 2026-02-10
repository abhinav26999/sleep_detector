import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const NAME = "Hy baby";

const NO_MESSAGES = [
    "No",
    "Are you sure?",
    "Think again",
    "That hurt a little",
    "Still no?",
    "You’re testing me",
    "Okay… pause",
    "You know the answer",
    "Just click Yes!",
];

const YES_MESSAGES = [
    "Yes",
    "Still yes",
    "Always yes",
    "I’m not changing",
    "Take your time",
    "I’ll wait",
    "It’s you",
    "Only you 💖",
];

function generateValentineMessage() {
    const openers = [
        "I was going to write something simple,",
        "I tried to be logical…",
        "Some feelings don’t follow rules.",
    ];
    const middles = [
        "but my heart kept choosing you.",
        "but you kept showing up in my thoughts.",
        "but you made everything softer.",
    ];
    const closers = [
        "So this is me, choosing you.",
        "This isn’t a question anymore.",
        "This is just honesty.",
    ];
    const pick = a => a[Math.floor(Math.random() * a.length)];
    return `${pick(openers)} ${pick(middles)} ${pick(closers)}`;
}

function FloatingHearts() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({ length: 14 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute animate-float text-rose-400/40"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${14 + Math.random() * 20}px`,
                        animationDuration: `${10 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 6}s`,
                    }}
                >
          ❤️
        </span>
            ))}
        </div>
    );
}

const stepVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
};

export default function Valentine() {
    const [step, setStep] = useState("intro");
    const [noCount, setNoCount] = useState(0);
    const navigate = useNavigate();
    const [yesTextIndex, setYesTextIndex] = useState(0);

    const handleYes = () => {
        confetti({
            particleCount: 220,
            spread: 140,
            startVelocity: 55,
        });

        setStep("celebration");

        setTimeout(() => {
            navigate("/final");
        }, 2500);
    };

    const handleNo = () => {
        setNoCount(c => c + 1);
        setYesTextIndex(i => Math.min(i + 1, YES_MESSAGES.length - 1));
    };


    const yesScale = 1 + noCount * 2;

    const noOffset = noCount * 100;

    const isFullscreen = noCount >= 7;

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-rose-900 to-black flex items-center justify-center relative overflow-hidden">
            <FloatingHearts />

            {/* Fullscreen Overlay Logic */}
            {isFullscreen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleYes}
                    className="fixed inset-0 z-[9999] bg-rose-600 flex items-center justify-center text-white font-extrabold text-8xl"
                >
                    Only you 💖
                </motion.button>
            )}

            {/* Main Card */}
            <main className="relative z-10 w-[92vw] max-w-xl rounded-3xl p-10 text-center shadow-2xl bg-black/40 backdrop-blur-xl border border-rose-500/20">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {step === "intro" && (
                        <motion.div
                            key="intro"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h1 className="text-4xl font-extrabold mb-6 text-rose-200">
                                Hey {NAME}
                            </h1>
                            <p className="mb-10 text-rose-100/80">
                                I have something important to ask you…
                            </p>
                            <button
                                onClick={() => setStep("question")}
                                className="px-10 py-4 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-lg font-bold transition"
                            >
                                Continue →
                            </button>
                        </motion.div>
                    )}

                    {/* QUESTION */}
                    {step === "question" && (
                        <motion.div
                            key="question"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative flex flex-col items-center"
                        >
                            <img
                                src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NTE1azEybmNzZTlkdHJ6d25yYXI4d29oMHMyOHNpN2cwM2piOWFtMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HJZblxmxHb7CbZtmNy/giphy.gif"
                                alt="love"
                                className="w-full h-64 object-cover mb-8 rounded-xl"
                            />

                            <h1 className="text-4xl font-extrabold mb-12 text-rose-200">
                                Will you be my Valentine?
                            </h1>

                            <div className="flex justify-center items-center gap-6 relative min-h-[100px]">

                                {/* YES BUTTON (Grows like balloon) */}
                                <motion.button
                                    onClick={handleYes}
                                    animate={{ scale: yesScale }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-32 h-24 bg-rose-700 hover:bg-rose-600 text-white
                                    text-xl font-bold rounded-2xl shadow-xl z-20 flex items-center justify-center"
                                >
                                    {YES_MESSAGES[yesTextIndex]}
                                </motion.button>

                                {/* NO BUTTON (Moves horizontally) */}
                                {!isFullscreen && (
                                    <motion.button
                                        onClick={handleNo}
                                        // Moves to the right based on click count
                                        animate={{ x: noOffset }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-32 h-24 bg-zinc-800 text-rose-200
                                        text-sm font-semibold rounded-2xl
                                        shadow-xl border border-rose-500/30 flex items-center justify-center shrink-0 z-10"
                                    >
                                        {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
                                    </motion.button>
                                )}

                            </div>

                            <p className="mt-16 text-sm text-rose-200/60">
                                take your time… I’m right here
                            </p>
                        </motion.div>
                    )}

                    {/* CELEBRATION */}
                    {step === "celebration" && (
                        <motion.div
                            key="celebration"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-5xl font-extrabold text-rose-300 mb-8">
                                💖
                            </h2>
                            <p className="text-rose-100/90 text-lg">
                                {generateValentineMessage()}
                            </p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}