
export default async function useCategoryList(token, userId) {
    const blob = await fetch(`http://localhost:4050/category/getUserCategories/?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    const { incomeCategories, expenseCategories } = await blob.json();
    return { incomeCategories, expenseCategories };
}