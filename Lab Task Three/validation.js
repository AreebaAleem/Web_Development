function showSignUpForm() {
    const loginForm = document.getElementById("log-form");
    loginForm.style.display = "none";
    const signUpForm = document.getElementById("sign-form");
    signUpForm.style.display = "block";
}

function showLoginForm() {
    const signUpForm = document.getElementById("sign-form");
    signUpForm.style.display = "none";
    const loginForm = document.getElementById("log-form");
    loginForm.style.display = "block";
}

$(document).ready(function () {
    $("#signup-form").validate({
        rules: {
            "signup-username": {
                required: true,
                minlength: 5
            },
            "signup-email": {
                required: true,
                email: true
            },
            "signup-password": {
                required: true,
                minlength: 6
            },
            "agree": {
                required: true,
            }
        },
        messages: {
            "signup-username": {
                required: "Please enter your Username",
                minlength: "Username must be at least 5 Characters long"
            },
            "signup-email": {
                required: "Please enter your Email",
                email: "Please enter a valid Email Address"
            },
            "signup-password": {
                required: "Please enter your Password",
                minlength: "Password must be at least 6 Characters long"
            },
            "agree": {
                required: "Accept the terms and conditions"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "agree") {
                error.appendTo("#agree-error");
            } else {
                error.insertAfter(element);
            }
        },
        errorClass: "error",
        validClass: "valid",
        errorElement: "div"
    });

    $("#login-form").validate({
        rules: {
            "login-email": {
                required: true,
                email: true
            },
            "login-password": {
                required: true,
                minlength: 6
            }
        },
        messages: {
            "login-email": {
                required: "Please enter your Email",
                email: "Please enter a valid Email Address"
            },
            "login-password": {
                required: "Please enter your Password"
            }
        },
        errorClass: "error",
        validClass: "valid",
        errorElement: "div"
    });
});