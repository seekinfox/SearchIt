import React, { useState } from "react";
import style from "./Search.module.scss";
import { BsSearch } from "react-icons/bs";
import { RiUserSearchFill } from "react-icons/ri";
import { GiDeadHead } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export default function Search({ handleResults, users }) {
  const [suggestion, setSuggestion] = useState([]);
  //set the input in state
  const [text, setText] = useState("");

  // trigger onChange event

  const handlleSearch = (value) => {
    let matches = [];
    // filter text through the users
    const regex = new RegExp(`${text}`, "gi");

    if (text.length > 0) {
      matches = users.filter((user) => {
        return (
          user.pincode.match(regex) +
          user.id.match(regex) +
          user.name.match(regex) +
          user.address.match(regex)
        );
      });
    }
    setSuggestion(matches);
    setText(value);
  };
  //console.log(suggestion);

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    // callback to the handleresults
    handleResults(suggestion, text);
  };
  //on click handle
  const handleItem = (i) => {
    setText("");
    handleResults([i], text);
  };
  //
  const handleFocus = (e) => {
    e.target.scrollIntoView(true)
  }

  return (
    <nav>
      <span>
        <RiUserSearchFill />
        SearchIt
      </span>
      <div>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="search">
            <input
              id="search"
              type="text"
              placeholder="Search users by ID, address.."
              value={text}
              onChange={(e) => handlleSearch(e.target.value)}
            />
            <BsSearch />
            <AiOutlineClose onClick={() => setText("")} />
          </label>
        </form>
        {text === "" ? (
          ""
        ) : (
          <div className={style.suggestion__list}>
            {suggestion.length === 0 ? (
              <div className={style.em__box}>
                <GiDeadHead />
                found nothing
              </div>
            ) : (
              suggestion.map((i) => (
                <button
                  aria-expanded="false"
                  onClick={() => handleItem(i)}
                  key={i.id}
                  className={style.item}
                  onFocus={(e) => handleFocus(e)}
                >
                  <p>{i.id}</p>
                  <p>{i.name}</p>
                  <p>
                    <span>{i.address}</span> Pincode: <span>{i.pincode}</span>
                  </p>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
