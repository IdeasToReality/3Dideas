const adminPassword = "3divineBeasts";

// Simulated Database
let users = JSON.parse(localStorage.getItem("users")) || {};

// Elements
const adminLogin = document.getElementById("adminLogin");
const adminPasswordInput = document.getElementById("adminPassword");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLoginError = document.getElementById("adminLoginError");
const adminPanel = document.getElementById("adminPanel");
const userDropdown = document.getElementById("userDropdown");
const pointsInput = document.getElementById("pointsInput");
const addPointsBtn = document.getElementById("addPointsBtn");
const subtractPointsBtn = document.getElementById("subtractPointsBtn");

const createUserSection = document.getElementById("createUser");
const newUsername = document.getElementById("newUsername");
const newUserPassword = document.getElementById("newUserPassword");
const createUserBtn = document.getElementById("createUserBtn");

const userLogin = document.getElementById("userLogin");
const usernameInput = document.getElementById("username");
const userPasswordInput = document.getElementById("userPassword");
const userLoginBtn = document.getElementById("userLoginBtn");
const userLoginError = document.getElementById("userLoginError");

const userProfile = document.getElementById("userProfile");
const userDisplayName = document.getElementById("userDisplayName");
const userPointsDisplay = document.getElementById("userPointsDisplay");
const logoutBtn = document.getElementById("logoutBtn");

// Functions
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function refreshUserDropdown() {
    userDropdown.innerHTML = "";
    Object.keys(users).forEach(user => {
        const option = document.createElement("option");
        option.value = user;
        option.textContent = user;
        userDropdown.appendChild(option);
    });
}

function showAdminPanel() {
    adminLogin.style.display = "none";
    adminPanel.style.display = "block";
    refreshUserDropdown();
}

function showUserProfile(username) {
    userLogin.style.display = "none";
    createUserSection.style.display = "none";
    userProfile.style.display = "block";
    userDisplayName.textContent = username;
    userPointsDisplay.textContent = users[username].points || 0;
}

// Event Listeners
adminLoginBtn.addEventListener("click", () => {
    if (adminPasswordInput.value === adminPassword) {
        showAdminPanel();
    } else {
        adminLoginError.style.display = "block";
    }
});

createUserBtn.addEventListener("click", () => {
    const username = newUsername.value.trim();
    const password = newUserPassword.value;
    if (username && password && !users[username]) {
        users[username] = { password, points: 0 };
        saveUsers();
        alert("User created!");
        newUsername.value = "";
        newUserPassword.value = "";
    } else {
        alert("Invalid or existing username!");
    }
});

userLoginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = userPasswordInput.value;
    if (users[username] && users[username].password === password) {
        showUserProfile(username);
    } else {
        userLoginError.style.display = "block";
    }
});

logoutBtn.addEventListener("click", () => {
    userProfile.style.display = "none";
    userLogin.style.display = "block";
    createUserSection.style.display = "block";
});

// Admin Point Management
addPointsBtn.addEventListener("click", () => {
    const username = userDropdown.value;
    const points = parseInt(pointsInput.value, 10);
    if (users[username] && !isNaN(points)) {
        users[username].points = (users[username].points || 0) + points;
        saveUsers();
        alert("Points updated!");
    }
});

subtractPointsBtn.addEventListener("click", () => {
    const username = userDropdown.value;
    const points = parseInt(pointsInput.value, 10);
    if (users[username] && !isNaN(points)) {
        users[username].points = Math.max(0, (users[username].points || 0) - points);
        saveUsers();
        alert("Points updated!");
    }
});
