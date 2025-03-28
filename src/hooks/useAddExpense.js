
export default async function useAddExpense(inputFields, userId, token) {
    let expenseCategories = [];
    inputFields.forEach((ele) => {
        if (ele != "") {
            expenseCategories.push({ userId, categoryName: ele });
        }
    })
    const blob = await fetch("https://personal-expensetracker-backend.onrender.com/category/addIncome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ expenseCategories })
    })
    return blob.status;
}