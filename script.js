let users = JSON.parse(localStorage.getItem('users')) || {};
const adminPassword = '3divineBeasts';
let sessionToken = null;

// Hashing function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Admin Login
document.getElementById('adminLoginBtn').addEventListener('click', async () => {
    const enteredPassword = document.getElementById('adminPassword').value;
    const hashedPassword = await hashPassword(enteredPassword);
    if (hashedPassword === await hashPassword(adminPassword)) {
        sessionToken = 'admin'; // Simple session
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        populateDropdown();
    } else {
        document.getElementById('adminLoginError').style.display = 'block';
    }
});

// User Signup
document.getElementById('userSignupBtn').addEventListener('click', async () => {
    const username = sanitizeInput(document.getElementById('username').value);
    const password = document.getElementById('password').value;
    if (!username || !password) return alert('Enter valid details!');
    const hashedPassword = await hashPassword(password);
    if (!users[username]) {
        users[username] = { password: hashedPassword, points: 0 };
        localStorage.setItem('users', JSON.stringify(users));
        alert('User created!');
    } else {
        alert('User already exists!');
    }
});

// User Login
document.getElementById('createUserBtn').addEventListener('click', async () => {
    const username = sanitizeInput(document.getElementById('username').value);
    const password = document.getElementById('password').value;
    if (!users[username]) {
        document.getElementById('userLoginError').style.display = 'block';
        return;
    }
    const hashedPassword = await hashPassword(password);
    if (users[username].password === hashedPassword) {
        alert('Login successful! Points: ' + users[username].points);
    } else {
        document.getElementById('userLoginError').style.display = 'block';
    }
});

// Sanitize Input
function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '');
}

// Admin: Add/Remove Points
document.getElementById('addPointsBtn').addEventListener('click', () => modifyPoints(true));
document.getElementById('subtractPointsBtn').addEventListener('click', () => modifyPoints(false));

function modifyPoints(isAdd) {
    const username = document.getElementById('userDropdown').value;
    const points = parseInt(document.getElementById('pointsInput').value, 10);
    if (!users[username] || isNaN(points)) {
        document.getElementById('adminError').style.display = 'block';
        return;
    }
    users[username].points += isAdd ? points : -points;
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Updated points for ${username}: ${users[username].points}`);
}

// Populate User Dropdown
function populateDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.innerHTML = '';
    for (const username in users) {
        const option = document.createElement('option');
        option.value = username;
        option.textContent = username;
        dropdown.appendChild(option);
    }
}
