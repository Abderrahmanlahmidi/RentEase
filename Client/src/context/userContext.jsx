import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const displayAnnouces = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/annonces");
        setAnnouncements(response.data.annonces);
      }catch(error){
        console.log("Error get data" + error);
      }
    }
    displayAnnouces()
  }, [])


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, announcements, setAnnouncements}}>
      {children}
    </UserContext.Provider>
  );
};

 