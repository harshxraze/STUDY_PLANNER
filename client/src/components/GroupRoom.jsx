// import Chat from "./Chat";
// import MembersPanel from "./MembersPanel";
// import NotesPanel from "./NotesPanel";

// function GroupRoom({ group }) {
//   if (!group) {
//     return (
//       <div
//         style={{
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#666",
//         }}
//       >
//         Select a group to start
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//       }}
//     >
//       {/* GROUP HEADER */}
//       <div
//         style={{
//           padding: "15px 20px",
//           borderBottom: "1px solid #eee",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexShrink: 0,
//         }}
//       >
//         <div>
//           <h2>{group.name}</h2>
//           <p style={{ color: "#666" }}>{group.description}</p>
//         </div>

//         <button
//           onClick={() =>
//             window.dispatchEvent(
//               new CustomEvent("leaveGroup", { detail: group._id })
//             )
//           }
//           style={{
//             background: "#fee2e2",
//             color: "#b91c1c",
//             border: "none",
//             padding: "8px 12px",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Leave Group
//         </button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           overflow: "hidden",
//         }}
//       >
//         {/* MEMBERS */}
//         <MembersPanel group={group} />

//         {/* CHAT */}
//         <div
//           style={{
//             flex: 1,
//             padding: "20px",
//             overflow: "hidden",
//           }}
//         >
//           <Chat group={group} />
//         </div>

//         {/* NOTES */}
//         <NotesPanel group={group} />
//       </div>
//     </div>
//   );
// }

// export default GroupRoom;

import Chat from "./Chat";
import MembersPanel from "./MembersPanel";
import NotesPanel from "./NotesPanel";

function GroupRoom({ group }) {
  if (!group) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", flexDirection: "column" }}>
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>🪐</div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "2px" }}>SELECT A MISSION</div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* GROUP HEADER */}
      <div style={{ 
        padding: "20px 25px", 
        borderBottom: "1px solid rgba(255,255,255,0.1)", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexShrink: 0,
        background: "rgba(0, 0, 0, 0.6)", 
        backdropFilter: "blur(10px)"
      }}>
        <div>
          {/* VISIBLE NAME: Bright Cyan + Strong Glow */}
          <h2 style={{ 
            margin: 0, 
            fontSize: "26px", 
            color: "#22d3ee", 
            textShadow: "0 0 15px rgba(34, 211, 238, 0.6)", 
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "2px"
          }}>
            {/* 🛡️ SAFETY: Use ?. in case group name is missing momentarily */}
            {group?.name || "Loading..."}
          </h2>
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("leaveGroup", { detail: group._id }))}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold"
          }}
        >
          LEAVE MISSION
        </button>
      </div>

      {/* MAIN CONTENT GRID */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* MEMBERS */}
        <MembersPanel group={group} />

        {/* CHAT */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Subtle grid pattern for chat background */}
          <div style={{ 
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}></div>
          <Chat group={group} />
        </div>

        {/* NOTES */}
        <NotesPanel group={group} />
      </div>
    </div>
  );
}

export default GroupRoom;