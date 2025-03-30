
export default async function useSubmitTransaction(body, token) {
    const blob = await fetch("http://localhost:4050/transaction/addTransaction",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
}