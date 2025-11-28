import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import unknownImg from "../assets/unkown.png";
import "./profile.css";
//setName is like a funnler to Name is state vairables

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Profile() {
const [editMode, setEditMode] = useState(false);
 const [newName, setNewName] = useState("");
 const [newAge, setNewAge] = useState("");
 const [newBio, setNewBio] = useState("");



const [selectedFile, setSelectedFile] = useState(null);
const [previewUrl, setPreviewUrl] = useState("");


  const token = localStorage.getItem("token");
  

  const navigate = useNavigate();


  const userState = useState(null);
  const user = userState[0];
  const setUser = userState[1];


  const loadingState = useState(true);
  const loading = loadingState[0];
  const setLoading = loadingState[1];


  const errorState = useState("");
  const errorMessage = errorState[0];
  const setErrorMessage = errorState[1];

  


  useEffect(() => {

  async function fetchUser() {

    // 🧩 If no token, user is not logged in
    if (!token) {
      setErrorMessage("You are not logged in!");
      setLoading(false);
      return;
    }

    try {
      // 🧠 Send the token in the Authorization header
      const response = await fetch(`${backendUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setErrorMessage("Failed to fetch user data");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // ✅ Update state with user data
      
      setUser(data);
      setNewName(data.name || "");
      setNewAge(data.age || "");
      setNewBio(data.biography || "");
      setPreviewUrl(data.link || "");
      setLoading(false);

    } catch (error) {
      setErrorMessage("Error fetching user data");
      setLoading(false);
      console.error(error);
    }
  }
  fetchUser();},
  [setErrorMessage, setLoading, setUser,token]);


function handleLogout() {
  localStorage.removeItem("token");
  navigate("/login"); 
}

  function handleFileChange(e) {
  const file = e.target.files[0];
  setSelectedFile(file);
  setPreviewUrl(URL.createObjectURL(file)); // show instant preview
  }

async function handleUpload() {
  
  if (!selectedFile) {
    alert("Please select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);//so image is just a name that is attached with the actual file(the image)
 

  try {
    const response = await fetch(`${backendUrl}/upload`, {
    method: "POST",
      headers: {
        "authorization": `Bearer ${token}`, // ✅ only this header
      },
      body: formData
    });

    if (!response.ok) {
      alert("Failed to upload image");
      return;
    }

    const data = await response.json();
    alert("Image uploaded successfully!");
    console.log("Image URL:", data.url);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}



  //working on save
  async function handleSave() {
   
  try {
    const response = await fetch(`${backendUrl}/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",   
        "authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({
        name: newName,
        age: newAge,
        biography: newBio
      })
    });

    if (!response.ok) {
      setErrorMessage("Failed to update profile");
      return;
    }

    const updatedData = await response.json();
    setUser(updatedData);
    setEditMode(false);
  } catch (error) {
    setErrorMessage("Error updating profile");
    console.error(error);
  }
}



  if (loading) {
    return (
      <div className="login-container">
        <p>Loading...</p>
      </div>
    );
  }


  if (errorMessage) {
    return (
      <div className="login-container">
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button onClick={handleLogout}>Back to Login</button>
      </div>
    );
  }

 if (loading) return <div className="profile-container"><p>Loading...</p></div>;
  if (errorMessage) return <div className="profile-container"><p style={{ color: "red" }}>{errorMessage}</p></div>;

  return (
  <div className="profile-container">
    <div className="profile-card">
      <h2>My Profile</h2>

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <img
          src={previewUrl || user.link || unknownImg}
          alt="Profile"
          className="profile-image"
        />

        {/* Choose File */}
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange} // NOT handleUpload
        />

        <label htmlFor="imageUpload" className="upload-btn">
          Choose Photo
        </label>

        {/* Upload button */}
        <button className="save-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Edit Mode */}
      {editMode ? (
        <div className="edit-section">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            placeholder="Age"
            type="number"
          />
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="Biography"
          />

          <div className="button-group">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="info-section">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Biography:</strong> {user.biography}</p>

          <div className="button-group">
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

