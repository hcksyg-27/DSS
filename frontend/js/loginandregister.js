let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});



document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");

    //login function
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form submission

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
             

                // Redirect to the dashboard or main page
                window.location.href = "../pages/dss.html";
            } else {
                alert(data.error || "Login failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    });

    //Signup function
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.querySelector(".signup-box .name").value;
        const email = document.querySelector(".signup-box .email").value;
        const password = document.querySelector(".signup-box .password").value;
        const confirmPassword = document.querySelectorAll(".signup-box .password")[1].value;

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // alert("Registration successful! Please log in.");
            } else {
                alert(data.error || "Registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    });
});




























