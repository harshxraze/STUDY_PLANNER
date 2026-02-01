// import { useEffect, useState } from "react";
// import api from "../api/api";

// function NotesPanel({ group }) {
//   const [notes, setNotes] = useState([]);
//   const [text, setText] = useState("");
//   const [attachments, setAttachments] = useState([]);
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("token");

//   // =========================
//   // FETCH NOTES + ATTACHMENTS
//   // =========================
//   const fetchData = async () => {
//     if (!group) return;

//     const notesRes = await api.get(`/notes/${group._id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setNotes(notesRes.data);

//     const attachRes = await api.get(`/attachments/${group._id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setAttachments(attachRes.data);
//   };

//   // =========================
//   // SAVE NEW NOTE
//   // =========================
//   const saveNote = async () => {
//     if (!text.trim()) return;

//     await api.post(
//       "/notes",
//       { groupId: group._id, content: text },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setText("");
//     fetchData();
//   };

//   // =========================
//   // UPLOAD FILE
//   // =========================
//   const uploadFile = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("groupId", group._id);

//     await api.post("/attachments", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     setFile(null);
//     fetchData();
//   };

//   useEffect(() => {
//     fetchData();
//   }, [group]);

//   if (!group) return null;

//   return (
//     <div
//       style={{
//         width: "320px",
//         borderLeft: "1px solid #eee",
//         padding: "15px",
//         background: "#fafafa",
//         overflowY: "auto",
//       }}
//     >
//       {/* ADD NOTE */}
//       <h4>Add Note</h4>

//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a new note..."
//         style={{
//           width: "100%",
//           height: "80px",
//           resize: "none",
//           padding: "8px",
//         }}
//       />

//       <button
//         onClick={saveNote}
//         style={{ width: "100%", marginTop: "6px" }}
//       >
//         Add Note
//       </button>

//       <hr />

//       {/* NOTES LIST */}
//       <h4>Notes</h4>

//       {notes.length === 0 && (
//         <p style={{ fontSize: "13px", color: "#777" }}>
//           No notes yet
//         </p>
//       )}

//       {notes.map((n) => (
//         <div
//           key={n._id}
//           style={{
//             background: "#fff",
//             padding: "10px",
//             borderRadius: "6px",
//             marginBottom: "10px",
//             fontSize: "14px",
//             whiteSpace: "pre-wrap",
//             border: "1px solid #e5e7eb",
//           }}
//         >
//           {n.content}
//           <div
//             style={{
//               fontSize: "11px",
//               color: "#666",
//               marginTop: "4px",
//             }}
//           >
//             {n.author?.name} •{" "}
//             {new Date(n.createdAt).toLocaleString()}
//           </div>
//         </div>
//       ))}

//       <hr />

//       {/* ATTACHMENTS */}
//       <h4>Attachments</h4>

//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <button
//         onClick={uploadFile}
//         style={{ width: "100%", marginTop: "6px" }}
//       >
//         Upload
//       </button>

//       <div style={{ marginTop: "12px" }}>
//         {attachments.map((a) => (
//           <div key={a._id}>
//             <a
//               href={`http://localhost:5000/uploads/${a.filename}`}
//               target="_blank"
//               rel="noreferrer"
//             >
//               📎 {a.originalName}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default NotesPanel;

import { useEffect, useState } from "react";
import api from "../api/api";

function NotesPanel({ group }) {
  // --- LOGIC UNTOUCHED ---
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!group) return;
    const notesRes = await api.get(`/notes/${group._id}`, { headers: { Authorization: `Bearer ${token}` } });
    setNotes(notesRes.data);
    const attachRes = await api.get(`/attachments/${group._id}`, { headers: { Authorization: `Bearer ${token}` } });
    setAttachments(attachRes.data);
  };

  const saveNote = async () => {
    if (!text.trim()) return;
    await api.post("/notes", { groupId: group._id, content: text }, { headers: { Authorization: `Bearer ${token}` } });
    setText(""); fetchData();
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", group._id);
    await api.post("/attachments", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    setFile(null); fetchData();
  };

  useEffect(() => { fetchData(); }, [group]);
  // --- END LOGIC ---

  if (!group) return null;

  return (
    <div
      style={{
        width: "300px",
        borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        overflowY: "auto",
      }}
    >
      {/* ADD NOTE */}
      <h4 style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Mission Log</h4>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Log new data..."
        style={{
          width: "100%", height: "80px", resize: "none", padding: "10px",
          background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0", borderRadius: "8px", outline: "none", fontFamily: "inherit"
        }}
      />
      <button onClick={saveNote} style={{ width: "100%", marginTop: "8px", padding: "8px", background: "rgba(99, 102, 241, 0.2)", border: "1px solid rgba(99, 102, 241, 0.5)", color: "#818cf8", borderRadius: "6px", cursor: "pointer" }}>
        Save Log
      </button>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "20px 0" }} />

      {/* NOTES LIST */}
      {notes.map((n) => (
        <div key={n._id} style={{ background: "rgba(255,255,255,0.03)", padding: "10px", borderRadius: "6px", marginBottom: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: "13px", color: "#cbd5e1", whiteSpace: "pre-wrap" }}>{n.content}</div>
          <div style={{ fontSize: "10px", color: "#64748b", marginTop: "6px", textAlign: "right" }}>
            {n.author?.name} • {new Date(n.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}

      <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "20px 0" }} />

      {/* ATTACHMENTS */}
      <h4 style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Files</h4>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }} />
      <button onClick={uploadFile} style={{ width: "100%", padding: "6px", background: "#334155", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>Upload Data</button>

      <div style={{ marginTop: "12px" }}>
        {attachments.map((a) => (
          <div key={a._id} style={{ marginBottom: "6px" }}>
            <a href={`http://localhost:5000/uploads/${a.filename}`} target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "none", fontSize: "13px", display: "flex", alignItems: "center" }}>
              📄 {a.originalName}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPanel;