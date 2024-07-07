const $ = document
const usernameInput = $.querySelector('#username-input');
const passwordInput = $.querySelector('#password-input');
const submitFormBtn = $.querySelector('.submit-form-btn');
const passwordMessage = $.querySelector('#password-message');
const usernameMessage = $.querySelector('#username-message');
let userNameValid, passwordValid;
usernameInput.addEventListener('keyup', (event) => {
    if (event.target.value.length < 8) {
        usernameMessage.innerHTML = 'نام کاربری حداقل 8 کاراکتر باشد';
        usernameMessage.classList.remove('valid-message');
        usernameMessage.classList.add('invalid-message');
        userNameValid = false;
    }
    else {
        usernameMessage.innerHTML = 'نام کاربری معتبر است';
        usernameMessage.classList.remove('invalid-message');
        usernameMessage.classList.add('valid-message');
        userNameValid = true;
    }
});
passwordInput.addEventListener('keyup', (event) => {
    if (event.target.value.length < 8) {
        passwordMessage.innerHTML = 'رمز عبور حداقل 8 کاراکتر باشد';
        passwordMessage.classList.remove('valid-message');
        passwordMessage.classList.add('invalid-message');
        passwordValid = false;
    }
    else {
        passwordMessage.innerHTML = 'رمز عبور معتبر است';
        passwordMessage.classList.remove('invalid-message');
        passwordMessage.classList.add('valid-message');
        passwordValid = true;
    }
})
let ownerArray = [];
let adminsArray = [];
let ownerID = null;
let adminID = null;
submitFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let userNameInputValue = usernameInput.value;
    let passwordInputValue = passwordInput.value;

    let ownerData = JSON.parse(localStorage.getItem('owner'));
    let adminData = JSON.parse(localStorage.getItem('admins'));

    if (!ownerData && !adminData) {
        alert('اطلاعاتی برای برسی موجود نیست!');
        return;
    }
    if (ownerData) {
        ownerArray = ownerData
    }
    if (adminData) {
        adminsArray = adminData
    }

    if (userNameValid && passwordValid) {
        if (ownerArray) {
            let mainOwner = ownerArray.find((owner) =>
                owner.username === userNameInputValue &&
                owner.password === passwordInputValue
            );

            if (mainOwner) {
                ownerID = mainOwner.id;
                localStorage.setItem('ownerID', ownerID);
                location.href = 'https://mangelimahdi.github.io/USERS-CMS/index.html';
                clearInputs();
                return;
            }
        }
        if (adminsArray) {
            let mainAdmin = adminsArray.find((admin) =>
                admin.username === userNameInputValue &&
                admin.password === passwordInputValue
            );

            if (mainAdmin) {
                adminID = mainAdmin.id
                localStorage.setItem('adminID', adminID);
                location.href = 'http://127.0.0.1:5500/index.html';
                clearInputs();
                return;
            }
        }
        alert('!اطلاعات شما صحیح نمی باشد');
    }
    else {
        alert('!اطلاعات شما صحیح نمی باشد');
    }

});


function clearInputs() {
    usernameInput.value = ''
    passwordInput.value = ''
}