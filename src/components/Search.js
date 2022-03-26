import React, { useState } from "react";
import style from "./Search.module.scss";
import { BsSearch } from "react-icons/bs";
import { RiUserSearchFill } from "react-icons/ri";
import Fuse from "fuse.js";
import { GiDeadHead } from "react-icons/gi";

export default function Search({ users }) {
  //const [suggestion, setSuggestion] = useState([]);
  //set the input in state
  const [text, setText] = useState("");
  const handlleSearch = (value) => {
    setText(value);
  };

  // using fuzzy search
  const fuse = new Fuse(users, {
    keys: ["id", "name", "items", "address", "pincode"]
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          </label>
        </form>
        {text === "" ? (
          ""
        ) : (
          <div className={style.suggestion__list}>
            {fuse.search(text).length === 0 ? (
              <div className={style.em__box}>
                <GiDeadHead />
                found nothing
              </div>
            ) : (
              fuse.search(text).map((i) => (
                <div key={i.item.id} className={style.item}>
                  <p>{i.item.id}</p>
                  <p>{i.item.name}</p>
                  <p>
                    <span>{i.item.address}</span> Pincode:{" "}
                    <span>{i.item.pincode}</span>
                  </p>
                  <ul>
                    <span>Cart</span>
                    {i.item.items.map((i) => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
