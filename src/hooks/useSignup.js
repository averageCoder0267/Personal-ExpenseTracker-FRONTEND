
export default async function useSignup(username, email, password) {
    const blob = await fetch("https://personal-expensetracker-backend.onrender.com/auth/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    const data = await blob.json();
    return [blob.status, data];
}