const $ = document;
const firstnameInput = $.querySelector("#firstname-input");
const lastnameInput = $.querySelector("#lastname-input");
const passwordInput = $.querySelector("#password-input");
const confirmPasswordInput = $.querySelector("#confirm-password-input");
const usernameInput = $.querySelector("#username-input");
const firstnameMessage = $.querySelector('#firstname-message');
const lastnameMessage = $.querySelector('#lastname-message');
const passwordMessage = $.querySelector('#password-message');
const confirmPasswordMessage = $.querySelector('#confirm-password-message');
const usernameMessage = $.querySelector('#username-message');
const submitBtn = $.querySelector('#submit-btn');

let firstnameValid, lastnameValid, passwordValid, confirmPasswordValid, userNameValid;
firstnameInput.addEventListener('keyup', (event) => {
    if (event.target.value.length < 3) {
        firstnameMessage.innerHTML = 'نام حداقل 3 کاراکتر باشد';
        firstnameMessage.classList.remove('valid-message');
        firstnameMessage.classList.add('invalid-message');
        firstnameValid = false;
    }
    else {
        firstnameMessage.innerHTML = 'نام معتبر است';
        firstnameMessage.classList.remove('invalid-message');
        firstnameMessage.classList.add('valid-message');
        firstnameValid = true;
    }
});

lastnameInput.addEventListener('keyup', (event) => {
    if (event.target.value.length < 3) {
        lastnameMessage.innerHTML = 'نام خانوادگی حداقل 3 کاراکتر باشد';
        lastnameMessage.classList.remove('valid-message');
        lastnameMessage.classList.add('invalid-message');
        lastnameValid = false;
    } else {
        lastnameMessage.innerHTML = 'نام خانوادگی معتبر است';
        lastnameMessage.classList.remove('invalid-message');
        lastnameMessage.classList.add('valid-message');
        lastnameValid = true;
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

confirmPasswordInput.addEventListener('keyup', (event) => {
    if (event.target.value.length < 8) {
        confirmPasswordMessage.innerHTML = 'تکرار رمز عبور حداقل 8 کاراکتر باشد';
        confirmPasswordMessage.classList.remove('valid-message');
        confirmPasswordMessage.classList.add('invalid-message');
        confirmPasswordValid = false;
    }
    else {
        confirmPasswordMessage.innerHTML = 'رمز عبور معتبر است';
        confirmPasswordMessage.classList.remove('invalid-message');
        confirmPasswordMessage.classList.add('valid-message');
        confirmPasswordValid = true;
    }
})
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

let owner = []
const setAdminInLocalStorage = (array) => {
    localStorage.setItem('owner', JSON.stringify(array));
}

const getAdminFromLocalStorage = () => {
    let getowner = JSON.parse(localStorage.getItem('owner'));
    if (owner) {
        owner = getowner;
    }
    else {
        getowner = [];
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (firstnameValid, lastnameValid, passwordValid, confirmPasswordValid, userNameValid) {
        if (passwordInput.value === confirmPasswordInput.value) {
            let newUser = {
                id: Math.floor(Math.random() * 99999),
                firstname: firstnameInput.value.trim(),
                lastname: lastnameInput.value.trim(),
                password: passwordInput.value.trim(),
                username: usernameInput.value.trim(),
                roule: 'super-admin',
            }
            owner.push(newUser);
            setAdminInLocalStorage(owner);
            location.href = 'https://mangelimahdi.github.io/USERS-CMS/index.html';
        }
        else {
            alert('رمز عبور با تکرار رمز تطابق ندارد');
        }
    }
});