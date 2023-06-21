import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export function Background() {
  return (
    <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
      <div
        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style={{
          // clipPath: "polygon(24% 8%, 27% 7%, 25% 1%, 28% 5%, 34% 14%, 35% 10%, 40% 19%, 41% 15%, 43% 26%, 52% 26%, 61% 25%, 70% 25%, 76% 31%, 72% 34%, 74% 40%, 70% 44%, 64% 45%, 59% 51%, 58% 58%, 59% 66%, 63% 73%, 63% 69%, 66% 75%, 65% 60%, 70% 60%, 73% 53%, 77% 89%, 76% 95%, 72% 89%, 71% 100%, 67% 83%, 64% 77%, 60% 88%, 58% 82%, 57% 90%, 53% 91%, 49% 86%, 48% 94%, 45% 86%, 43% 94%, 39% 89%, 36% 93%, 35% 80%, 35% 69%, 32% 60%, 26% 58%, 23% 52%, 26% 41%, 33% 39%, 30% 31%, 27% 28%, 22% 24%, 22% 15%)",
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}></div>
    </div>
  );
}

export function KeyButton({ title, num, upSrchTxt }) {
  let btnclrs = {
    1: "bg-red-50 text-red-700 ring-red-600/10",
    2: "bg-gray-50 text-gray-600 ring-gray-500/10",
    3: "bg-pink-50 text-pink-700 ring-pink-700/10",
    4: "bg-green-50 text-green-700 ring-green-600/20",
    5: "bg-blue-50 text-blue-700 ring-blue-700/10",
    6: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
    7: " bg-purple-50 text-purple-700 ring-purple-700/10",
  };

  const handleClick = () => {
    upSrchTxt(title);
  };

  if (title) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center rounded-md px-2 py-1 m-1.5 text-sm font-medium ring-1 ring-inset ${btnclrs[num]}`}>
        {title}
      </button>
    );
  }
}

export function SocialButton(props) {
  let color = {
    whatsapp: "text-green-700",
    twitter: "text-blue-700",
    github: "text-black",
    discord: "text-violet-700",
    dribble: "text-[#ea4c89]",
    messenger: "text-[#0084ff]",
    email: "text-red-600",
    phone: "text-blue-600",
  };
  let path = {
    whatsapp:
      "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
    twitter:
      "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
    github:
      "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    discord:
      "M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z",
    dribble:
      "M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z",
    messenger:
      "M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z",
    email:
      "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
    phone:
      "M13.6,8.5L9.5,4.3C9,3.9,8.3,3.9,7.8,4.3L4.7,7.5 C4,8.1,3.8,9.1,4.1,9.9c0.8,2.3,2.9,6.9,7,11s8.7,6.1,11,7c0.9,0.3,1.8,0.1,2.5-0.5l3.1-3.1c0.5-0.5,0.5-1.2,0-1.7l-4.1-4.1 c-0.5-0.5-1.2-0.5-1.7,0l-2.5,2.5c0,0-2.8-1.2-5-3.3s-3.3-5-3.3-5l2.5-2.5C14.1,9.7,14.1,8.9,13.6,8.5z",
  };

  return (
    <a href={props.link}>
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        className={`cursor-alias mb-2 inline-block rounded px-3 py-2 text-xs ${
          color[props.title]
        } font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d={path[props.title]} />
        </svg>
      </button>
    </a>
  );
}

export function PersonCard({ props, upSrchTxt }) {
  let kbuttons = [];
  if (props.keywords) {
    let objarr = props.keywords.split(",");
    let rndm = Math.floor(Math.random() * 7) + 1;
    for (let i = 0; i < objarr.length; i++) {
      kbuttons.push(
        <KeyButton title={objarr[i]} num={rndm++} upSrchTxt={upSrchTxt} />
      );
      rndm = rndm >= 8 ? 1 : rndm;
    }
  }

  let sbuttons = [];
  if (props.contacts) {
    let pArr = props.contacts.split(",");
    for (let i = 0; i < pArr.length; i++) {
      let scl = pArr[i].split(" ");
      if (scl.length>2) {
        scl.shift();
      }
      console.log(scl);
      if (scl[1].length > 0) {
        sbuttons.push(<SocialButton title={scl[0]} link={scl[1]} />);
      }
    }
  }

  return (
    <>
      {/*self-start makes the card's height remain independent of other card height in the same row of grid*/}
      <div className="text-center min-w-[20vw] rounded-md bg-pink-50 m-5 font-medium text-teal-800 ring-1 ring-inset ring-yellow-600/20 snap-start">
        {/*flex flex-col*/}
        <div
          className="flex flex-wrap items-center p-3"
          style={{ justifyContent: "space-between" }}>
          <div className="text-left pl-[1vw]">
            <h1 style={{ fontSize: "2vh", color: "rgb(25, 23, 23)" }}>
              {props.name}
            </h1>
            <p style={{ fontSize: "1.5vh" }}>
              {props.position}, {props.company}
            </p>
          </div>
          <div className="float-center pr-[1vw]">
            <Image
              src={props.image}
              alt="profile"
              className="relative m-auto w-[4vh] h-[4vh] overflow-hidden rounded-full"
              height={"4"}
              width={"4"}
            />
          </div>
        </div>

        <div style={{ fontSize: "x-small" }} className="pb-1.5 mt-1">
          {kbuttons}
        </div>
        <div
          style={{
            backgroundColor: "#e5d5de",
            width: "100%",
            height: "1px",
            marginBottom: "1.5px",
          }}></div>
        <div className="bottom-0 mt-auto">{sbuttons}</div>
      </div>
    </>
  );
}

export function PersonSection({ books, upSrchTxt }) {
  const sectionRef = useRef(null); // Create a ref to access the section DOM element

  useEffect(() => {
    if (sectionRef.current) {
      // Scroll smoothly to the top of the section when it mounts
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [books]);

  return (
    <div ref={sectionRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-6 snap-start">
        {books.map((book, i) => (
          <PersonCard key={i} props={book} upSrchTxt={upSrchTxt}/>
        ))}
      </div>
    </div>
  );
}

export function SearchSection({ updateObject, upSrchTxt, query, setQuery }) {
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      console.log(encodeURIComponent(query));
      const response = await axios.get(
        `http://localhost:3001/?query=${encodeURIComponent(query)}`
      );
      // console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  updateObject(results); //update the value of Object using useState

  return (
    <>
      <div style={{ minHeight: "100%" }} className="snap-start">
        <div
          style={{
            padding: "4%",
            fontFamily: "Courier New, Courier, monospace",
          }}>
          <Image
            src={"/ruet.png"}
            alt="ruet logo"
            width={100}
            height={100}
            style={{ margin: "auto", display: "block" }}
          />
          <h1 style={{ fontSize: "5.5vw" }}>RUET Alumni Association</h1>
          <h2 style={{ fontSize: "2.5vw" }}>
            Let Ali&apos;s light be Efte&apos;s guide
          </h2>
        </div>

        <div style={{ width: "75%", paddingLeft: "25%", paddingBottom: "4%" }}>
          <form onSubmit={handleSearch}>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  console.log(query);
                }}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Series, Person, Organisations..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
          </form>
        </div>
        <div>
          <KeyButton title="Google" num={4} upSrchTxt={upSrchTxt} />
          <KeyButton title="19 Series" num={3} upSrchTxt={upSrchTxt} />
          <KeyButton title="USA" num={2} upSrchTxt={upSrchTxt} />
          <KeyButton title="Harvard" num={1} upSrchTxt={upSrchTxt} />
          <KeyButton title="Amazon" num={7} upSrchTxt={upSrchTxt} />
          <KeyButton title="CEO" num={5} upSrchTxt={upSrchTxt} />
          <KeyButton title="Data Analyst" num={6} upSrchTxt={upSrchTxt} />
        </div>
      </div>
    </>
  );
}

export function Horizontal() {
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "1px",
        backgroundColor: "aqua",
      }}>
      <br />
    </div>
  );
}

export function ProfileEdit() {
  return (
    <div>
      {/* bg-gradient-to-b from-slate-900 to-indigo-900 */}
      <div class="border-b-2 block md:flex">
        <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 shadow-md ml-6">
          <div class="flex justify-between">
            <span class="text-xl font-semibold block">Admin Profile</span>
            <a
              href="#"
              class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
              Edit
            </a>
          </div>

          <span class="text-gray-600">
            This information is secret so be careful
          </span>
          <div class="w-full p-8 mx-2 flex justify-center">
            {/* <Image id="showImage" className="max-w-xs w-32 items-center border" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt="" height={'100'} width={'100'}></Image> */}
          </div>
        </div>

        <div class="w-full md:w-3/5 p-8 lg:ml-4 shadow-md mr-6">
          <div class="rounded  shadow p-6">
            <div class="pb-6">
              <label for="name" class="font-semibold text-gray-700 block pb-1">
                Name
              </label>
              <div class="flex">
                <input
                  disabled
                  id="username"
                  class="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value="Jane Name"
                />
              </div>
            </div>
            <div class="pb-4">
              <label for="about" class="font-semibold text-gray-700 block pb-1">
                Email
              </label>
              <input
                disabled
                id="email"
                class="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value="example@example.com"
              />
              <span class="text-gray-600 pt-4 block opacity-70">
                Personal login information of your account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Newsletter() {
  return (
    <>
      <div className="relative inset-x-0 bottom-0 isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 snap-start focus:snap-none hover:snap-none text-left">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                For Ur Crude Kindness.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Nostrud amet eu ullamco nisi aute in ad minim nostrud
                adipisicing velit quis. Duis tempor incididunt dolore.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label for="email-address" class="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Subscribe
                </button>
              </div>
            </div>
            <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div class="flex flex-col items-start">
                <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                </div>
                <dt class="mt-4 font-semibold text-white">Weekly articles</dt>
                <dd class="mt-2 leading-7 text-gray-400">
                  Non laboris consequat cupidatat laborum magna. Eiusmod non
                  irure cupidatat duis commodo amet.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
                    />
                  </svg>
                </div>
                <dt class="mt-4 font-semibold text-white">No spam</dt>
                <dd class="mt-2 leading-7 text-gray-400">
                  Officia excepteur ullamco ut sint duis proident non
                  adipisicing. Voluptate incididunt anim.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}></div>
        </div>
      </div>
    </>
  );
}

export function HomePage() {
  return (
    <main className="overflow-hidden text-center bg-color-[#faebd7] dark:text-slate-200 light:bg-#edebea">
      <div className="snap-mandatory snap-y overflow-auto h-screen mr-[-50px] pr-[50px]">
        <Background />
        <SearchSection logo="/Olympic_eve.jpg" />
        <Horizontal />
        <PersonSection />
        <Horizontal />
        <ProfileEdit />
        <Horizontal />
        <Newsletter />
      </div>
    </main>
  );
}
