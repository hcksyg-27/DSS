function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful!");
        window.location.href = "../pages/dss.html";
    } else {
        alert("Invalid credentials! Try again.");
    }
}

function register() {
    alert("Registration feature coming soon!");
}

function checkAuth() {
    let isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
        alert("Please log in first!");
        window.location.href = "loginandregister.html";
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "home.html";
}

// Document scan functionality
function uploadDocument() {
    let fileInput = document.getElementById('document-upload');
    
    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    let formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/scan', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        updateScanHistory(fileInput.files[0].name);
    })
    .catch(error => console.error('Error:', error));
}

function requestCredits() {
    fetch('/credits/request', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        let creditCount = document.getElementById("credit-count");
        creditCount.textContent = parseInt(creditCount.textContent) + 10; // Example: Add 10 credits
    })
    .catch(error => console.error('Error:', error));
}

function updateScanHistory(filename) {
    let historyList = document.getElementById("history-list");
    if (historyList.children[0].textContent === "No scans yet.") {
        historyList.innerHTML = "";
    }
    let listItem = document.createElement("li");
    listItem.textContent = filename;
    historyList.appendChild(listItem);
}
