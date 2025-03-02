document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
    loadStatistics();
    loadCreditRequests();
});

function logout() {
    alert("Logging out...");
    window.location.href = "../pages/loginandregister.html";  // Redirect to login page
}

function uploadAndScan() {
    let fileInput = document.getElementById("fileInput");
    
    if (fileInput.files.length === 0) {
        alert("Please upload a document first.");
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("document", file);

    fetch("/api/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("scan-result").classList.remove("hidden");
        document.getElementById("scanned-text").innerText = data.text || "No text extracted.";
        alert("Document scanned successfully!");
    })
    .catch(error => console.error("Error:", error));
}


// Admin Approval Simulation (Run this from admin panel)
function approveCredits(userId) {
    localStorage.setItem("credits", 10);  // Approve 10 credits
    localStorage.removeItem("creditRequestPending");  // Remove pending request
    alert("Credits approved for user.");
    checkCredits();  
}