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
const inputGroupChoose = $.querySelector('.input-group-choose');
const chooseImage = $.querySelector('#choose-image');
const imagePreview = $.querySelector('.prev-img');

let firstnameValid, lastnameValid, passwordValid, confirmPasswordValid, userNameValid, imageValid;
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
const getBaseUrl = () => {
    let hostName = window.location.hostname;
    if (hostName === '127.0.0.1' || hostName === 'localhost') {
        return ''
    } else {
        return "/USERS-CMS"
    }
}

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

// choose image with drag and drop
const dragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const drop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    dragFiles(files)
}

const dragFiles = (files) => {
    if (!files.length) {
        $.querySelector('.empty').style.display = 'block';
        imageValid = false
    } else {
        $.querySelector('.empty').style.display = 'none';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith("image/")) {
                continue;
            }

            const render = new FileReader();
            render.onload = (event) => {
                imagePreview.setAttribute('src', event.target.result);
            };
            render.readAsDataURL(file)
        }
        imageValid = true;
    }
}

// choose image with click
const chooseFiles = (event) => {
    const files = event.target.files;
    if (!event.target.files.length) {
        event.target.nextElementSibling.insertAdjacentHTML('beforeend', `<p>عکسی را انتخاب کنید یا  عکسی را بکشید</p`)
        $.querySelector('.empty').style.display = 'block'
        imageValid = false
    }
    else {
        $.querySelector('.empty').style.display = 'none'
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target.result;
            imagePreview.src = base64String;
        }
        reader.readAsDataURL(file);
        imageValid = true;
    }
}

// set in local
const setAdminInLocalStorage = (array) => {
    localStorage.setItem('owner', JSON.stringify(array));
}

// get in local
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
    const baseUrl = getBaseUrl();
    let getImage = imagePreview.getAttribute('src');
    if (firstnameValid, lastnameValid, passwordValid, confirmPasswordValid, userNameValid, imageValid) {
        if (passwordInput.value === confirmPasswordInput.value) {

            let newUser = {
                id: Math.floor(Math.random() * 99999),
                firstname: firstnameInput.value.trim(),
                lastname: lastnameInput.value.trim(),
                password: passwordInput.value.trim(),
                username: usernameInput.value.trim(),
                image: getImage,
                roule: 'super-admin',
            }
            owner.push(newUser);
            setAdminInLocalStorage(owner);
            location.href = `${baseUrl}/index.html`;
        }
        else {
            alert('رمز عبور با تکرار رمز تطابق ندارد');
        }
    }
});

inputGroupChoose.addEventListener('dragenter', dragEnter, false);
inputGroupChoose.addEventListener('dragover', dragover, false);
inputGroupChoose.addEventListener('drop', drop, false);
chooseImage.addEventListener('change', (event) => { chooseFiles(event, this) }, false)