// import React, { useEffect, useState, useRef } from "react";

// const CAMERA_CONSTRAINTS = {
//   audio: true,
//   video: { width: 960, height: 540 },
// };

// const App = () => {
//   const [connected, setConnected] = useState(false);
//   const [cameraEnabled, setCameraEnabled] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const [d, setd] = useState(null);
//   const [shoutOut, setShoutOut] = useState("you");

//   const inputStreamRef = useRef();
//   const videoRef = useRef();
//   console.log({ videoRef });

//   const canvasRef = useRef();
//   const wsRef = useRef();
//   const mediaRecorderRef = useRef();
//   const requestAnimationRef = useRef();
//   const nameRef = useRef();

//   const enableCamera = async () => {
//     inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
//       CAMERA_CONSTRAINTS
//     );

//     videoRef.current.srcObject = inputStreamRef.current;

//     await videoRef.current.play();

//     // We need to set the canvas height/width to match the video element.
//     canvasRef.current.height = videoRef.current.clientHeight;
//     canvasRef.current.width = videoRef.current.clientWidth;

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);

//     setCameraEnabled(true);
//   };

//   const updateCanvas = () => {
//     if (videoRef.current.ended || videoRef.current.paused) {
//       return;
//     }

//     const ctx = canvasRef.current.getContext("2d");

//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       videoRef.current.clientWidth,
//       videoRef.current.clientHeight
//     );

//     ctx.fillStyle = "#ff0000";
//     ctx.font = "50px monospace";
//     ctx.fillText(`Oh hi, ${nameRef.current}`, 5, 50);

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//   };

//   const stopStreaming = () => {
//     mediaRecorderRef.current.stop();
//     setStreaming(false);
//   };

//   const startStreaming = () => {
//     setStreaming(true);

//     const protocol = window.location.protocol.replace("http", "ws");
//     wsRef.current = new WebSocket(
//       `${protocol}//${window.location.host}/rtmp?key=${d}`
//     );

//     wsRef.current.addEventListener("open", function open() {
//       setConnected(true);
//     });

//     wsRef.current.addEventListener("close", () => {
//       setConnected(false);
//       stopStreaming();
//     });

//     const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

//     // Let's do some extra work to get audio to join the party.
//     // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
//     const audioStream = new MediaStream();
//     const audioTracks = inputStreamRef.current.getAudioTracks();
//     audioTracks.forEach(function (track) {
//       audioStream.addTrack(track);
//     });

//     const outputStream = new MediaStream();
//     [audioStream, videoOutputStream].forEach(function (s) {
//       s.getTracks().forEach(function (t) {
//         outputStream.addTrack(t);
//       });
//     });

//     mediaRecorderRef.current = new MediaRecorder(outputStream, {
//       mimeType: "video/webm",
//       videoBitsPerSecond: 3000000,
//     });

//     mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
//       wsRef.current.send(e.data);
//     });

//     mediaRecorderRef.current.addEventListener("stop", () => {
//       stopStreaming();
//       wsRef.current.close();
//     });

//     mediaRecorderRef.current.start(1000);
//   };

//   useEffect(() => {
//     nameRef.current = shoutOut;
//   }, [shoutOut]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   }, []);

//   return (
//     <div style={{ maxWidth: "980px", margin: "0 auto" }}>
//       <h1>Streamr</h1>

//       {!cameraEnabled && (
//         <button className="button button-outline" onClick={enableCamera}>
//           Enable Camera
//         </button>
//       )}

//       {cameraEnabled &&
//         (streaming ? (
//           <div>
//             <span>{connected ? "Connected" : "Disconnected"}</span>
//             <button className="button button-outline" onClick={stopStreaming}>
//               Stop Streaming
//             </button>
//           </div>
//         ) : (
//           <>
//             <input
//               placeholder="Stream Key"
//               type="text"
//               onChange={(e) => setd(e.target.value)}
//             />
//             <button
//               className="button button-outline"
//               disabled={!d}
//               onClick={startStreaming}
//             >
//               Start Streaming
//             </button>
//           </>
//         ))}
//       <div className="row">
//         <div className="column">
//           <h2>Input</h2>
//           <video
//             ref={videoRef}
//             controls
//             width="100%"
//             height="auto"
//             muted
//           ></video>
//         </div>
//         <div className="column">
//           <h2>Output</h2>
//           <canvas ref={canvasRef}></canvas>
//           <input
//             placeholder="Shout someone out!"
//             type="text"
//             onChange={(e) => setShoutOut(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default App;
import "./styles.css";
import { useState } from "react";

import {
  AmityUiKitProvider,
  AmityUiKitSocial,
  AmityUiKitChat
} from "@amityco/ui-kit";

import Login from "./component/Login";

const apiKey = "b0efe85d3c88a1331a62891e550f1688845b8ab6ba34692f";

export default function App() {
  const [userId, setUserId] = useState();

  return (
    <div className="App">
      {!userId ? (
        <Login onSubmit={setUserId} />
      ) : (
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          apiEndpoint="https://api.eu.amity.co"
          userId={userId}
          displayName={userId}
        >
          <AmityUiKitChat />
        </AmityUiKitProvider>
      )}
    </div>
  );
}

