const carousel = document.getElementById('carousel');
const users = [];
let index = 0;
let nextCardTimer;

function userCard(user) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = user.picture.large;
    img.className = 'card-img';
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'card-info';

    const name = document.createElement('h2');
    name.innerText = `${user.name.title} ${user.name.first} ${user.name.last}`;
    info.appendChild(name);

    const location = document.createElement('p');
    location.textContent = `${user.location.city}, ${user.location.country}`;
    info.appendChild(location);

    const email = document.createElement('p');
    email.textContent = user.email;
    info.appendChild(email);

    const phone = document.createElement('p');
    phone.textContent = user.phone;
    info.appendChild(phone);

    card.appendChild(info);
    return card;
}

function addUser(user) {
    carousel.innerHTML = ''; 
    const card = userCard(user);
    carousel.appendChild(card);
}

function nextCard() {
    clearTimeout(nextCardTimer);
    index = (index + 1) % users.length;
    addUser(users[index]);
    nextCardTimer = setTimeout(nextCard, 5000);
}

function main() {
    fetch("https://randomuser.me/api/?results=5")
        .then(res => res.json())
        .then(data => {
            users.push(...data.results);
            addUser(users[index]);
            nextCardTimer = setTimeout(nextCard, 5000);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            carousel.innerHTML = "<p>Failed to load user data.</p>";
        });
}

carousel.addEventListener("click", nextCard);


main();

