import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Moment1() {
    const navigate = useNavigate();
    const lines = [
        "Hey Alex… 💙",
        "I know you weren’t expecting this.",
        "But I needed you here for a second.",
        "Actually… more than a second.",
        "Just promise you won’t rush, okay?",
    ];

    const [step, setStep] = useState(0);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-rose-900 to-black">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-lg animate-pop">
                <h1 className="text-3xl font-extrabold text-rose-700 mb-6">
                    {lines[step]}
                </h1>

                <button
                    onClick={() => {
                        if (step < lines.length - 1) setStep(step + 1);
                        else navigate("/valentine");
                    }}
                    className="px-8 py-3 bg-rose-700 text-white rounded-full font-bold hover:scale-105 transition"
                >
                    {step < lines.length - 1 ? "Continue →" : "Okay… 💙"}
                </button>
            </div>
        </div>
    );
}
