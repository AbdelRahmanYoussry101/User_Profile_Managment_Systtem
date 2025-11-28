import React, { useEffect, useState } from "react";
import unknownImg from "../assets/unkown.png";
import "./Home.css";


const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUser() {
      if (!token) return;

      try {
        const response = await fetch(`${backendUrl}/user`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    async function fetchProfiles() {
      try {
        const response = await fetch(`${backendUrl}/profiles`);
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }


    

    getUser();
    fetchProfiles();
  }, [token,profiles]);

async function handleDelete(profileId) {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
  try {
    const response = await fetch(`${backendUrl}/deleteUser/${profileId}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to delete user");
      return;
    }

    // Remove the deleted profile from state (so UI updates)
    setProfiles((prev) => prev.filter((p) => p.userId !== profileId));

  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

  return (
    <div className="home-container">
      <h1>All Users</h1>
      <div className="profiles-grid">
        {profiles.map((profile) => (
          <div className="profile-card" key={profile._id}>
            <img
              src={profile.link || unknownImg}
              alt={profile.name}
              className="profile-img"
            />
            <h3>{profile.name}</h3>
            <p>{profile.biography}</p>

            {/* ✅ Only show delete button if user is admin */}
            {user?.isAdmin && (
               <button className="delete-btn" onClick={() => handleDelete(profile.userId)}>
                Delete User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
