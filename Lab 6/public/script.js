const searchField = document.getElementById('search-field')
const insertField = document.getElementById('insert-field')
const searchButton = document.getElementById('search-button')
const createButton = document.getElementById('create-button')
const readButton = document.getElementById('read-button')
const readAllButton = document.getElementById('read-all-button')
const updateButton = document.getElementById('update-button')
const deleteButton = document.getElementById('delete-button')

const resultDiv = document.getElementById('result')
const apiUrl = "http://localhost:3000/data";

createButton.addEventListener("click", async()=>{
    const data = insertField.value;
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: data
    })
    const result = await response.json()
    resultDiv.innerText = "Created:" + JSON.stringify(result)

})

readAllButton.addEventListener("click", async() =>{
    const response = await fetch(apiUrl);
    const result = await response.json();
    resultDiv.innerText = JSON.stringify(result, null, 2);
})

readButton.addEventListener("click", async()=>{
    const id = searchField.value;
    const response = await fetch(`${apiUrl}/${id}`);
    const result = await response.json();
    resultDiv.innerText = "FOUND :" + JSON.stringify(result, null, 2);
});

updateButton.addEventListener("click", async()=>{
    const id = searchField.value;
    const data = insertField.value;

    const response = await fetch(`${apiUrl}/${id}`,{
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: data
    })
    const result = await response.json();
    resultDiv.innerText = "UPDATED:" + JSON.stringify(result);
})

deleteButton.addEventListener("click", async()=>{
    const id = searchField.value;
    const response = await fetch(`${apiUrl}/${id}`,{
        method: "DELETE"
    });
    const result = response.json()
    resultDiv.innerText = "DELETED" + JSON.stringify(result)
})

