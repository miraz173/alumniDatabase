'use client'
import React from "react";
import {createContext, useEffect, useState } from "react";
// import axios from "axios";
import * as c from './comps'
import Example from "./pages/profile";

const Books = () => {
  const [myObject, setMyObject] = useState([]);

  const updateObject = (newObject) => {
    setMyObject(newObject);
  };
  
  const [query, setQuery] = useState("");
  //my edit to update searchtext from interaction with other components
  const upSrchTxt = (txtvalue) => {
    if(query==''){
      setQuery(txtvalue);
    }
    else
      setQuery(query+', '+txtvalue);
  };
  //setObject takes an extra click to be updated. this will immediately update the query value.
  useEffect(() => {}, [query]);

  return (
    <>
      <main className="overflow-hidden text-center bg-color-[#faebd7] dark:text-slate-200 light:bg-#edebea">
        <div className="snap-mandatory snap-y overflow-auto h-screen mr-[-25px] pr-[0px]">
          <c.Background />
          <c.SearchSection updateObject={updateObject} upSrchTxt={upSrchTxt} query={query}  setQuery={setQuery}/>
          <c.Horizontal />
          {myObject.length>0 && <c.PersonSection books={myObject} upSrchTxt={upSrchTxt} />}
          <c.Horizontal />
          <c.Newsletter />
        </div>
       </main>
    </>
  );
};

export default Books;
