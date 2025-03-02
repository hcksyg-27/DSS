// Logout function
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "../pages/home.html";
}

// Upload Document Function
async function uploadDocument() {
    let fileInput = document.getElementById('document-upload');
    let creditCountElem = document.getElementById("credit-count");

    let user = JSON.parse(localStorage.getItem("user")) || { credits: 0 };
    let currentCredits = user.credits;

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    if (currentCredits === 0) {
        alert("You have no credits left.\nRequest more credits or try again tomorrow.");
        return;
    }

    // Deduct credit and update localStorage
    user.credits = currentCredits - 1;
    localStorage.setItem("user", JSON.stringify(user));
    creditCountElem.textContent = user.credits;
    checkCredits();

    let formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        fetch('/scan', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            updateScanHistory(fileInput.files[0].name);
        });
    } catch (error) {
        console.error('Upload failed:', error);
        alert("An error occurred during upload. Please try again.");
    }
}

// Request Credits Function
function requestCredits() {
    let creditCountElem = document.getElementById("credit-count");

    let user = JSON.parse(localStorage.getItem("user")) || { credits: 0 };
    let currentCredits = user.credits;

    if (currentCredits === 0) {
        alert("Requesting more credits...");
        user.credits = currentCredits + 10;
        localStorage.setItem("user", JSON.stringify(user));

        creditCountElem.textContent = user.credits;
        alert("You have received 10 additional credits!");
        checkCredits();
    }
}

// Hide Request Credits Button when there are available credits
function checkCredits() {
    let creditCountElem = document.getElementById("credit-count");
    let requestBtn = document.getElementById("request-btn");

    let user = JSON.parse(localStorage.getItem("user")) || { credits: 0 };

    creditCountElem.textContent = user.credits;

    if (user.credits === 0) {
        requestBtn.style.display = "block";  
    } else {
        requestBtn.style.display = "none";   
    }
}

// Update Scan History Function
function updateScanHistory(filename) {
    let historyList = document.getElementById("history-list");

    // Remove placeholder text if it's the first scan
    if (historyList.children.length === 1 && historyList.children[0].textContent === "No scans yet.") {
        historyList.innerHTML = "";
    }

    let listItem = document.createElement("li");
    listItem.textContent = filename;
    historyList.appendChild(listItem);
}

// Call function to ensure UI updates on load
document.addEventListener("DOMContentLoaded", () => {
    checkCredits(); 
});
