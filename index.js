const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');
const loader = document.getElementById('loader');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loader.style.display = 'block';
    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            document.getElementById('signUpMessage').innerText = 'Email already in use';
            loader.style.display = 'none';
            return;
        }
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        document.getElementById('signUpMessage').innerText = 'Account created successfully. Redirecting to login...';
        loader.style.display = 'none';
        setTimeout(() => {
            container.classList.remove('right-panel-active');
        }, 1000);
    }, 2000); 
});

document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loader.style.display = 'block';
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            document.getElementById('signInMessage').innerText = 'Invalid email or password';
            loader.style.display = 'none';
            return;
        }

        localStorage.setItem('isAuthenticated', 'true');
        document.getElementById('signInMessage').innerText = 'Logged in successfully';
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1000);
    }, 2000); 
});
