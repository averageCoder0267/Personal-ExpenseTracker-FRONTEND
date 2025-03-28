
export default async function useLogin(username, password) {
    try {
        const blob = await fetch("http://localhost:4050/auth/logIn", {
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
