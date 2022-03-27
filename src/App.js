import React, { useEffect, useState } from "react";
import { Results } from "./components/Results";
import Search from "./components/Search";
import "./styles.scss";

export default function App() {
  //all users state
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
        return response.json();
      })
      .then(function (myJson) {
        //set the results to users state
        setUsers(myJson);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // state for results and the input text 
  const [results, setResults] = useState([]);
  const [rText, setRText] = useState("");

  //getting data from search suggestions and text input
  const handleResults = (suggestion, text) => {
    setResults(suggestion);
    setRText(text);
  };

  return (
    <div className="App">
      <Search handleResults={handleResults} users={users} />
      <Results results={results} text={rText} />
    </div>
  );
}
