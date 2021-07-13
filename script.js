const sidebarBtns = document.querySelectorAll('.side-btn');
const nav = document.querySelector('.nav');

sidebarBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        nav.style.transform = `translateY(${index * 10.7}rem)`;
    })
})