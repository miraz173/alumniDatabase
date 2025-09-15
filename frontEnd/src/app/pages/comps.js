import axios from "axios";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useRef } from "react";
import { kMaxLength } from "buffer";

const ipNport = "http://localhost:3001/";
// const ipNport = "https://alumniserver.up.railway.app/";

export function Horizontal() {
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "1px",
        backgroundColor: "aqua",
      }}
    >
      <br />
    </div>
  );
}

export function Background() {
  return (
    <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
      <div
        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style={{
          // clipPath: "polygon(24% 8%, 27% 7%, 25% 1%, 28% 5%, 34% 14%, 35% 10%, 40% 19%, 41% 15%, 43% 26%, 52% 26%, 61% 25%, 70% 25%, 76% 31%, 72% 34%, 74% 40%, 70% 44%, 64% 45%, 59% 51%, 58% 58%, 59% 66%, 63% 73%, 63% 69%, 66% 75%, 65% 60%, 70% 60%, 73% 53%, 77% 89%, 76% 95%, 72% 89%, 71% 100%, 67% 83%, 64% 77%, 60% 88%, 58% 82%, 57% 90%, 53% 91%, 49% 86%, 48% 94%, 45% 86%, 43% 94%, 39% 89%, 36% 93%, 35% 80%, 35% 69%, 32% 60%, 26% 58%, 23% 52%, 26% 41%, 33% 39%, 30% 31%, 27% 28%, 22% 24%, 22% 15%)",
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      ></div>
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
  title = title.trim();

  if (title && title.length > 0) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center rounded-md px-2 py-1 m-1.5 text-sm font-medium ring-1 ring-inset ${btnclrs[num]}`}
      >
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
    facebook: "text-[#1877F2]",
    email: "text-red-600",
    phone: "text-blue-600",
    linkedin: "text-blue-800",
    telegram: "text-[#61A8DE]",
    stackoverflow: "text-[#f58925]",
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
    facebook:
      "M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z",
    email:
      "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
    phone:
      "M13.6,8.5L9.5,4.3C9,3.9,8.3,3.9,7.8,4.3L4.7,7.5 C4,8.1,3.8,9.1,4.1,9.9c0.8,2.3,2.9,6.9,7,11s8.7,6.1,11,7c0.9,0.3,1.8,0.1,2.5-0.5l3.1-3.1c0.5-0.5,0.5-1.2,0-1.7l-4.1-4.1 c-0.5-0.5-1.2-0.5-1.7,0l-2.5,2.5c0,0-2.8-1.2-5-3.3s-3.3-5-3.3-5l2.5-2.5C14.1,9.7,14.1,8.9,13.6,8.5z",
    linkedin:
      "M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z",
    telegram:
      "m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z",
    stackoverflow:
      "M13.492 18.136v-5.272h1.665v7.022H.13v-7.022h1.665v5.272z M3.632 12.364l8.173 1.795.346-1.727-8.173-1.796-.346 1.728zm1.082-4.091l7.567 3.704.692-1.59-7.568-3.728-.691 1.614zm2.097-3.91l6.421 5.614 1.06-1.34L7.87 3.022l-1.06 1.34zM10.962.206L9.622 1.25l4.973 7.045 1.34-1.045L10.962.205zM3.46 16.364h8.346v-1.75H3.46v1.75z",
  };

  let link =
    props.title == "phone"
      ? "tel:" + props.link
      : props.title == "email"
        ? "mailto:" + props.link
        : props.link;

  let defaultPath =
    "M3.19 9.345a.97.97 0 0 1 1.37 0 .966.966 0 0 1 0 1.367l-2.055 2.052a1.932 1.932 0 0 0 0 2.735 1.94 1.94 0 0 0 2.74 0l4.794-4.787a.966.966 0 0 0 0-1.367.966.966 0 0 1 0-1.368.97.97 0 0 1 1.37 0 2.898 2.898 0 0 1 0 4.103l-4.795 4.787a3.879 3.879 0 0 1-5.48 0 3.864 3.864 0 0 1 0-5.47L3.19 9.344zm11.62-.69a.97.97 0 0 1-1.37 0 .966.966 0 0 1 0-1.367l2.055-2.052a1.932 1.932 0 0 0 0-2.735 1.94 1.94 0 0 0-2.74 0L7.962 7.288a.966.966 0 0 0 0 1.367.966.966 0 0 1 0 1.368.97.97 0 0 1-1.37 0 2.898 2.898 0 0 1 0-4.103l4.795-4.787a3.879 3.879 0 0 1 5.48 0 3.864 3.864 0 0 1 0 5.47L14.81 8.656z";

  if (props.link != "undefined") {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className={`cursor-alias mb-2 inline-block rounded px-3 py-2 text-xs ${color[props.title]
            } font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d={path[props.title] ? path[props.title] : defaultPath} />
          </svg>
        </button>
      </a>
    );
  }
}

export function PersonCard({ props, upSrchTxt }) {
  const [pop, setPop] = useState(0);
  useEffect(() => { }, [pop]);
  const openPop = (val) => {
    setPop(val);
  };

  let kbuttons = [];
  if (props.keywords) {
    let objarr = props.keywords.split(",");
    let rndm = Math.floor(Math.random() * 7) + 1;
    for (let i = 0; i < objarr.length; i++) {
      kbuttons.push(
        <KeyButton
          title={objarr[i]}
          num={rndm++}
          upSrchTxt={upSrchTxt}
          key={i}
        />
      );
      rndm = rndm >= 8 ? 1 : rndm;
    }
  }

  let sbuttons = [];
  if (props.contacts) {
    let pArr = props.contacts.split(",");
    for (let i = 0; i < pArr.length; i++) {
      pArr[i] = pArr[i].trim();
      let scl = pArr[i].split(" ");
      // if (scl.length > 2) {
      //   scl.shift();
      // }
      if (!scl[1]) {
        continue;
      }
      if (scl[1].length > 0) {
        sbuttons.push(<SocialButton title={scl[0]} link={scl[1]} key={i} />);
      }
    }
  }

  return (
    <>
      {/*self-start makes the card's height remain independent of other card height in the same row of grid*/}
      {/*flex flex-col  */}
      {pop === 0 && (
        <div className="snap-start md:max-[50vh] lg:max-h-[30vh] text-center min-w-[20vw] rounded-md bg-pink-50 m-5 font-medium text-teal-800 ring-1 ring-inset ring-yellow-600/20">
          <div
            className="flex flex-wrap items-center p-3"
            style={{ justifyContent: "space-between" }}
          >
            <div className="text-left pl-[1vw]">
              <button
                style={{ fontSize: "2vh", color: "rgb(25, 23, 23)" }}
                onClick={() => openPop(1)}
              >
                {props.name}
              </button>
              <p style={{ fontSize: "1.5vh" }}>
                {props.position}
                {props.company ? "," : ""} {props.company}
              </p>
            </div>
            <div className="float-center pr-[1vw]">
              <Image
                src={props.thumbnail ? props.thumbnail : "/ruet.png"} //image link here
                alt="profile"
                className="relative m-auto w-[4vh] h-[4vh] overflow-hidden rounded-full"
                height={"80"}
                width={"80"}
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
            }}
          ></div>
          <div className="bottom-0 mt-auto">{sbuttons}</div>
        </div>
      )}
      {pop === 1 && <PersonDesc props={props} openPop={openPop} />}
    </>
  );
}

export function PersonDesc({ props, openPop }) {
  let sbuttons = [];
  if (props.contacts) {
    let pArr = props.contacts.split(",");
    for (let i = 0; i < pArr.length; i++) {
      pArr[i] = pArr[i].trim();
      let scl = pArr[i].split(" ");
      // if (scl.length > 2) {
      //   scl.shift();
      // }
      if (!scl[1]) {
        continue;
      }
      if (scl[1].length > 0) {
        sbuttons.push(<SocialButton title={scl[0]} link={scl[1]} key={i} />);
      }
    }
  }
  return (
    <>
      <div className="snap-start text-sm text-center relative justify-center p-4 m-2 rounded-md border border-b-slate-800 dark:border-0  bg-pink-50 dark:text-black">
        <div className="float-center pr-[1vw]">
          <Image
            src={props.image ? props.image : "/ruet.png"}
            alt="profile"
            className="relative m-auto w-[12vh] h-[12vh] overflow-hidden rounded-full"
            height={"120"}
            width={"120"}
          />
        </div>
        <br />
        <button onClick={() => openPop(0)} className="text-blue-600 text-lg">
          {props.name}
        </button>
        <h4>
          {props.position}
          {props.company ? ", " + props.company : ""}
        </h4>
        <br />
        {props.about && (
          <>
            <h4 className="text-cyan-400 underline"> &nbsp;About&nbsp; </h4>
            <p>{props.about}</p>
            <br />
          </>
        )}
        {props.higherEd && (
          <>
            <h2 className="text-cyan-600 underline">Higher Education</h2>
            <p>{props.higherEd}</p>
            <br />
          </>
        )}
        <h2 className="text-cyan-400 underline">Related Attributes</h2>
        <p>{props.attributes}</p>
        <br />
        {(props.city || props.state || props.country) && (
          <>
            <h2 className="text-cyan-400 underline">Living In</h2>
            <p>
              {props.city}
              {props.state ? ", " + props.state : ""}
              {props.country ? ", " + props.country : ""}{" "}
            </p>
            <br />
          </>
        )}
        {sbuttons.length > 0 && (
          <>
            <h2 className="text-cyan-400 underline pb-1">Contacts</h2>
            <div className="bottom-0 mt-auto">{sbuttons}</div>
          </>
        )}
      </div>
    </>
  );
}

export function PersonSection({ informations, upSrchTxt }) {
  const sectionRef = useRef(null); // Create a ref to access the section DOM element

  useEffect(() => {
    if (sectionRef.current) {
      // Scroll smoothly to the top of the section when it mounts
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [informations]);

  if (informations.length > 0) {
    return (
      <>
        <Horizontal />
        <div ref={sectionRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-6">
            {informations.map((info, i) => (
              <PersonCard key={i} props={info} upSrchTxt={upSrchTxt} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export function SearchSection({ updatePInfo, upSrchTxt, query, setQuery }) {
  const [kb, setKb] = useState([]);

  useEffect(() => {
    axios
      .get(ipNport + `kahoot`)
      .then((response) => {
        const buttons = response.data.map((data, index) => (
          <KeyButton
            title={data.attribute}
            num={(index % 7) + 1}
            upSrchTxt={upSrchTxt}
            key={index}
          />
        ));
        setKb(buttons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [upSrchTxt]);

  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.get(
  //       // `http://localhost:3001/?query=${encodeURIComponent(query)}`
  //       ipNport + `?query=${encodeURIComponent('1'+query)}`
  //     );
  //     if (response.data.length == 0) {
  //       alert("No data found related to the term/terms :(");
  //     }
  //     else {updatePInfo(response.data);//setResults(response.data);
  //     // console.log(ipNport + `?query=${encodeURIComponent(query)}`);
  //   }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const similarSearch = async (event, x) => {
    event.preventDefault();
    try {
      const url = `${ipNport}?query=${encodeURIComponent(x + query)}`;
      const response = await axios.get(url);
      if (response.data.length === 0) {
        alert("No data found related to the term/terms :(");
      } else {
        updatePInfo(response.data);
        console.log(url);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div style={{ minHeight: "100%" }} className="snap-start m-auto">
        <div
          style={{
            padding: "4%",
            fontFamily: "Courier New, Courier, monospace",
          }}
        >
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

        <div className="w-[85%] md:w-[75%] pl-[15%] md:pl-[25%] pb-16 md:pb-[4%]">
          {/* <form onSubmit={handleSearch}> */}
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Name, Position, Organisation..."
              required
            />
            <div className="absolute md:right-2.5 md:bottom-2.5 flex flex-row pt-1 md:pt-0">
              <button
                onClick={(event) => similarSearch(event, "1")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
              >
                Exact Search
              </button>
              <button
                onClick={(event) => similarSearch(event, "2")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Similar Search
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
        <div>{kb}</div>
      </div>
    </>
  );
}

export function Newsletter({ updateLogged, updatePerson }) {
  return (
    <>
      <Horizontal />
      <div className="snap-end relative inset-x-0 bottom-0 isolate overflow-hidden bg-gray-900 pb-8 pt-10 sm:pt-16 lg:pt-20 text-left">
        <div className="mx-auto px-5 lg:px-7">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-12 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg mx-auto lg:order-first sm:order-last order-last">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">
                Contact Us
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                FotkaHub Inc.
                <br />
                Dept. of Computer Science and Engineering
                <br />
                Rajshahi University of Engineering and Technology
                <br />
                <SocialButton title={"phone"} link={"+8801860424939"} key={2} />
                &nbsp;
                <SocialButton
                  title={"email"}
                  link={"miraz173r@gmail.com"}
                  key={3}
                />
                &nbsp;
                <SocialButton
                  title={"facebook"}
                  link={"Miriam_Libre.com"}
                  key={1}
                />
              </p>
            </div>
            <div className="max-w-xl lg:max-w-lg mx-auto lg:order-last sm:order-first">
              <Login updateLogged={updateLogged} updatePerson={updatePerson} />
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export function Login({ updateLogged, updatePerson }) {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(ipNport + "login", { roll, password })
      .then((response) => {
        const { token } = response.data;

        // Store the JWT in local storage
        localStorage.setItem("token", token);

        console.log("Success:", response.data);
        const decoded = jwtDecode(String(token));
        console.log("Decoded JWT:", decoded);

        updatePerson(decoded);
        updateLogged(1); // Redirect the user to a protected route. can use React Router for navigation
      })
      .catch((error) => {
        console.error(error);
        alert("wrong password or roll! Or a Hacker :O");
        // Handle login error
      });
  };
  return (
    <div className="relative justify-center overflow-hidden">
      <div className="w-full m-auto lg:max-w-2xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Sign in
        </h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row lg:flex-row">
            <div className="mb-2 lg:w-1/2 lg:mr-2 md:pr-2">
              <label htmlFor="roll" className="sr-only">
                RUET Roll Number
              </label>
              <input
                id="roll"
                name="roll"
                type="roll"
                autoComplete="roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
                className="w-full min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your Roll"
              />
            </div>
            <div className="hidden md:block lg:block w-[0.5%] bg-gray-600"></div>
            <div className="mb-2 lg:w-1/2 lg:ml-2 md:pl-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a> */}

          <div onClick={() => updateLogged(2)} className="text-xs text-purple-600 hover:underline">
            Register New Account
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProfileEdit({ gperson, updateLogged }) {
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [person, setPerson] = useState({}); //...gperson
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPerson((person) => ({
      ...person,
      [name]: value,
    }));
  };

  useEffect(() => {
    (person.contacts =
      "phone " +
      person.phone +
      ", email " +
      person.email +
      ", facebook " +
      person.facebook +
      ", " +
      person.socialmedia),
      (person.keywords =
        person.attributes +
        ", " +
        person.state +
        ", " +
        person.country +
        ", " +
        person.roll); //for updating card preview
  }, [person]);
  useEffect(() => {
    if (gperson) {
      if (gperson.contacts) {
        gperson.phone = gperson.contacts.split(", ")[0].split(" ")[1]
          ? gperson.contacts.split(", ")[0].split(" ")[1]
          : "";
        gperson.email = gperson.contacts.split(", ")[1].split(" ")[1]
          ? gperson.contacts.split(", ")[1].split(" ")[1]
          : "";
        gperson.facebook = gperson.contacts.split(", ")[2].split(" ")[1]
          ? gperson.contacts.split(", ")[2].split(" ")[1]
          : "";
        gperson.socialmedia = gperson.contacts
          .split(",")
          .slice(3)
          .toString()
          .slice(1)
          ? gperson.contacts.split(",").slice(3).toString().trim()
          : "";
        gperson.image = gperson.image ? gperson.image : "/ruet.png";
        gperson.thumbnail = gperson.thumbnail ? gperson.thumbnail : "/ruet.ico";
      }
      setPerson({ ...gperson });
    }
  }, [gperson]);

  const handleSubmit = (e) => {
    e.preventDefault();
    person.contacts =
      "phone " +
      person.phone +
      ", email " +
      person.email +
      ", facebook " +
      person.facebook +
      ", " +
      person.socialmedia;
    // console.log(person.contacts);

    const token = localStorage.getItem("token");
    axios
      .post(ipNport + "edit-profile", token)
      .then((response) => {
        console.log(response.data);
        updateLogged(0);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };
  const cancelButton = (e) => {
    updateLogged(0);
  };
  const handleUploadPic = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dknq7gnuo",
        api_key: "864344218735264",
        uploadPreset: "ml_default",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#10173a",
            sourceBg: "#20304b",
            windowBorder: "#7171D0",
            tabIcon: "#79F7FF",
            inactiveTabIcon: "#8E9FBF",
            menuIcons: "#CCE8FF",
            link: "#72F1FF",
            action: "#5333FF",
            inProgress: "#00ffcc",
            complete: "#33ff00",
            error: "#cc3333",
            textDark: "#000000",
            textLight: "#ffffff",
          },
          fonts: {
            default: null,
            "'IBM Plex Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
              active: true,
            },
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          person.thumbnail = result.info.thumbnail_url;
          person.image = result.info.secure_url;
          console.log(person);
        }
      }
    );
    myWidget.open();
  };
  const changePass = (e) => {
    e.preventDefault();
    if (newPass !== newPass2) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Continue with password change logic
    let request = { roll: person.roll, password: pass, newPass: newPass };
    axios
      .post(ipNport + "cngpass", request)
      .then((response) => {
        console.log(response.data.changedRows + " record(s) updated");
        if (response.data.changedRows === 0) {
          alert("Wrong Password");
        } else {
          alert("Password Changed Successfully");
          updateLogged(0);
        }
        // console.log("Password change submitted:", { pass, newPass });
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <>
      {/* snap-start */}

      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200 mt-4 mx-auto justify-center">
        Change Password
      </h2>
      <form
        className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 dark:text-white w-[64%] m-auto justify-center"
        onSubmit={changePass}
      >
        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="newPass"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
          >
            New Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              autoComplete="newPassword"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="newPassword2"
              id="newPassword2"
              autoComplete="newPassword"
              value={newPass2}
              onChange={(e) => setNewPass2(e.target.value)}
              className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Change Password
        </button>
      </form>

      <div className="h-[1px] w-[65vw] dark:bg-slate-300 bg-violet-500 mx-auto"></div>

      <form className="px-[18%] mb-6 dark:text-white" onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12 mb-3 space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200 mt-4">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-blue-600">
            The information will be publicly visible.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  value={person["name"]}
                  autoComplete="fullname"
                  className="block w-full indent-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              Profile Pic
              <Image
                src={person.image ? person.image : "/ruet.png"} //image link here'/vercel.svg'
                alt="profile"
                className="relative m-auto w-[8vh] h-[8vh] overflow-hidden rounded-full"
                height={"80"}
                width={"80"}
              />
            </div>

            <div className="sm:col-span-1">
              Update Profile Pic
              <button
                id="upload_widget"
                type="button"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                onClick={handleUploadPic}
              >
                Upload files
              </button>
            </div>

            <div className="sm:col-span-1"></div>

            <div className="sm:col-span-2">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Job Title
              </label>
              <div className="mt-2">
                <input
                  id="position"
                  name="position"
                  type="text"
                  autoComplete="position"
                  value={person["position"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Job Organisation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="Institution"
                  value={person["company"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="higherEd"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Higher Education
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="higherEd"
                  id="higherEd"
                  autoComplete="higherEd"
                  value={person["higherEd"]}
                  onChange={handleInputChange}
                  placeholder="PhD in Cryptography from Caltech, MSc in CyberSecurity from MIT"
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                About (anything and everything related to career)
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="about"
                  id="about"
                  autoComplete="about"
                  value={person["about"]}
                  onChange={handleInputChange}
                  placeholder="I died twice already. As a matter of fact, I'm dead."
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={person["city"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  value={person["state"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="country"
                  id="country"
                  autoComplete="country"
                  value={person["country"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="attributes"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Attributes That Suits You
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="attributes"
                  id="attributes"
                  autoComplete="attributes"
                  value={person["attributes"]}
                  onChange={handleInputChange}
                  placeholder="Comma Separeted: Web Dev, MERN, CyberSecurity, Criminal, MIT, ICPC World finalist, PRAN-RFL, etc."
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  value={person["phone"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={person["email"]}
                  onChange={handleInputChange}
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Facebook
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  autoComplete="facebook"
                  value={person["facebook"]}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/kholilur1903121"
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="socialmedia"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
              >
                Other social media links (Sitename space
                absolute_URL_of_Your_Profile)
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="socialmedia"
                  id="socialmedia"
                  autoComplete="socialmedia"
                  value={person["socialmedia"] ? person["socialmedia"] : ""}
                  onChange={handleInputChange}
                  placeholder="Comma separeted: dribble https://dribble.com/eftekher420, whatsapp http://whatsapp.com/jijuJizz, twitter https://twitter.com/imMizan"
                  className="block indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-x-6">
          <button
            onClick={cancelButton}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>

      <div className="h-[1px] w-[65vw] dark:bg-slate-300 bg-violet-500 mx-auto"></div>

      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-100 mt-4 mx-auto justify-center">
        Appearance
      </h2>
      <div className="my-6 flex flex-col lg:flex-row items-center justify-center">
        <div className="px-[0%] text-center min-w-[20vw] max-w-[34vw]">
          <PersonCardNoSnap props={person} />
        </div>
        <div className="px-[0%] min-w-[20vw]">
          <PersonDescNoSnap props={person} />
        </div>
      </div>
    </>
  );
}

export function PersonDescNoSnap({ props }) {
  // props.image='https://res.cloudinary.com/dknq7gnuo/image/upload/v1689331231/Naeem_bgRemoved_oa5q9t.png';
  let sbuttons = [];
  if (props.contacts) {
    let pArr = props.contacts.split(",");
    for (let i = 0; i < pArr.length; i++) {
      pArr[i] = pArr[i].trim();
      let scl = pArr[i].split(" ");
      if (!scl[1]) {
        continue;
      }
      if (scl[1].length > 0) {
        sbuttons.push(<SocialButton title={scl[0]} link={scl[1]} key={i} />);
      }
    }
    // console.log(props);
  }
  return (
    <>
      <div className="text-center relative justify-center p-4 m-2 rounded-md border border-b-slate-800 dark:border-0  bg-pink-50 dark:text-black">
        <div className="float-center pr-[1vw]">
          <Image
            src={props.image ? props.image : "/ruet.png"}
            alt="profile"
            className="relative m-auto w-[18vh] h-[18vh] overflow-hidden rounded-full"
            height={"180"}
            width={"180"}
            style={{ imageRendering: "auto" }}
          />
        </div>
        <br />
        <button className="text-blue-600 text-lg">{props.name}</button>
        <h4>
          {props.position}
          {props.company ? ", " + props.company : ""}
        </h4>
        <br />
        <h4 className="text-cyan-400 underline"> &nbsp;About&nbsp; </h4>
        <p>{props.about}</p>
        <br />
        {props.higherEd && (
          <>
            <h2 className="text-cyan-600 underline">Higher Education</h2>
            <p>{props.higherEd}</p>
          </>
        )}
        <br />

        <h2 className="text-cyan-800 underline">Related Attributes</h2>
        <p>{props.attributes}</p>
        <br />
        <h2 className="text-cyan-400 underline">Living In</h2>
        <p>
          {props.city}
          {props.state ? ", " + props.state : ""}
          {props.country ? ", " + props.country : ""}{" "}
        </p>
        <br />
        <h2 className="text-cyan-400 underline">Contacts</h2>
        <div className="bottom-0 mt-auto">{sbuttons}</div>
      </div>
    </>
  );
}

export function PersonCardNoSnap({ props, upSrchTxt }) {
  const [pop, setPop] = useState(0);
  useEffect(() => { }, [pop]);
  const openPop = (val) => {
    setPop(val);
  };

  let kbuttons = [];
  if (props.keywords) {
    let objarr = props.keywords.split(",");
    let rndm = Math.floor(Math.random() * 7) + 1;
    for (let i = 0; i < objarr.length; i++) {
      kbuttons.push(
        <KeyButton
          title={objarr[i]}
          num={rndm++}
          upSrchTxt={upSrchTxt}
          key={i}
        />
      );
      rndm = rndm >= 8 ? 1 : rndm;
    }
  }

  let sbuttons = [];
  if (props.contacts) {
    let pArr = props.contacts.split(",");
    for (let i = 0; i < pArr.length; i++) {
      pArr[i] = pArr[i].trim();
      let scl = pArr[i].split(" ");
      if (!scl[1]) {
        continue;
      }
      if (scl[1].length > 0) {
        sbuttons.push(<SocialButton title={scl[0]} link={scl[1]} key={i} />);
      }
    }
  }

  return (
    <>
      <div className="md:max-[50vh] lg:max-h-[30vh] text-center min-w-[20vw] rounded-md bg-pink-50 m-5 font-medium text-teal-800 ring-1 ring-inset ring-yellow-600/20">
        <div
          className="flex flex-wrap items-center p-3"
          style={{ justifyContent: "space-between" }}
        >
          <div className="text-left pl-[1vw]">
            <button
              style={{ fontSize: "2vh", color: "rgb(25, 23, 23)" }}
              onClick={() => openPop(1)}
            >
              {props.name}
            </button>
            <p style={{ fontSize: "1.5vh" }}>
              {props.position}
              {props.company ? "," : ""} {props.company}
            </p>
          </div>
          <div className="float-center pr-[1vw]">
            <Image
              src={props.image ? props.image : "/ruet.png"} //image link here'/vercel.svg'
              alt="profile"
              className="relative m-auto w-[4vh] h-[4vh] overflow-hidden rounded-full"
              height={"80"}
              width={"80"}
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
          }}
        ></div>
        <div className="bottom-0 mt-auto">{sbuttons}</div>
      </div>
    </>
  );
}

export function RegistrationForm({ updateLogged, updatePerson }) {
  const [person, setPerson] = useState({
    role: "",
    name: "",
    roll: "",
    email: "",
    phone: "",
    facebook: "",
    socialmedia: "",
    password: "",
    confirmPassword: "",
    image: "/ruet.png",
    thumbnail: "/ruet.ico",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (person.password !== person.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // create contacts + keywords string
    person.contacts = `phone ${person.phone}, email ${person.email}, facebook ${person.facebook}, ${person.socialmedia}`;
    person.keywords = `${person.role}, ${person.roll}, ${person.state}, ${person.country}`;

    axios
      .post(ipNport + "register", person)
      .then((res) => {
        alert("Registration Successful!");
        updatePerson(person);
        updateLogged(1); // move user to logged-in/dashboard state
      })
      .catch((err) => {
        console.error(err);
        alert("Error during registration.");
      });
  };

  return (
    <form
      className="px-[18%] my-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-slate-200 mt-4">
        Alumni / Student Registration
      </h2>
      <p className="mt-1 text-sm leading-6 text-blue-600">
        Please fill in the details to create your account.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        {/* Role */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">
            Register As
          </label>
          <select
            name="role"
            value={person.role}
            onChange={handleInputChange}
            className="text-gray-800 w-full border-gray-300 rounded-md shadow-sm p-2 px-4"
            required
          >
            <option value="">-- Select --</option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>

        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Full Name</label>
          <input
            type="text"
            name="name"
            value={person.name}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Roll */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Roll/ID</label>
          <input
            type="text"
            name="roll"
            placeholder="1903179"
            value={person.roll}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Email</label>
          <input
            type="email"
            name="email"
            value={person.email}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Phone */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Phone</label>
          <input
            type="tel"
            name="phone"
            value={person.phone}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Facebook */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={person.facebook}
            onChange={handleInputChange}
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Social Media */}
        <div className="sm:col-span-full">
          <label className="block text-sm font-medium leading-6">
            Other Social Media
          </label>
          <textarea
            name="socialmedia"
            value={person.socialmedia}
            onChange={handleInputChange}
            placeholder="Comma separated: twitter https://twitter.com/xyz, linkedin https://linkedin.com/in/xyz"
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Password */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Password</label>
          <input
            type="password"
            name="password"
            value={person.password}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>

        {/* Confirm Password */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={person.confirmPassword}
            onChange={handleInputChange}
            required
            className="text-gray-800 block w-full indent-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Register
        </button>
      </div>
    </form>
  );
}
