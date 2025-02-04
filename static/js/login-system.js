// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved user
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
        document.getElementById('welcomeMessage').innerHTML =
            `<div class="alert alert-success mb-3">Welcome back, ${savedUser.fullName}!</div>`;
    }

    // Add event listeners for form visibility buttons
    document.querySelectorAll('[onclick*="showLoginForm"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    });

    document.querySelectorAll('[onclick*="showRegisterForm"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterForm();
        });
    });

    document.querySelectorAll('[onclick*="hideAllForms"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllForms();
        });
    });

    // Email validation
    document.getElementById('regEmail').addEventListener('input', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validationDiv = document.getElementById('emailValidation');
        
        if (!emailRegex.test(email)) {
            validationDiv.textContent = 'Please enter a valid email';
        } else {
            validationDiv.textContent = '';
        }
    });

    // Password confirmation
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('regPassword').value;
        const confirmPassword = this.value;
        const matchDiv = document.getElementById('passwordMatch');
        
        if (password === confirmPassword) {
            matchDiv.textContent = 'Passwords match';
            matchDiv.className = 'form-text text-success small';
        } else {
            matchDiv.textContent = 'Passwords do not match';
            matchDiv.className = 'form-text text-danger small';
        }
    });

    // Handle Registration Form Submit
    document.getElementById('registrationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('regEmail').value,
            password: password
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === userData.email)) {
            alert('Email already registered!');
            return;
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        document.getElementById('fullName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        showLoginForm();
    });

    // Handle Login Form Submit
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => 
            user.email === loginEmail && 
            user.password === loginPassword
        );

        if (user) {
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            document.getElementById('welcomeMessage').innerHTML =
                `<div class="alert alert-success mb-3">Welcome back, ${user.fullName}!</div>`;
            document.getElementById('loginForm').reset();
            hideAllForms();
        } else {
            alert('Invalid email or password!');
        }
    });
});

// Form visibility functions
function hideAllForms() {
    const welcomeCard = document.getElementById('welcomeCard');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    if (welcomeCard && loginCard && registerCard) {
        welcomeCard.style.display = 'block';
        loginCard.style.display = 'none';
        registerCard.style.display = 'none';
    }
}

function showLoginForm() {
    const welcomeCard = document.getElementById('welcomeCard');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    if (welcomeCard && loginCard && registerCard) {
        welcomeCard.style.display = 'none';
        loginCard.style.display = 'block';
        registerCard.style.display = 'none';
    }
}

function showRegisterForm() {
    const welcomeCard = document.getElementById('welcomeCard');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    if (welcomeCard && loginCard && registerCard) {
        welcomeCard.style.display = 'none';
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    }
}
