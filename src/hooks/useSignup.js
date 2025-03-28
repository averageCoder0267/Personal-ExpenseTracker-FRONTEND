
export default async function useSignup(username, email, password) {
    const blob = await fetch("http://localhost:4050/auth/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    const data = await blob.json();
    return [blob.status, data];
}