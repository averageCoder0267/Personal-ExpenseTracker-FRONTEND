"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/styles/addTransaction.css";
import useCategoryList from "@/hooks/useCategoryList";
import useSubmitTransaction from "@/hooks/useSubmitTransaction";

export default function AddTransaction() {

    const router = useRouter();
    const search = useSearchParams();
    const token = search.get("token");
    const userId = search.get("userId");
    const income = useRef();
    const expense = useRef();
    const [transactionType, setTransactionType] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryName, setCategoryName] = useState("Select Category");
    const [paymentMethod, setPaymentMethod] = useState("Select Payment");
    const [currentList, setCurrentList] = useState([{ categoryName: "Select Category" }]);
    const [transition, setTransition] = useState({
        filter: "opacity(0)",
        transform: "translateY(-100px)",
        transition: "all linear 0.5s"
    })
    useEffect(() => {
        if (token == undefined) {
            setTimeout(() => {
                alert("You are not logged in.");
                router.push("/Authentication/Login");
            }, 2500);
        }
        setTransition({
            filter: "opacity(1)",
            transform: "translateY(0)",
            transition: "all linear 0.5s"
        });
    }, []);

    useEffect(() => {
        fetchList();
    }, [transactionType]);

    async function fetchList() {
        if (transactionType == "INCOME") {
            const { incomeCategories } = await useCategoryList(token, userId);
            setCurrentList([{ categoryName: "Select Category" }, ...incomeCategories]);
        } else if (transactionType == "EXPENSE") {
            const { expenseCategories } = await useCategoryList(token, userId);
            setCurrentList([{ categoryName: "Select Category" }, ...expenseCategories]);
        }
    }

    function incomeHandler() {
        income.current.style.backgroundColor = "var(--primary)";
        expense.current.style.backgroundColor = "transparent";

        setTransactionType("INCOME");
    }

    function expenseHandler() {
        income.current.style.backgroundColor = "transparent";
        expense.current.style.backgroundColor = "var(--primary)";

        setTransactionType("EXPENSE");
    }

    function submitHandler() {
        if (!transactionType || !title || !amount || categoryName == "Select Category" || paymentMethod == "Select Payment") {
            alert("Invalid Credentials");
            return;
        }
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const addTransaction = {
            userId,
            title,
            amount,
            transactionType,
            categoryName,
            paymentMethod,
            date,
            month,
            year
        };
        useSubmitTransaction(addTransaction, token);
        router.push(`/?token=${token}&userId=${userId}`);
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

            <div style={transition} id="addTransactionContainer">
                <h1 id="addTransactionHead">Add Your Transaction</h1>
                <form id="addTransactionForm" onSubmit={(e) => { e.preventDefault() }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div id="transactionTypeButtonBox">
                            <button type="button" ref={income} id="incomeButton" className="transactionTypeButtons"
                                onClick={incomeHandler}>INCOME</button>
                            <button type="button" ref={expense} id="expenseButton" className="transactionTypeButtons"
                                onClick={expenseHandler}>Expense</button>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div id="titleAmountInputBox">
                            <input required type="text" placeholder="Title" id="titleInput"
                                value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <input required type="number" placeholder="Amount" id="amountInput"
                                value={amount} onChange={(e) => {
                                    if (e.target.value >= -0) {
                                        setAmount(e.target.value)
                                    }
                                }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div id="dropdownBox">
                            <select name="categories" id="categoryDropdown"
                                value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} >
                                {
                                    currentList.map((ele, i) => {
                                        if (i == 0) {
                                            return (
                                                <option key={i} disabled className="categoryDropdownOptions"
                                                    value={ele.categoryName}>{ele.categoryName}</option>
                                            )
                                        } else {
                                            return (
                                                <option key={i} className="categoryDropdownOptions"
                                                    value={ele.categoryName}>{ele.categoryName}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                            <select name="paymentMethod" id="paymentMethodDropdown"
                                value={paymentMethod} onChange={(e) => { setPaymentMethod(e.target.value) }} >
                                <option className="paymentMethodDropdownOptions"
                                    value="Select Payment" disabled>Select Payment</option>
                                <option className="paymentMethodDropdownOptions" value="CASH">CASH</option>
                                <option className="paymentMethodDropdownOptions" value="UPI">UPI</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button type="submit" id="submitTransactionButton"
                            onClick={submitHandler}>Submit Transaction</button>
                    </div>
                </form>
            </div>

        </>
    )
}