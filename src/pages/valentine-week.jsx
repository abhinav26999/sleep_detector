import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/flip.css";
const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

/* =======================
   CARD DATA
======================= */
const cards = [
    {
        title: "Rose Day",
        frontImg: "/9.jpg",
        gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    },
    {
        title: "Propose Day",
        frontImg: "/8.jpeg",
        gif: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    },
    {
        title: "Chocolate Day",
        frontImg: "/6.jpg",
        gif: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
    },
    {
        title: "Teddy Day",
        frontImg: "/3.jpg",
        gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    },
    {
        title: "Promise Day",
        frontImg: "/5.jpg",
        gif: "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
    },
    {
        title: "Hug Day",
        frontImg: "/7.jpg",
        gif: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif",
    },
    {
        title: "Kiss Day",
        frontImg: "/2.jpg",
        gif: "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif",
    },
    {
        title: "Valentine’s Day",
        frontImg: "/images (1).jpeg",
        gif: "https://media.giphy.com/media/3oriO6qJiXajN0TyDu/giphy.gif",
    },
];

/* =======================
   TEASING DIALOGUES
======================= */
const teasingDialogues = [
    "😏 Hey… patience looks cute on you",
    "💕 I can see you smiling already",
    "🧸 Teddy thinks you should open one",
    "🥺 Just one card… for me?",
    "💖 Okay okay… my heart can’t wait anymore",
];

/* =======================
   MAIN COMPONENT
======================= */
export default function ValentineWeek() {
    const toName = "Alex";

    const [step, setStep] = useState("intro");
    const [teaseIndex, setTeaseIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (step === "cards") {
            const t = setTimeout(() => {
                navigate("/final");
            }, 12000); // 12 seconds

            return () => clearTimeout(t);
        }
    }, [step, navigate]);

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-zinc-900 via-rose-900 to-black p-8 flex items-center justify-center"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <main className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center overflow-hidden">

                <AnimatePresence mode="wait">

                    {/* ================= INTRO ================= */}
                    {step === "intro" && (
                        <motion.div
                            key="intro"
                            variants={pageTransition}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="animate-pop"
                        >
                            <h1 className="text-4xl font-extrabold mb-6">
                                Hey {toName} 💕
                            </h1>
                            <p className="mb-8 opacity-80">
                                I made something special for you…
                            </p>
                            <button
                                onClick={() => setStep("tease")}
                                className="px-10 py-4 bg-pink-500 text-white rounded-full text-xl font-bold hover:scale-105 transition"
                            >
                                Continue →
                            </button>
                        </motion.div>
                    )}

                    {/* ================= TEASING ================= */}
                    {step === "tease" && (
                        <motion.div
                            key="tease"
                            variants={pageTransition}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <p className="text-2xl font-semibold text-pink-700 mb-6">
                                {teasingDialogues[teaseIndex]}
                            </p>

                            <p className="mb-8 text-sm opacity-70">
                                Open a card for me 🥺
                            </p>

                            <button
                                onClick={() => {
                                    if (teaseIndex < teasingDialogues.length - 1) {
                                        setTeaseIndex(i => i + 1);
                                    } else {
                                        setStep("cards");
                                    }
                                }}
                                className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
                            >
                                {teaseIndex < teasingDialogues.length - 1
                                    ? "Okay…"
                                    : "Open the cards 💝"}
                            </button>
                        </motion.div>
                    )}

                    {/* ================= CARDS ================= */}
                    {step === "cards" && (
                        <motion.div
                            key="cards"
                            variants={pageTransition}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 text-pink-700">
                                These are for you, {toName} 💖
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {cards.map((card, i) => (
                                    <Card key={i} card={card} toName={toName} />
                                ))}
                            </div>

                            <div className="mt-12 animate-pop">
                                <p className="text-2xl font-bold text-pink-700">
                                    This was my way of saying…
                                </p>
                                <p className="mt-2 text-xl font-semibold">
                                    You mean more to me than you know, {toName} 💕
                                </p>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </motion.div>
    );
}

/* =======================
   CARD COMPONENT
======================= */
function Card({ card, toName }) {
    const [flip, setFlip] = useState(false);

    return (
        <motion.div
            className="relative h-64 rounded-2xl shadow-xl cursor-pointer perspective"
            onClick={() => setFlip(!flip)}
        >
            <motion.div
                className="absolute inset-0"
                animate={{ rotateY: flip ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                    <img
                        src={card.frontImg}
                        alt={card.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold">
                            {card.title}
                        </h2>
                    </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
                    <img
                        src={card.gif}
                        alt={card.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold text-center px-3">
                            Happy {card.title}, {toName} 💕
                        </h2>
                    </div>
                </div>

                <div className="mt-12">
                    <button
                        onClick={() => navigate("/final")}
                        className="px-10 py-4 bg-pink-600 text-white rounded-full text-xl font-bold hover:scale-105 transition"
                    >
                        One last thing 💖 →
                    </button>
                </div>

            </motion.div>
        </motion.div>
    );
}
