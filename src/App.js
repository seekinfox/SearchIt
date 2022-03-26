import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);

  //load the data and set it in user state
  const loadUsers = () => {
    fetch("https://www.mocky.io/v2/5ba8efb23100007200c2750c", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      }
    })
      .then(function (response) {
        // console.log(response, "r");
        return response.json();
      })
      .then(function (myJson) {
        //set to users
        setUsers(myJson);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <Search users={users} />
    </div>
  );
}
