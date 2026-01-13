import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function UserManagement() {
  /* ======================
     ✅ HOOKS FIRST (IMPORTANT)
  ====================== */
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });
  const [editIndex, setEditIndex] = useState(null);

  const role = localStorage.getItem("role");

  /* ======================
     LOAD USERS
  ====================== */
  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  /* ======================
     🔒 ADMIN PROTECTION
  ====================== */
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  /* ======================
     SAVE USERS
  ====================== */
  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  /* ======================
     ADD / UPDATE USER
  ====================== */
  const handleSubmit = () => {
    if (!form.username || !form.password) {
      alert("All fields required");
      return;
    }

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = form;
      saveUsers(updated);
      setEditIndex(null);
    } else {
      saveUsers([...users, form]);
    }

    setForm({ username: "", password: "", role: "staff" });
  };

  /* ======================
     EDIT USER
  ====================== */
  const editUser = (index) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  /* ======================
     DELETE USER
  ====================== */
  const deleteUser = (index) => {
    if (!window.confirm("Delete this user?")) return;
    const updated = users.filter((_, i) => i !== index);
    saveUsers(updated);
  };

  /* ======================
     UI
  ====================== */
  return (
    <div style={{ padding: "30px" }}>
      <h2>👥 User Management</h2>
      <p style={{ color: "#666" }}>
        Manage Staff & Suppliers (Admin only)
      </p>

      {/* FORM */}
      <div style={formStyle}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="staff">Staff</option>
          <option value="supplier">Supplier</option>
        </select>

        <button onClick={handleSubmit}>
          {editIndex !== null ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Username</th>
            <th style={th}>Role</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td style={td}>{u.username}</td>
              <td style={td}>{u.role}</td>
              <td style={td}>
                <button onClick={() => editUser(i)}>Edit</button>
                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => deleteUser(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */
const formStyle = {
  display: "flex",
  gap: "10px",
  margin: "20px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px" };

export default UserManagement;
