
export default async function useCheckCategory(id, token) {
    const blob = await fetch(`https://personal-expensetracker-backend.onrender.com/category/checkCategories/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    return blob.status;
}