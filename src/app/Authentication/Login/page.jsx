"use client"

import Link from "next/link";
import "@/styles/login.css";
import { useEffect, useRef, useState } from "react";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import useCheckCategory from "@/hooks/useCheckCategory";

export default function Login() {

  const router = useRouter();
  const msgBox = useRef();
  const [message, setMessage] = useState("All Good");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [transition, setTransition] = useState({
    filter: "opacity(0)",
    transform: "translateY(-100px)"
  })

  useEffect(() => {
    setTransition({
      filter: "opacity(1)",
      transform: "translateY(0)"
    });
  }, [])

  function triggerMsgBox() {
    msgBox.current.style.top = "2%";
    setTimeout(() => {
      msgBox.current.style.top = "-50%";
    }, 1500);
  }

  async function loginHandler() {
    if (!username || !password) {
      setMessage("Invalid Credentials");
      triggerMsgBox();
      return;
    }
    const [status, { token, userId, msg }] = await useLogin(username, password);
    setMessage(msg);
    triggerMsgBox();
    if (status == 404) {
      setTimeout(() => {
        router.push("/Authentication/Signup");
      }, 1500);
    } else if (status == 401) {
      setPassword("");
    } else {
      const categoryStatus = await useCheckCategory(userId, token);
      if (categoryStatus == 404) {
        setTimeout(() => {
          router.push(`/CategoryModal/Income/?token=${token}&userId=${userId}`);
        }, 1500);
      } else if (categoryStatus == 405) {
        setTimeout(() => {
          router.push(`/CategoryModal/Expense/?token=${token}&userId=${userId}`);
        }, 1500);
      } else {
        setTimeout(() => {
          router.push(`/?token=${token}&userId=${userId}`);
        }, 1500);
      }
    }
  }

  return (
    <div id="bodyContainer">
      <div id="mesgBox" ref={msgBox}>
        <p id="eventMesg">{message}</p>
      </div>
      <div style={transition} id="container">
        <div id="headingBox">
          <h1 id="heading">Enter your account</h1>
        </div>
        <form id="form" onSubmit={(e) => { e.preventDefault() }}>
          <input required type="text" id="username" className="formInputs" placeholder="Username"
            value={username} onChange={(e) => { setUsername(e.target.value) }} />
          <input required type="password" id="password" className="formInputs" placeholder="Password"
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <button type="submit" id="logInButton" onClick={loginHandler}>Log In</button>
        </form>
        <div id="signUpBox">
          <p id="signUpPara">Don't have an account?</p>
          &nbsp;&nbsp;
          <Link id="signUpLink" href="/Authentication/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
