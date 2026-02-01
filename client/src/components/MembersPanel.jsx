// function MembersPanel({ group }) {
//   if (!group) return null;

//   return (
//     <div
//       style={{
//         width: "240px",
//         borderRight: "1px solid #eee",
//         padding: "15px",
//         background: "#fafafa",
//       }}
//     >
//       <h4 style={{ marginBottom: "12px" }}>
//         Members ({group.members.length})
//       </h4>

//       {group.members.map((member) => (
//         <div
//           key={member._id}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "10px",
//             fontSize: "14px",
//           }}
//         >
//           {/* ONLINE / OFFLINE DOT */}
//           <span
//             title={member.online ? "Online" : "Offline"}
//             style={{
//               width: "9px",
//               height: "9px",
//               borderRadius: "50%",
//               backgroundColor: member.online ? "#22c55e" : "#9ca3af",
//               marginRight: "10px",
//             }}
//           />

//           {/* USER NAME */}
//           <span>{member.name}</span>

//           {/* STUDY STATUS */}
//           <span
//             style={{
//               marginLeft: "auto",
//               fontSize: "12px",
//               color:
//                 member.status === "studying"
//                   ? "green"
//                   : member.status === "break"
//                   ? "orange"
//                   : member.status === "doubt"
//                   ? "red"
//                   : "#999",
//               textTransform: "capitalize",
//             }}
//           >
//             {member.status || "offline"}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MembersPanel;


function MembersPanel({ group }) {
  if (!group || !group.members) return null;

  return (
    <div
      style={{
        width: "240px",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
      }}
    >
      <h4 style={{ marginBottom: "20px", color: "#94a3b8", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px" }}>
        Crew ({group.members.length})
      </h4>

      {group.members.map((member) => {
        // 🛡️ SAFETY CHECK: If member is null, skip rendering
        if (!member) return null;

        return (
          <div key={member._id} style={{ display: "flex", alignItems: "center", marginBottom: "12px", padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.03)" }}>
            {/* GLOWING DOT */}
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: member.online ? "#10b981" : "#475569",
                marginRight: "12px",
                boxShadow: member.online ? "0 0 8px #10b981" : "none"
              }}
            />

            <span style={{ fontSize: "13px", fontWeight: "500", color: "#e2e8f0" }}>{member.name || "Unknown"}</span>

            {/* STATUS BADGE */}
            <span
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "4px",
                background: 
                  member.status === "studying" ? "rgba(16, 185, 129, 0.2)" 
                  : member.status === "break" ? "rgba(245, 158, 11, 0.2)"
                  : member.status === "doubt" ? "rgba(239, 68, 68, 0.2)"
                  : "transparent",
                color:
                  member.status === "studying" ? "#34d399"
                  : member.status === "break" ? "#fbbf24"
                  : member.status === "doubt" ? "#f87171"
                  : "#64748b",
                border: 
                  member.status ? `1px solid ${
                    member.status === "studying" ? "rgba(16, 185, 129, 0.4)" 
                    : member.status === "break" ? "rgba(245, 158, 11, 0.4)"
                    : "rgba(239, 68, 68, 0.4)"
                  }` : "none"
              }}
            >
              {member.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MembersPanel;