// import { useEffect, useState } from "react";
// import api from "../api/api";
// import Sidebar from "../components/Sidebar";
// import GroupRoom from "../components/GroupRoom";
// import socket from "../socket/socket";

// function Dashboard() {
//   const [groups, setGroups] = useState([]);
//   const [activeGroup, setActiveGroup] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   // =========================
//   // FETCH MY GROUPS
//   // =========================
//   const fetchGroups = async () => {
//     try {
//       const res = await api.get("/groups/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setGroups(res.data);
//     } catch (err) {
//       console.error("Fetch groups error:", err);
//     }
//   };

//   // =========================
//   // LOGOUT
//   // =========================
//   const logout = () => {
//     localStorage.clear();
//     socket.disconnect();
//     window.location.reload();
//   };

//   // =========================
//   // UPDATE STUDY STATUS
//   // =========================
//   const updateStatus = (status) => {
//     socket.emit("update_status", { userId, status });
//   };

//   // =========================
//   // INITIAL LOAD
//   // =========================
//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   // =========================
//   // SOCKET CONNECT + ONLINE
//   // =========================
//   useEffect(() => {
//     if (!socket.connected) socket.connect();
//     socket.emit("user_online", userId);
//     socket.emit("get_online_users");
//   }, [userId]);

//   // =========================
//   // SOCKET LISTENERS
//   // =========================
//   useEffect(() => {
//     socket.on("status_updated", ({ userId, status }) => {
//       setGroups((prev) =>
//         prev.map((group) => ({
//           ...group,
//           members: group.members.map((m) =>
//             m._id === userId ? { ...m, status } : m
//           ),
//         }))
//       );
//     });

//     socket.on("user_online", (id) => {
//       setGroups((prev) =>
//         prev.map((group) => ({
//           ...group,
//           members: group.members.map((m) =>
//             m._id === id ? { ...m, online: true } : m
//           ),
//         }))
//       );
//     });

//     socket.on("user_offline", (id) => {
//       setGroups((prev) =>
//         prev.map((group) => ({
//           ...group,
//           members: group.members.map((m) =>
//             m._id === id ? { ...m, online: false } : m
//           ),
//         }))
//       );
//     });

//     socket.on("online_users", (ids) => {
//       setGroups((prev) =>
//         prev.map((group) => ({
//           ...group,
//           members: group.members.map((m) => ({
//             ...m,
//             online: ids.includes(m._id),
//           })),
//         }))
//       );
//     });

//     return () => {
//       socket.off("status_updated");
//       socket.off("user_online");
//       socket.off("user_offline");
//       socket.off("online_users");
//     };
//   }, []);

//   // =========================
//   // KEEP ACTIVE GROUP UPDATED
//   // =========================
//   useEffect(() => {
//     if (!activeGroup) return;
//     const updated = groups.find((g) => g._id === activeGroup._id);
//     if (updated) setActiveGroup(updated);
//   }, [groups]);
//   useEffect(() => {
//   const handler = async (e) => {
//     const groupId = e.detail;

//     try {
//       await api.post(
//         `/groups/${groupId}/leave`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setActiveGroup(null);
//       fetchGroups();
//     } catch (err) {
//       alert("Failed to leave group");
//     }
//   };

//   window.addEventListener("leaveGroup", handler);
//   return () => window.removeEventListener("leaveGroup", handler);
// }, []);


//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       {/* SIDEBAR */}
//       <Sidebar
//         groups={groups}
//         activeGroup={activeGroup}
//         onSelectGroup={setActiveGroup}
//         onLogout={logout}
//       />

//       {/* MAIN AREA */}
//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden", // 🔑 REQUIRED
//         }}
//       >
//         {/* HEADER */}
//         <div
//           style={{
//             padding: "15px 20px",
//             borderBottom: "1px solid #eee",
//             background: "#fff",
//             flexShrink: 0, // 🔑 REQUIRED
//           }}
//         >
//           <button onClick={() => updateStatus("studying")}>📘 Studying</button>
//           <button
//             onClick={() => updateStatus("break")}
//             style={{ marginLeft: "8px" }}
//           >
//             ☕ Break
//           </button>
//           <button
//             onClick={() => updateStatus("doubt")}
//             style={{ marginLeft: "8px" }}
//           >
//             ❓ Doubt
//           </button>
//         </div>

//         {/* GROUP ROOM */}
//         <div style={{ flex: 1, overflow: "hidden" }}>
//           <GroupRoom group={activeGroup} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import GroupRoom from "../components/GroupRoom";
import socket from "../socket/socket";

// STYLES (Kept same)
const btnStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  backdropFilter: "blur(5px)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
};

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 🛡️ SAFETY: Ensure we actually got an array
      setGroups(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch groups error:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    socket.disconnect();
    window.location.reload();
  };

  const updateStatus = (status) => {
    socket.emit("update_status", { userId, status });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.emit("user_online", userId);
    socket.emit("get_online_users");
  }, [userId]);

  // 🛡️ SOCKET SAFETY UPDATES
  useEffect(() => {
    socket.on("status_updated", ({ userId, status }) => {
      setGroups((prev) =>
        prev.map((group) => ({
          ...group,
          // Check if members exists before mapping
          members: group.members ? group.members.map((m) =>
            m._id === userId ? { ...m, status } : m
          ) : []
        }))
      );
    });

    socket.on("user_online", (id) => {
      setGroups((prev) =>
        prev.map((group) => ({
          ...group,
          members: group.members ? group.members.map((m) =>
            m._id === id ? { ...m, online: true } : m
          ) : []
        }))
      );
    });

    socket.on("user_offline", (id) => {
      setGroups((prev) =>
        prev.map((group) => ({
          ...group,
          members: group.members ? group.members.map((m) =>
            m._id === id ? { ...m, online: false } : m
          ) : []
        }))
      );
    });

    socket.on("online_users", (ids) => {
      // Safety check if ids is null
      if (!ids || !Array.isArray(ids)) return; 
      
      setGroups((prev) =>
        prev.map((group) => ({
          ...group,
          members: group.members ? group.members.map((m) => ({
            ...m,
            online: ids.includes(m._id),
          })) : []
        }))
      );
    });

    return () => {
      socket.off("status_updated");
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("online_users");
    };
  }, []);

  useEffect(() => {
    if (!activeGroup) return;
    const updated = groups.find((g) => g._id === activeGroup._id);
    if (updated) setActiveGroup(updated);
  }, [groups]);

  useEffect(() => {
    const handler = async (e) => {
      const groupId = e.detail;
      try {
        await api.post(
          `/groups/${groupId}/leave`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActiveGroup(null);
        fetchGroups();
      } catch (err) {
        alert("Failed to leave group");
      }
    };
    window.addEventListener("leaveGroup", handler);
    return () => window.removeEventListener("leaveGroup", handler);
  }, []);

  return (
    <div className="space-bg" style={{ display: "flex", height: "100vh", overflow: "hidden", color: "#fff" }}>
      {/* BACKGROUND ANIMATION LAYER */}
      <div className="stars"></div>

      {/* SIDEBAR */}
      <Sidebar
        groups={groups}
        activeGroup={activeGroup}
        onSelectGroup={setActiveGroup}
        onLogout={logout}
      />

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backdropFilter: "blur(3px)", 
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "15px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(15, 23, 42, 0.6)", 
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "15px", fontSize: "14px", opacity: 0.7, letterSpacing: "1px" }}>STATUS:</span>
          
          <button 
            onClick={() => updateStatus("studying")} 
            style={{...btnStyle, borderColor: "#3b82f6", boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)"}}
          >
            📘 Studying
          </button>
          
          <button
            onClick={() => updateStatus("break")}
            style={{ ...btnStyle, marginLeft: "12px", borderColor: "#f59e0b", boxShadow: "0 0 10px rgba(245, 158, 11, 0.3)" }}
          >
            ☕ Break
          </button>
          
          <button
            onClick={() => updateStatus("doubt")}
            style={{ ...btnStyle, marginLeft: "12px", borderColor: "#ef4444", boxShadow: "0 0 10px rgba(239, 68, 68, 0.3)" }}
          >
            ❓ Doubt
          </button>
        </div>

        {/* GROUP ROOM */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <GroupRoom group={activeGroup} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;