import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      alert("login Successfully");
      history.push("/Dashboard");
    } else {
      alert("Something went wrong!");
    }
  };
  
  const registerUser = async (username, email, first_name, last_name, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        first_name,
        last_name,
        password,
        password2
      })
    });
    if (response.status === 201) {
      history.push("");
      localStorage.setItem("email", JSON.stringify(email))
      alert("Successfully registered")
    } else {
     
      alert("Something went wrong!");
    }
  };
 
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const CreateMeeting = async (topic, start_time, duration, timezone) => {
    const response = await fetch("http://127.0.0.1:8000/createmeet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic, 
        start_time,  
        timezone,
        duration, 
      })
    });
    if (response.status === 200) {
      // alert("Successfully Created Meeting")
      history.push("/MeetingDetail");
    } else {
      // alert("Something went wrong!");
    }
  }

  const ListMeetings = async () => {
    const response =  await fetch("http://127.0.0.1:8000/meeting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
     
    });
    if (response.status === 200) {
      alert("Successfully Created Meeting")
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  }

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    CreateMeeting,
    ListMeetings
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);
  return (
    <AuthContext.Provider value={contextData}>
      {children} 
    </AuthContext.Provider>
  );
};


