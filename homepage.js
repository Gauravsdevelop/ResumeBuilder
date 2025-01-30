const isAuthenticated = localStorage.getItem('isAuthenticated');

if (isAuthenticated !== 'true') {
    window.location.href = 'index.html';
}

const themeToggleBtn = document.getElementById('themeToggleBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Theme toggle logic
const checkbox = document.getElementById("checkbox");
const body = document.body;
const currTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currTheme);
checkbox.checked = currTheme === 'dark';

checkbox.addEventListener("change", () => {
    const newTheme = checkbox.checked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    body.setAttribute('data-theme', newTheme);
});


logoutBtn.addEventListener('click', function() {
    window.location.href = 'index.html'; 
});
// const templatebtn = document.getElementById("templatebtn");

// templatebtn.addEventListener('click', function() {
//     window.location.href = 'template.html'; 
// });


//crasoul
document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showItem(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function nextItem() {
        if (currentIndex === totalItems - 1) {
            alert('No more templates.');
            return;
        }
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
        resetAutoSwitch(); 
    }

    function prevItem() {
        if (currentIndex === 0) {
            alert('No previous templates.');
            return;
        }
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
        resetAutoSwitch(); 
    }

    function autoSwitch() {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    }

    function resetAutoSwitch() {
        clearInterval(autoSwitchInterval);
        autoSwitchInterval = setInterval(autoSwitch, 2000);
    }

    prevBtn.addEventListener('click', prevItem);
    nextBtn.addEventListener('click', nextItem);

    showItem(currentIndex);
    let autoSwitchInterval = setInterval(autoSwitch, 2000); 
});

