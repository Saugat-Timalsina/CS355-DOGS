function fetchBreeds() {
    fetch('/breeds')
        .then(response => response.json())
        .then(breeds => {
            const dataList = document.getElementById("breedList");
            breeds.forEach(breed => {
                let option = document.createElement("option");
                option.value = breed;
                dataList.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching breeds:", error));
}

function showImages() {
    const breed = document.getElementById("breedInput").value.toLowerCase().trim();
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
    fetch(`/image/${breed}`)
        .then(response => response.json())
        .then(data => {
            if (data.image) {
                document.getElementById("dogImage").src = data.image;
                document.getElementById("dogImage").style.display = "block";
            } else {
                document.getElementById("message").innerText = "Image not found";
            }
        })
        .catch(error => console.error("Error fetching image:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    fetchBreeds();
    document.getElementById("showImagesBtn").addEventListener("click", showImages);
});
