// import { useEffect, useState } from "react";
// import api from "../api/api";

// function Sidebar({ groups, activeGroup, onSelectGroup, onLogout }) {
//   const [allGroups, setAllGroups] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const token = localStorage.getItem("token");

//   // fetch all groups for discovery
//   useEffect(() => {
//     api
//       .get("/groups", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setAllGroups(res.data))
//       .catch(() => {});
//   }, []);

//   // create group
//   const createGroup = async () => {
//     if (!name.trim()) {
//       alert("Group name required");
//       return;
//     }

//     await api.post(
//       "/groups",
//       { name, description },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setName("");
//     setDescription("");
//     window.location.reload(); // simple refresh
//   };

//   // join group
//   const joinGroup = async (groupId) => {
//     await api.post(
//       `/groups/${groupId}/join`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     window.location.reload(); // simple refresh
//   };

//   return (
//     <div
//       style={{
//         width: "260px",
//         background: "#1e293b",
//         color: "#fff",
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <h2 style={{ marginBottom: "15px" }}>Study Planner</h2>

//       {/* CREATE GROUP */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="Group name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ width: "100%", marginBottom: "6px", padding: "6px" }}
//         />
//         <input
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: "100%", marginBottom: "6px", padding: "6px" }}
//         />
//         <button onClick={createGroup} style={{ width: "100%" }}>
//           Create Group
//         </button>
//       </div>

//       {/* MY GROUPS */}
//       <h4 style={{ opacity: 0.7 }}>My Groups</h4>
//       {groups.map((group) => (
//         <div
//           key={group._id}
//           onClick={() => onSelectGroup(group)}
//           style={{
//             padding: "10px",
//             marginTop: "6px",
//             borderRadius: "6px",
//             cursor: "pointer",
//             background:
//               activeGroup?._id === group._id ? "#334155" : "transparent",
//           }}
//         >
//           {group.name}
//         </div>
//       ))}

//       {/* DISCOVER GROUPS */}
//       <h4 style={{ marginTop: "20px", opacity: 0.7 }}>
//         Discover Groups
//       </h4>

//       {allGroups
//         .filter((g) => !groups.some((my) => my._id === g._id))
//         .map((group) => (
//           <div
//             key={group._id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "6px",
//             }}
//           >
//             <span style={{ fontSize: "14px" }}>{group.name}</span>
//             <button onClick={() => joinGroup(group._id)}>Join</button>
//           </div>
//         ))}

//       <button onClick={onLogout} style={{ marginTop: "auto" }}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Sidebar;

import { useEffect, useState, useMemo } from "react";
import api from "../api/api";

function Sidebar({ groups, activeGroup, onSelectGroup, onLogout }) {
  const [allGroups, setAllGroups] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 1. ATTEMPT TO FIND USER NAME FROM GROUPS LIST
  // We look through all groups to find a member that matches our ID.
  const userName = useMemo(() => {
    if (!groups || groups.length === 0) return "Commander";
    for (const g of groups) {
      const me = g.members.find((m) => m._id === userId);
      if (me) return me.name;
    }
    return "Commander";
  }, [groups, userId]);

  useEffect(() => {
    api
      .get("/groups", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAllGroups(res.data))
      .catch(() => {});
  }, []);

  const createGroup = async () => {
    if (!name.trim()) { alert("Group name required"); return; }
    await api.post("/groups", { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setName(""); setDescription(""); window.location.reload(); 
  };

  const joinGroup = async (groupId) => {
    await api.post(`/groups/${groupId}/join`, {}, { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload(); 
  };

  // STYLES
  const inputStyle = {
    width: "100%", marginBottom: "8px", padding: "10px", 
    background: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(255, 255, 255, 0.1)", 
    color: "white", borderRadius: "6px", outline: "none"
  };

  const buttonStyle = {
    width: "100%", padding: "10px", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", 
    border: "none", color: "white", borderRadius: "6px", cursor: "pointer", fontWeight: "bold",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)"
  };

  return (
    <div
      style={{
        width: "280px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        zIndex: 10
      }}
    >
      {/* HEADER: UFO LOGO + STUDY PLANNER TEXT */}
      <div style={{ marginBottom: "25px", flexShrink: 0, display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ fontSize: "32px", filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.8))" }}>
          🛸
        </div>
        <div>
          <h2 style={{ 
            margin: 0,
            background: "linear-gradient(to right, #fff, #94a3b8)",
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent", 
            fontFamily: "'Orbitron', sans-serif", 
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "1px"
          }}>
            Study Planner
          </h2>
        </div>
      </div>

      {/* CREATE GROUP SECTION */}
      <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
        <input placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
        <button onClick={createGroup} style={buttonStyle}>+ Create Mission</button>
      </div>

      {/* MY GROUPS (Flexible Height) */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: "100px", marginBottom: "20px" }}>
        <h4 style={{ opacity: 0.6, textTransform: "uppercase", fontSize: "11px", letterSpacing: "1.5px", position: "sticky", top: 0, background: "rgba(15, 23, 42, 0.95)", padding: "5px 0", zIndex: 1 }}>
          My Squads
        </h4>
        {groups.map((group) => (
          <div
            key={group._id}
            onClick={() => onSelectGroup(group)}
            style={{
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeGroup?._id === group._id ? "rgba(99, 102, 241, 0.2)" : "transparent",
              border: activeGroup?._id === group._id ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
              transition: "all 0.2s",
              color: activeGroup?._id === group._id ? "#fff" : "#cbd5e1"
            }}
          >
            <div style={{ fontWeight: "500" }}>{group.name}</div>
          </div>
        ))}
      </div>

      {/* DISCOVER GROUPS (Fixed Bottom Area) */}
      <div style={{ flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px" }}>
        <h4 style={{ opacity: 0.6, textTransform: "uppercase", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "10px" }}>
          Discover
        </h4>
        <div style={{ maxHeight: "120px", overflowY: "auto", marginBottom: "15px" }}>
          {allGroups
            .filter((g) => !groups?.some((my) => my._id === g._id))
            .map((group) => (
              <div key={group._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", padding: "8px", background: "rgba(255,255,255,0.03)", borderRadius: "6px" }}>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>{group.name}</span>
                <button 
                  onClick={() => joinGroup(group._id)} 
                  style={{ background: "transparent", border: "1px solid #6366f1", color: "#6366f1", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontSize: "11px", transition: "0.2s" }}
                  onMouseOver={(e) => { e.target.style.background = "#6366f1"; e.target.style.color = "#fff"; }}
                  onMouseOut={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#6366f1"; }}
                >
                  Join
                </button>
              </div>
            ))}
             {allGroups.filter((g) => !groups?.some((my) => my._id === g._id)).length === 0 && (
               <div style={{ fontSize: "12px", color: "#64748b", fontStyle: "italic" }}>No new missions found.</div>
            )}
        </div>

        {/* --- USER PROFILE CARD --- */}
        <div style={{
          background: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          {/* Avatar */}
          <div style={{
            width: "35px", height: "35px", background: "#334155", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px"
          }}>
            👨‍🚀
          </div>

          {/* User Name */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "10px", color: "#94a3b8", textTransform: "uppercase" }}>Logged In As</div>
            <div style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "'Orbitron', sans-serif", letterSpacing: "1px", color: "#fff" }}>
              {userName}
            </div>
          </div>

          {/* Logout Button (Small Icon) */}
          <button 
            onClick={onLogout}
            title="Logout"
            style={{
              background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5", borderRadius: "6px", width: "30px", height: "30px",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}
          >
            ⏻
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;