export const createPicture = (picture) => {
    return fetch("http://localhost:8000/pictures", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(picture)
    })
        .then(r => r.json())
}