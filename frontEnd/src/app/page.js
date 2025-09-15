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
      <main className="w-[100vw] overflow-auto text-center bg-color-[#faebd7] dark:text-slate-200 m-auto">
        <div className="snap-mandatory snap-y h-screen mr-[-15px] pr-[0px]">
          <c.Background />
          {!logged && (
            <>
              <c.SearchSection updatePInfo={updatePInfo} upSrchTxt={upSrchTxt} query={query} setQuery={setQuery} />
              <c.PersonSection informations={pInfo} upSrchTxt={upSrchTxt} />
              <c.FooterSection updateLogged={updateLogged} updatePerson={updatePerson} />
            </>
          )}
          {logged === 1 && <c.ProfileEdit gperson={person} updateLogged={updateLogged} />}
          {logged === 2 && <c.RegisterProfile updateLogged={updateLogged} updatePerson={updatePerson} />}
        </div>
      </main>
    </>
  );
};

export default Books;
