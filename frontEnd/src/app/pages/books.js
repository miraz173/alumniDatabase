// 'use client'
import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as c from "../comps";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001");
        console.log(res);
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <>
      <main className="overflow-hidden text-center bg-color-[#faebd7] dark:text-slate-200 light:bg-#edebea">
        <div className="snap-mandatory snap-y overflow-auto h-screen mr-[-50px] pr-[50px]">
          <c.Background />
          <c.SearchSection logo="/Olympic_eve.jpg" />
          <c.Horizontal />
          <c.PersonSection books={books} />
          <c.Horizontal />
          <c.ProfileEdit />
          <c.Horizontal />
          <c.Newsletter />
        </div>
      </main>
    </>
  );
};

export default Books;
