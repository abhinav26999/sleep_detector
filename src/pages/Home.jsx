import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const lines = [
        "Hey Alex… 💙",
        "I hope you’re smiling right now.",
        "I made something just for you.",
        "Not for Valentine’s week.",
        "Not for any special date.",
        "Just because you’re you 😌",
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-rose-900 to-black">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-lg animate-pop">

                <h1 className="text-3xl font-extrabold mb-6 text-rose-700">
                    {lines[step]}
                </h1>

                <button
                    onClick={() => {
                        if (step < lines.length - 1) setStep(s => s + 1);
                        else navigate("/valentine");
                    }}
                    className="mt-6 px-8 py-3 bg-rose-700 text-white rounded-full font-bold hover:scale-105 transition"
                >
                    {step < lines.length - 1 ? "Continue →" : "Okay… 💙"}
                </button>

            </div>
        </div>
    );
}
