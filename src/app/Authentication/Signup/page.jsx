"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSignup from "@/hooks/useSignup";
import "@/styles/signup.css";

export default function Signup() {

    const router = useRouter();
    const msgBox = useRef();
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
        router.prefetch("/Authentication/Login");
    }, [])

    function triggerMsgBox() {
        msgBox.current.style.top = "2%";
        setTimeout(() => {
            msgBox.current.style.top = "-50%";
        }, 1500);
    }

    async function signupHandler() {
        if (!username || !email || !password) {
            setMessage("Invalid Credentials");
            triggerMsgBox();
            return;
        }
        const [status, data] = await useSignup(username, email, password);
        setMessage(data.msg);
        triggerMsgBox();
        if (status == 401) {
            setEmail("");
        } else if (status == 402) {
            setUsername("");
        } else {
            setTimeout(() => {
                router.push("/Authentication/Login");
            }, 1500);
        }
    }

    return (
        <div id="bodyContainer">
            <div id="mesgBox" ref={msgBox}>
                <p id="eventMesg">{message}</p>
            </div>
            <div style={transition} id="container">
                <div id="headingBox">
                    <h1 id="heading">Create an account</h1>
                </div>
                <form id="form" action="" onSubmit={(e) => { e.preventDefault() }}>
                    <input required type="text" id="username" className="formInputs" placeholder="Username"
                        value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <input required type="email" id="email" className="formInputs" placeholder="Email"
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input required type="password" id="password" className="formInputs" placeholder="Password"
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <button type="submit" id="signUpButton" onClick={signupHandler}>Sign Up</button>
                </form>
                <div id="logInBox">
                    <p id="logInPara">Already have an account?</p>
                    &nbsp;&nbsp;
                    <Link id="logInLink" href="/Authentication/Login">Log In</Link>
                </div>
            </div>
        </div>
    )
}
