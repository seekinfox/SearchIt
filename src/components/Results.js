import React from "react";
import style from "./Results.module.scss";

export const Results = ({ results, text }) => {
  console.log("REasults C", results, text);

  return (
    <>
      {results.length > 0 ? (
        <div className={style.r__container}>
          <span>
            <strong>{text}</strong> found in <strong>{results.length}</strong>{" "}
            items
          </span>
          <div className={style.r__list}>
            {results.map((i) => (
              <div key={i.id} className={style.r__item}>
                <p>
                  {i.name} <span>{i.id}</span>
                </p>
                <p>{i.address}</p>
                <p>Pincode: {i.pincode}</p>
                <ol>
                  <h4>cart</h4>
                  {i.items.map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
