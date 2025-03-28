
export default async function useLogin(username, password) {
    try {
        const blob = await fetch("https://personal-expensetracker-backend.onrender.com/auth/logIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        const data = await blob.json();
        return [blob.status, data];
    } catch (error) {
        return { msg: error }
    }
}
