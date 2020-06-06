const useradmin = document.querySelector('#useradmin');
const passadmin = document.querySelector('#passadmin');
const formadmin = document.querySelector('#adminloginform');
const submitBtn = document.querySelector('form button');

formadmin.onsubmit = adminLogin;

function adminLogin() {
    if (useradmin.value === "admin" && passadmin.value === "admin") {
        alert("welcome admin");
        window.open('./contactshow.html');
    } else {
        alert("Invalid User")
    }
}