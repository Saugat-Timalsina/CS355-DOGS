const toggleBtn = document.querySelector('.toggle');

toggleBtn.addEventListener('click', () => {
    if (toggleBtn.innerText === 'Dark') {
        document.documentElement.setAttribute('theme', 'dark');
        toggleBtn.innerText = 'Light';
    } else {
        document.documentElement.removeAttribute('theme');
        toggleBtn.innerText = 'Dark';
    }
});
