
export default async function useAddExpense(inputFields, userId, token) {
    let expenseCategories = [];
    inputFields.forEach((ele) => {
        if (ele != "") {
            expenseCategories.push({ userId, categoryName: ele });
        }
    })
    const blob = await fetch("http://localhost:4050/category/addExpense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ expenseCategories })
    })
    return blob.status;
}