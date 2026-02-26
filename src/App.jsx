// import React, { useRef, useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';
// // We will use inline styles or App.css for the overlay alignment
//
// function App() {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const audioRef = useRef(new Audio('/alarm.mp3'));
//
//     const [isModelLoaded, setIsModelLoaded] = useState(false);
//     const [status, setStatus] = useState("Initializing AI...");
//     const [eyesClosedCount, setEyesClosedCount] = useState(0);
//
//     // SETTINGS
//     const CLOSED_EYE_THRESHOLD = 0.25; // If EAR is lower than this, eyes are closed
//     const FRAMES_TO_TRIGGER = 15;      // ~1.5 seconds of closed eyes triggers alarm
//
//     // 1. Load Models from the public folder
//     useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URL = '/models';
//             try {
//                 await Promise.all([
//                     faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//                     faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//                 ]);
//                 setIsModelLoaded(true);
//                 setStatus("AI Ready. Detect Face.");
//             } catch (err) {
//                 console.error("Failed to load models:", err);
//                 setStatus("Error loading models. Check public/models folder.");
//             }
//         };
//         loadModels();
//     }, []);
//
//     // 2. The Detection Loop
//     const handleVideoOnPlay = () => {
//         setInterval(async () => {
//             if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//                 const video = webcamRef.current.video;
//                 const videoWidth = video.videoWidth;
//                 const videoHeight = video.videoHeight;
//
//                 // Force canvas to match video size
//                 canvasRef.current.width = videoWidth;
//                 canvasRef.current.height = videoHeight;
//
//                 // Detect Face
//                 const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//                     .withFaceLandmarks();
//
//                 // Draw on Canvas
//                 const displaySize = { width: videoWidth, height: videoHeight };
//                 faceapi.matchDimensions(canvasRef.current, displaySize);
//                 const resizedDetections = faceapi.resizeResults(detections, displaySize);
//
//                 // Clear previous drawing
//                 const ctx = canvasRef.current.getContext('2d');
//                 ctx.clearRect(0, 0, videoWidth, videoHeight);
//
//                 // Draw landmarks (optional, good for debugging)
//                 faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
//
//                 if (detections.length > 0) {
//                     const landmarks = detections[0].landmarks;
//                     const leftEye = landmarks.getLeftEye();
//                     const rightEye = landmarks.getRightEye();
//
//                     const leftEAR = getEyeAspectRatio(leftEye);
//                     const rightEAR = getEyeAspectRatio(rightEye);
//                     const avgEAR = (leftEAR + rightEAR) / 2;
//
//                     // Logic: Are eyes closed?
//                     if (avgEAR < CLOSED_EYE_THRESHOLD) {
//                         setEyesClosedCount(prev => {
//                             const newCount = prev + 1;
//                             if (newCount > FRAMES_TO_TRIGGER) {
//                                 playAlarm();
//                                 setStatus("Utha Jaaaa Oyeeee 🚨");
//                                 // Optional: Change background to red
//                                 document.body.style.backgroundColor = "red";
//                             }
//                             return newCount;
//                         });
//                     } else {
//                         setEyesClosedCount(0);
//                         stopAlarm();
//                         setStatus("Ankhein Khuli h ✅");
//                         document.body.style.backgroundColor = "#242424"; // Reset background
//                     }
//                 } else {
//                     setStatus("no face ⚠️");
//                     stopAlarm();
//                 }
//             }
//         }, 100); // Check every 100ms
//     };
//
//     // Helper Math for EAR (Eye Aspect Ratio)
//     const getEyeAspectRatio = (eye) => {
//         const v1 = dist(eye[1], eye[5]);
//         const v2 = dist(eye[2], eye[4]);
//         const h = dist(eye[0], eye[3]);
//         return (v1 + v2) / (2 * h);
//     };
//
//     const dist = (p1, p2) => {
//         return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
//     };
//
//     const playAlarm = () => {
//         if (audioRef.current.paused) {
//             audioRef.current.play().catch(e => console.log("Click page to enable audio"));
//         }
//     };
//
//     const stopAlarm = () => {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//     };
//
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
//             <h2 className={`text-xl font-bold mb-6 ${status.includes("WAKE") ? "text-red-500 animate-pulse" : "text-green-400"}`}>
//                 {status}
//             </h2>
//
//             {/* Container for Video + Canvas Overlay */}
//             <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden" style={{ width: 640, height: 480 }}>
//                 {isModelLoaded ? (
//                     <>
//                         <Webcam
//                             ref={webcamRef}
//                             audio={false}
//                             onUserMedia={handleVideoOnPlay}
//                             className="absolute top-0 left-0 w-full h-full object-cover"
//                             mirrored={true} // Mirror acts like a real mirror
//                         />
//                         <canvas
//                             ref={canvasRef}
//                             className="absolute top-0 left-0 w-full h-full"
//                         />
//                     </>
//                 ) : (
//                     <div className="flex items-center justify-center h-full">Loading AI Models...</div>
//                 )}
//             </div>
//
//
//         </div>
//     );
// }
//
// export default App;
import { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const EAR_SLEEP = 0.23;

const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];

export default function App() {
    const videoRef = useRef(null);
    const eyeCloseStartRef = useRef(null);
    const alarmPlayingRef = useRef(false);

    const [sleeping, setSleeping] = useState(false);

    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
        });

        faceMesh.onResults((results) => {
            if (
                !results.multiFaceLandmarks ||
                !results.multiFaceLandmarks[0]
            )
                return;

            const landmarks = results.multiFaceLandmarks[0];

            if (!landmarks[33] || !landmarks[362]) return;

            const leftEye = LEFT_EYE.map((i) => landmarks[i]);
            const rightEye = RIGHT_EYE.map((i) => landmarks[i]);

            const leftEAR = eyeAspectRatio(leftEye);
            const rightEAR = eyeAspectRatio(rightEye);
            const avgEAR = (leftEAR + rightEAR) / 2;

            const headDown = isHeadDrooping(landmarks);
            const headTilted = isHeadTilted(landmarks);

            if (avgEAR < EAR_SLEEP) {
                if (!eyeCloseStartRef.current) {
                    eyeCloseStartRef.current = Date.now();
                }
            } else {
                eyeCloseStartRef.current = null;
                setSleeping(false);
            }

            if (eyeCloseStartRef.current) {
                const closedSeconds =
                    (Date.now() - eyeCloseStartRef.current) / 1000;

                if (closedSeconds >= 2 || headDown || headTilted) {
                    setSleeping(true);
                }

            }
        });

        const camera = new Camera(videoRef.current, {
            onFrame: async () => {
                await faceMesh.send({ image: videoRef.current });
            },
            width: 620,
            height: 540,
        });

        camera.start();

        return () => camera.stop();
    }, []);

    return (
        <div className="container">
            <video ref={videoRef} autoPlay muted />
            <div className="status">
                ● STATUS: {sleeping ? "SLEEPING" : "AWAKE"}
            </div>
            <Alarm active={sleeping} alarmPlayingRef={alarmPlayingRef} />
        </div>
    );
}

function eyeAspectRatio(eye) {
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    return (
        (dist(eye[1], eye[5]) + dist(eye[2], eye[4])) /
        (2 * dist(eye[0], eye[3]))
    );
}

function isHeadDrooping(landmarks) {
    const nose = landmarks[1];
    const chin = landmarks[152];
    return chin.y - nose.y < 0.08;
}

function Alarm({ active, alarmPlayingRef }) {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/alarm.mp3");
        audioRef.current.loop = true;
    }, []);

    useEffect(() => {
        if (active && !alarmPlayingRef.current) {
            audioRef.current.play().catch(() => {});
            alarmPlayingRef.current = true;
        }

        if (!active && alarmPlayingRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            alarmPlayingRef.current = false;
        }
    }, [active]);

    return null;
}
function isHeadTilted(landmarks) {
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    if (!leftEye || !rightEye) return false;

    const dy = Math.abs(leftEye.y - rightEye.y);
    return dy > 0.03;
}

