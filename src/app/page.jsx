"use client"

import Link from "next/link";
import "@/styles/home.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetTransactions from "@/hooks/useGetTransactions";

export default function Home() {

  const router = useRouter();
  const search = useSearchParams();
  const token = search.get("token");
  const userId = search.get("userId");
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState(["No history found"]);
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
    fetchData();
    setTransition({
      filter: "opacity(1)",
      transform: "translateY(0)",
      transition: "all linear 0.5s"
    });
  }, [])

  async function fetchData() {
    const { transaction } = await useGetTransactions(userId, token);
    let auxBalance = 0;
    let auxIncome = 0;
    let auxExpense = 0;
    transaction.map((ele) => {
      if (ele.transactionType == "INCOME") {
        auxBalance += ele.amount;
        auxIncome += ele.amount;
      } else {
        auxBalance -= ele.amount;
        auxExpense += ele.amount;
      }
    })
    setIncome(auxIncome);
    setExpense(auxExpense);
    setBalance(auxBalance);
    setTransactionHistory([...transaction]);
  }

  return (
    <div>
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

      <div style={transition} id="sectionA">
        <div id="balanceBox">
          <h1 id="balanceHead">Total Balance</h1>
          <p id="balanceAmount">{balance}</p>
        </div>
        <div id="balanceSubBox">
          <div id="incomeBox" className="balanceSubBoxes">
            <h1 id="incomeHead">Income</h1>
            <p id="incomeAmount">{income}</p>
          </div>
          <div id="expenseBox" className="balanceSubBoxes">
            <h1 id="expenseHead">Expense</h1>
            <p id="expenseAmount">{expense}</p>
          </div>
        </div>
      </div>

      <div style={transition} id="sectionB">
        <div id="expenseChartBox" className="sectionBboxes">
          <h2 id="expenseChartHead">Expense Chart</h2>
          <canvas id="expenseChart"></canvas>
        </div>
      </div>

      <div style={transition} id="sectionC">
        <h1 id="sectionChead">Recent Transactions</h1>
        <ol id="recentTransaction" type="1">
          {
            (transactionHistory.length != 0)
              ? (
                transactionHistory.map((ele, i) => {
                  if (typeof ele == "string") {
                    return (
                      <li key={i} className="recentTransactionLists"><span className="transactionListsDetail">{ele}</span><span
                        className="transactionListsAmont">NaN</span></li>
                    )
                  } else {
                    return (
                      <li key={i} className="recentTransactionLists">
                        <span className="transactionListsDetail">{ele.title} | {ele.paymentMethod} | {(ele.transactionType == "INCOME" ? "Credit" : "Debit")}</span>
                        <span className="transactionListsAmont">{ele.amount}</span>
                      </li>
                    )
                  }
                })
              ) : (
                <li key={0} className="recentTransactionLists"><span className="transactionListsDetail">No history found</span><span
                  className="transactionListsAmont">NaN</span></li>
              )
          }
        </ol>
        <button id="transactionHistoryButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-clock-history" viewBox="0 0 16 16">
            <path
              d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
            <path
              d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
          </svg>
          Transaction History
        </button>
      </div>

      <div style={transition} id="sectionD">
        <h1 id="sectionDhead">Quick Actions</h1>

        <div id="quickActionContainer">
          <div id="quickActionButtonBox1" className="quickActionButtonBoxes">
            <Link href={`/User/AddTransaction/?token=${token}&userId=${userId}`} className="quickActionButtons"> <svg fill="#ffffff"
              width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
            </svg> &nbsp; Add Transaction</Link>
          </div>
          <div id="quickActionButtonBox2" className="quickActionButtonBoxes">
            <button className="quickActionButtons"> <svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
            </svg> &nbsp; View Reports</button>
          </div>
          <div id="quickActionButtonBox3" className="quickActionButtonBoxes">
            <Link href="/Authentication/Login" className="quickActionButtons"> <svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
            </svg> &nbsp; Check Budgets</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
