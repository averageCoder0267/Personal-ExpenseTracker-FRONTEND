
export default async function useAddIncome(inputFields, userId, token) {
    let incomeCategories = [];
    inputFields.forEach((ele) => {
        if (ele != "") {
            incomeCategories.push({ userId, categoryName: ele });
        }
    })
    const blob = await fetch("http://localhost:4050/category/addIncome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ incomeCategories })
    })
    return blob.status;
}