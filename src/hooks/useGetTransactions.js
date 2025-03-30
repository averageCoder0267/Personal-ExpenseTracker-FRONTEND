import { useEffect, useState } from "react";

export default async function useGetTransactions(userId, token) {
    const blob = await fetch(`http://localhost:4050/transaction/getTransactions/?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    const data = await blob.json();
    console.log(data);
    return data;
}