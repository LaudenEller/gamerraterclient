export const createRating = (rating) => {
    return fetch("http://localhost:8000/ratings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(rating)
    })
        .then(r => r.json())
}