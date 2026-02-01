// import { useEffect, useRef, useState } from "react";
// import api from "../api/api";
// import socket from "../socket/socket";

// function Chat({ group }) {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const messagesEndRef = useRef(null);

//   // =========================
//   // LOAD HISTORY + SOCKET
//   // =========================
//   useEffect(() => {
//     if (!group) return;

//     socket.emit("join_group", { groupId: group._id });

//     api
//       .get(`/messages/${group._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMessages(res.data));

//     socket.on("new_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socket.off("new_message");
//   }, [group]);

//   // =========================
//   // AUTO SCROLL TO BOTTOM
//   // =========================
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // =========================
//   // SEND MESSAGE
//   // =========================
//   const sendMessage = () => {
//     if (!text.trim()) return;

//     socket.emit("send_message", {
//       groupId: group._id,
//       userId,
//       text,
//     });

//     setText("");
//   };

//   if (!group) return null;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         background: "#fff",
//         borderRadius: "10px",
//         overflow: "hidden",
//       }}
//     >
//       {/* MESSAGES */}
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "12px",
//           background: "#f4f6fb",
//         }}
//       >
//         {messages.map((m) => {
//           const isMe = m.sender._id === userId;

//           return (
//             <div
//               key={m._id}
//               style={{
//                 display: "flex",
//                 justifyContent: isMe ? "flex-end" : "flex-start",
//                 marginBottom: "8px",
//               }}
//             >
//               <div
//                 style={{
//                   maxWidth: "60%",
//                   padding: "8px 12px",
//                   borderRadius: "12px",
//                   background: isMe ? "#6366f1" : "#e5e7eb",
//                   color: isMe ? "#fff" : "#111",
//                   fontSize: "13px",
//                 }}
//               >
//                 {!isMe && (
//                   <div style={{ fontSize: "11px", opacity: 0.6 }}>
//                     {m.sender.name}
//                   </div>
//                 )}
//                 {m.text}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* INPUT */}
//       <div
//         style={{
//           display: "flex",
//           padding: "10px",
//           borderTop: "1px solid #e5e7eb",
//           background: "#fff",
//         }}
//       >
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message…"
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #e5e7eb",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             marginLeft: "8px",
//             padding: "10px 16px",
//             borderRadius: "8px",
//             border: "none",
//             background: "#6366f1",
//             color: "#fff",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;


import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import socket from "../socket/socket";

function Chat({ group }) {
  // --- LOGIC UNTOUCHED ---
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!group) return;
    socket.emit("join_group", { groupId: group._id });
    api.get(`/messages/${group._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setMessages(res.data));
    socket.on("new_message", (msg) => { setMessages((prev) => [...prev, msg]); });
    return () => socket.off("new_message");
  }, [group]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("send_message", { groupId: group._id, userId, text });
    setText("");
  };
  // --- END LOGIC ---

  if (!group) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 2 }}>
      {/* MESSAGES AREA */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {messages.map((m) => {
          const isMe = m.sender._id === userId;
          return (
            <div key={m._id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: "12px" }}>
              <div
                style={{
                  maxWidth: "65%",
                  padding: "10px 16px",
                  borderRadius: "16px",
                  // Neon Gradient for me, Dark Glass for others
                  background: isMe 
                    ? "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" 
                    : "rgba(255, 255, 255, 0.08)",
                  border: isMe ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "14px",
                  boxShadow: isMe ? "0 4px 15px rgba(124, 58, 237, 0.4)" : "none",
                  borderBottomRightRadius: isMe ? "4px" : "16px",
                  borderBottomLeftRadius: isMe ? "16px" : "4px",
                  backdropFilter: "blur(4px)"
                }}
              >
                {!isMe && (
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px", fontWeight: "bold" }}>
                    {m.sender.name}
                  </div>
                )}
                <div style={{ lineHeight: "1.5" }}>{m.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div style={{ padding: "20px", background: "rgba(15, 23, 42, 0.8)", borderTop: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Transmit message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(0, 0, 0, 0.3)",
            color: "#fff",
            outline: "none",
            fontSize: "14px"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0 24px",
            borderRadius: "12px",
            border: "none",
            background: "#6366f1",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
            transition: "0.2s"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;