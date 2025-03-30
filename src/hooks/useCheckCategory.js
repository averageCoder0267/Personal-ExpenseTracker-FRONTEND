
export default async function useCheckCategory(id, token) {
    const blob = await fetch(`http://localhost:4050/category/checkCategories/?userId=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    return blob.status;
}