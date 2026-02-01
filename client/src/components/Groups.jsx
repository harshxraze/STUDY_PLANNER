import { useEffect, useState } from "react";
import api from "../api/api";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async () => {
    if (!name) {
      alert("Group name required");
      return;
    }

    try {
      await api.post(
        "/groups",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDescription("");
      fetchGroups(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create group");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      
      {/* CREATE GROUP */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          marginBottom: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h4>Create Group</h4>

        <input
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button onClick={createGroup}>Create</button>
      </div>

      {/* GROUP LIST */}
      <h3>My Study Groups</h3>

      {loading && <p>Loading groups...</p>}

      {!loading && groups.length === 0 && <p>No groups found</p>}

      {groups.map((group) => (
        <div
  key={group._id}
  style={{
    background: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  }}
>
  <h4>{group.name}</h4>
  <p style={{ color: "#666" }}>{group.description}</p>

  <button
    onClick={() => window.dispatchEvent(
      new CustomEvent("openGroup", { detail: group })
    )}
  >
    Open Chat
  </button>
</div>

      ))}
    </div>
  );
}

export default Groups;
