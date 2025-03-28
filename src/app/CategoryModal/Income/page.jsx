"use client"

import useAddIncome from "@/hooks/useAddIncome";
import "@/styles/incomeModal.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function IncomeModal() {

    const router = useRouter();
    const search = useSearchParams();
    const token = search.get("token");
    const userId = search.get("userId");
    const [inputFields, setInputFields] = useState([""]);
    const currentInput = useRef();
    const submitButton = useRef();
    const [transition, setTransition] = useState({
        filter: "opacity(0)",
        transform: "translateY(-100px)",
        transition: "all linear 0.5s"
    })
    useEffect(() => {
        if (token == undefined) {
            setTimeout(() => {
                alert("You are not logged in..");
                router.push("/Authentication/Login");
            }, 5000);
        }
        setTransition({
            filter: "opacity(1)",
            transform: "translateY(0)",
            transition: "all linear 0.5s"
        });
    }, [])

    function inputHandler(e) {
        let temp = [...inputFields];
        temp[inputFields.length - 1] = e.target.value;
        setInputFields(temp);
    }

    function addButtonHandler() {
        let isEmpty = currentInput.current.value;
        if (isEmpty == "") {
            currentInput.current.focus();
            return;
        }
        setInputFields([...inputFields, ""]);
    }

    async function submitButtonHandler() {
        let isEmpty = currentInput.current.value;
        if (isEmpty == "" && inputFields.length > 1) {
            let temp = [...inputFields];
            temp.pop();
            setInputFields(temp);
        } else if (isEmpty == "" && inputFields.length == 1) {
            alert("Add Atleast One Expense Category");
            return;
        }
        const status = await useAddIncome(inputFields, userId, token);
        if (status == 201) {
            submitButton.current.disabled = true;
            router.push(`/CategoryModal/Expense/?token=${token}&userId=${userId}`);
        } else {
            alert("Something went wrong");
        }
    }

    return (
        <>
            <header id="header">
                <svg id="headerIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--primary)"
                    className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                <h1 id="headerHead">Expense Tracker</h1>
            </header>

            <div style={transition} id="incomeCategorySection">
                <div id="incomeCategorySubSection1">
                    <h1 id="incomeCategoryHead">Add your <span>Income</span> Categories</h1>
                    <h2 id="incomeCategorySubHead">Categorize Your <span>Earnings</span> for Better <span>Financial</span>
                        Management</h2>
                </div>
                <div id="incomeCategorySubSection2">
                    <div id="form">
                        <div id="incomeInputBox">
                            {
                                inputFields.map((ele, i) => {
                                    if (i == inputFields.length - 1) {
                                        return (
                                            <input key={i} type="text" ref={currentInput} autoFocus placeholder="Add Income Category Name" className="incomeInputFields"
                                                defaultValue={ele} onChange={inputHandler} />
                                        )
                                    } else {
                                        return (
                                            <input key={i} type="text" disabled placeholder="Add Income Category Name" className="incomeInputFields"
                                                defaultValue={ele} />
                                        )
                                    }
                                })
                            }
                        </div>
                        <div id="incomeButtonBox">
                            <button id="addInputButton" className="incomeButtons" onClick={addButtonHandler}>Add +</button>
                            <button id="submitIncomeButton" className="incomeButtons" ref={submitButton} onClick={submitButtonHandler}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}