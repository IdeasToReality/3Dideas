const adminPassword = "3divineBeasts";

// Simulated Database
let users = JSON.parse(localStorage.getItem("users"));
if (!users) {
    users = {}; // Initialize if no users data is found
}

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

//const orderPrintBtn = document.getElementById("buyPrintBtn");
//const printDetails = document.getElementById("printDetails");
//const buyPrintLabel = document.getElementById("buyPrintLabel");
//const infillSlider = document.getElementById("infill");
//const infillValue = document.getElementById("infillValue");
//const infillDiagram = document.getElementById("infillDiagram");

const createUserSection = document.getElementById("createUser");
const newUsername = document.getElementById("newUsername");
const newUserPassword = document.getElementById("newUserPassword");
const createUserBtn = document.getElementById("createUserBtn");

const userLogin = document.getElementById("userLogin");
const usernameInput = document.getElementById("username");
const userPasswordInput = document.getElementById("userPassword");
const userLoginBtn = document.getElementById("userLoginBtn");
const userLoginError = document.getElementById("userLoginError");

const userSection = document.getElementById("userSection");

const userProfile = document.getElementById("userProfile");
const userDisplayName = document.getElementById("userDisplayName");
const userPointsDisplay = document.getElementById("userPointsDisplay");
const logoutBtn = document.getElementById("logoutBtn");

// Start
//printDetails.style.display = "none";

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

//orderPrintBtn.addEventListener("click", function ()  
//  orderPrintBtn.style.display = "none";
//    adminLogin.style.display = "none";
//    userSection.style.display = "none";
//    adminPanel.style.display = "none";
//    printDetails.style.display = "block";
//});

// Function to create the dynamic infill diagram
//function createDynamicInfill(infillPercentage) {
//    infillDiagram.innerHTML = ""; // Clear previous cells

//    const gridSize = 10; // Number of cells per row/column
//    const containerSize = infillDiagram.offsetWidth; // Container width/height
//    const cellSize = containerSize / gridSize; // Base size of each cell

    // Calculate gap size (0% = no gap, 100% = cells disappear)
//    const gapSize = (cellSize * infillPercentage) / 100;

    // Adjust cell size based on gap
//    const adjustedCellSize = Math.max(0, cellSize - gapSize);
//    if (adjustedCellSize <= 0) return;

    // Create grid of cells
//    for (let i = 0; i < gridSize; i++) {
//        for (let j = 0; j < gridSize; j++) {
//            if (adjustedCellSize <= 0) continue; // Skip if cells are invisible

//            const cell = document.createElement("div");
//            cell.classList.add("infillCell");

            // Set cell size and position
//            cell.style.width = `${adjustedCellSize}px`;
//            cell.style.height = `${adjustedCellSize}px`;
//            cell.style.left = `${j * cellSize}px`;
//            cell.style.top = `${i * cellSize}px`;

//            infillDiagram.appendChild(cell);
//        }
//    }
//}

// Event listener for the slider
//INFILLSLIDER.addEventListener("input", () => {
//    const infillPercentage = parseInt(infillSlider.value, 10);
//    createDynamicInfill(infillPercentage);
//});

// Initialize with default slider value
//createDynamicInfill(parseInt(infillSlider.value, 10));

