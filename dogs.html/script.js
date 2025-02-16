function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breedList = Object.keys(data.message);
            const dataList = document.getElementById("breedList");
            breedList.forEach(breed => {
                let option = document.createElement("option");
                option.value = breed;
                dataList.appendChild(option);
            });
        });
}

function showImages() {
    const breed = document.getElementById("breedInput").value.toLowerCase();
    const img = document.getElementById("dogImage");
    const message = document.getElementById("message");

    if (!document.querySelector(`option[value="${breed}"]`)) {
        message.innerText = "No such breed";
        img.style.display = "none";
        return;
    }

    message.innerText = "";
    updateImage(breed);
    setInterval(() => updateImage(breed), 5000);
}

function updateImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("dogImage").src = data.message;
            document.getElementById("dogImage").style.display = "block";
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchBreeds();
    document.getElementById("showImagesBtn").addEventListener("click", showImages);
});
