'use client'
import * as c from './comps';
import React, { useEffect, useState } from "react";

const Books = () => {
  const [pInfo, setPInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [logged, setLogged] = useState(0);
  const [person, setPerson] = useState(0);

  const upSrchTxt = (txtvalue) => setQuery(query ? `${query}, ${txtvalue}` : txtvalue);
  const updatePInfo = (newObject) => setPInfo(newObject);
  const updateLogged = (newLogged) => setLogged(newLogged);
  const updatePerson = (newPerson) => setPerson(newPerson);

  useEffect(() => { }, [query]);

  return (
    <>
      <main className="w-[100vw] overflow-hidden text-center bg-color-[#faebd7] dark:text-slate-200 m-auto">
        <div className="snap-mandatory snap-y overflow-auto h-screen mr-[-15px] pr-[0px]">
          <c.Background />
          {!logged && (
            <>
              <c.SearchSection updatePInfo={updatePInfo} upSrchTxt={upSrchTxt} query={query} setQuery={setQuery} />
              <c.PersonSection informations={pInfo} upSrchTxt={upSrchTxt} />
              <c.Newsletter updateLogged={updateLogged} updatePerson={updatePerson} />
            </>
          )}
          {logged === 1 && <c.ProfileEdit gperson={person} updateLogged={updateLogged} />}
        </div>
      </main>
    </>
  );
};

export default Books;
