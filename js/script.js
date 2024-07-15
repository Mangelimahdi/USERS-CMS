const $ = document;
const btnAddOrEdit = $.querySelector(".btn-add");
const inputId = $.querySelector(".input-id");
const titleHeader = $.querySelector(".title-header");
const userProfile = $.querySelector(".user-profile img");
const userTitle = $.querySelector(".user-title");
const userRoul = $.querySelector(".user-roul");
const editProfile = $.querySelector('#edit-profile');
const inputFirstname = $.querySelector(".input-firstname");
const inputLastname = $.querySelector(".input-lastname");
const exitPanel = $.querySelector('#exit-panel');
const inputEmail = $.querySelector(".input-email");
const inputPhone = $.querySelector(".input-phone");
const selectRole = $.querySelector(".select-role");
const inputUsername = $.querySelector(".input-userneme");
const inputPassword = $.querySelector(".input-password");
const inputConfirmPassword = $.querySelector(".input-password-confirm");
const userContainer = $.querySelector('.user-container');
const modalActiveElem = $.querySelector('.modal-active');
const modalUserElem = $.querySelector('.modal');
const modalTitleElem = $.querySelector('.modal .modal-title');
const closeModalElem = $.querySelector('.modal-close');
const btnCloseModalElem = $.querySelector('.modal .btn-close');
const searchInputElem = $.querySelector('.search-input');
const orderByElem = $.querySelector('.order-by');
const btnAddUserElem = $.querySelector('.btn-add-user');
const showMenuElem = $.getElementById('show_menu');
const userMenuElem = $.querySelector('.user-menu');
const modalDeleteElem = $.querySelector('.modal-delete');
const closeModalDeleteElem = $.querySelector('.modal-delete .modal-close');
const btnCloseModalDeleteElem = $.querySelector('.modal-delete .btn-close');
const btnDeleteModalDeleteElem = $.querySelector('.modal-delete .btn-delete');
const modalTextDeleteElem = $.querySelector('.modal-delete .modal-text');
const firstnameMessage = $.querySelector('#firstname-message');
const lastnameMessage = $.querySelector('#lastname-message');
const passwordMessage = $.querySelector('#password-message');
const confirmPasswordMessage = $.querySelector('#confirm-password-message');
const usernameMessage = $.querySelector('#username-message');
const rolesTable = $.querySelector('.roles-table');
const rolesTableInput = $.querySelectorAll('.roles-table input[type="checkbox"]');
const ownerCount = $.querySelector(".owner-count");
const adminCount = $.querySelector(".admin-count");
const employeeCount = $.querySelector(".employee-count");
const supportCount = $.querySelector(".support-count");
const inputGroupChoose = $.querySelector('.input-group-choose');
const chooseImage = $.querySelector('#choose-image');
const imagePreview = $.querySelector('.prev-img');
const containerPhotosElem = $.querySelector('.container-photos');

let passwordValid, confirmPasswordValid, userNameValid, imageValid;
let admins = [];
let adminID = null;
let isEdit = false;
let isUserName;
let sortOrder = 'asc';

const setAdminsToLocalStorage = (usersArray) => {
    localStorage.setItem('admins', JSON.stringify(usersArray));
}

const getAdminsFromLocalStorage = () => {
    let getAdmins = localStorage.getItem('admins');
    if (getAdmins) {
        admins = JSON.parse(getAdmins);
    }
    else {
        admins = [];
    }
    return admins;
}

const getOwnerFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('owner')) || [];
}

const usernameIsAvailable = () => {
    let admins = getAdminsFromLocalStorage();
    let owner = getOwnerFromLocalStorage()

    if ((admins && admins.length > 0) || (owner && owner.length > 0)) {
        let findAdminUsername = admins.find(admin => {
            return admin.username === inputUsername.value.trim();
        });
        let findOwnerUsername = owner.find(owner => {
            return owner.username === inputUsername.value.trim();
        })
        return !(findAdminUsername || findOwnerUsername);
    }
    return true;
}

const validateUsername = () => {
    let usernameValue = inputUsername.value.trim();
    if (usernameValue.length < 8) {
        usernameMessage.innerHTML = 'نام کاربری حداقل 8 کاراکتر باشد';
        usernameMessage.classList.remove('valid-message');
        usernameMessage.classList.add('invalid-message');
        userNameValid = false;
    }
    else if (!usernameIsAvailable()) {
        usernameMessage.innerHTML = 'نام کاربری قبلا استفاده شده است!';
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
}

const validatePassword = () => {
    let passwordValue = inputPassword.value.trim();
    if (passwordValue.length < 8) {
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
}

const validateConfirmPassword = () => {
    let confirmPasswordValue = inputConfirmPassword.value.trim();
    let passwordValue = inputPassword.value.trim();
    if (confirmPasswordValue.length < 8) {
        confirmPasswordMessage.innerHTML = 'تکرار رمز عبور حداقل 8 کاراکتر باشد';
        confirmPasswordMessage.classList.remove('valid-message');
        confirmPasswordMessage.classList.add('invalid-message');
        confirmPasswordValid = false;
    } else if (confirmPasswordValue != passwordValue) {
        confirmPasswordMessage.innerHTML = 'رمز عبور و تکرار آن یکسان نیست!';
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
}

const validateInputs = () => {
    validatePassword();
    validateConfirmPassword();
    validateUsername();
    return passwordValid && confirmPasswordValid && userNameValid && imageValid;
}

inputPassword?.addEventListener('keyup', (event) => {
    validatePassword();
})

inputConfirmPassword?.addEventListener('keyup', (event) => {
    validateConfirmPassword();
});

inputUsername?.addEventListener('keyup', (event) => {
    validateUsername()
});

const collectUserData = () => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let now = new Date().toLocaleDateString('fa-IR', options);
    let imageUrl = imagePreview.src;

    let userData = {
        id: isEdit ? adminID : admins.length + 1,
        nationalCode: inputId.value.trim(),
        firstName: inputFirstname.value.trim(),
        lastName: inputLastname.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        role: selectRole.value,
        username: inputUsername.value.trim(),
        password: inputPassword.value.trim(),
        image: imageUrl,
        date: now,
        permissions: {
            'admin': {
                read: $.getElementById('admin-read').checked,
                write: $.getElementById('admin-write').checked,
                delete: $.getElementById('admin-delete').checked,
            },
            'employee': {
                read: $.getElementById('employee-read').checked,
                write: $.getElementById('employee-write').checked,
                delete: $.getElementById('employee-delete').checked,
            },
            'support': {
                read: $.getElementById('support-read').checked,
                write: $.getElementById('support-write').checked,
                delete: $.getElementById('support-delete').checked,
            },
        }
    }
    return userData;
};

const newUser = () => {
    let newUserObj = collectUserData();
    if (newUserObj) {
        admins.push(newUserObj);
        setAdminsToLocalStorage(admins);
        generateData(admins);
        clearInputs();
        closeModal();
    }
}

// filter users
const sortAdmins = (admins, sortOrder) => {
    return admins.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.firstName.localeCompare(b.firstName);
        }
        else {
            return b.firstName.localeCompare(a.firstName)
        }
    })
}

const searchUsers = (event) => {
    let admins = getAdminsFromLocalStorage();
    let owner = getOwnerFromLocalStorage();
    let filterUsers = admins.filter((admin) => {
        return admin.nationalCode.includes(event.target.value) || admin.firstName.includes(event.target.value) || admin.lastName.includes(event.target.value);
    })

    generateData(filterUsers);
}

// admins count
const getOwner = getOwnerFromLocalStorage();
const getAdmins = getAdminsFromLocalStorage();

const ownerCounter = () => {
    if (ownerCount) {
        if (getOwner) {
            ownerCount.innerHTML = getOwner.length;
        }
        else {
            ownerCount.innerHTML = 0;
        }
    }
}

const adminCounter = () => {
    if (adminCount) {
        if (getAdmins && getAdmins.length != 0) {
            let adminFilter = getAdmins.filter(admin => {
                return admin.role === 'admin'
            })
            if (adminFilter && adminFilter.length != 0) {
                adminCount.innerHTML = adminFilter.length;
            } else {
                adminCount.innerHTML = "0";
            }
        } else {
            adminCount.innerHTML = "0";
        }
    }
}

const employeeCounter = () => {
    if (employeeCount) {
        if (getAdmins && getAdmins.length > 0) {
            let employeeFilter = getAdmins.filter(employee => {
                return employee.role === 'employee';
            });
            if (employeeFilter && employeeFilter.length != 0) {
                employeeCount.innerHTML = employeeFilter.length
            }
            else {
                employeeCount.innerHTML = "0"
            }
        } else {
            employeeCount.innerHTML = "0"
        }
    }
}
const supportCounter = () => {
    if (supportCount) {
        if (getAdmins && getAdmins.length > 0) {
            let supportFilter = getAdmins.filter(support => {
                return support.role === 'support';
            });
            if (supportFilter && supportFilter.length != 0) {
                supportCount.innerHTML = supportFilter.length
            }
            else {
                supportCount.innerHTML = "0"
            }
        }
        else {
            supportCount.innerHTML = "0"
        }
    }
}

// show and close modal add and edit
const showModal = (nationalCode, firstName, lastName, email, phone, role, username, password, permissions, image) => {
    modalUserElem.classList.add('show');
    modalUserElem.style.display = 'block';
    modalActiveElem.classList.add('show');
    modalActiveElem.style.display = 'block';

    if (isEdit) {
        modalTitleElem.innerHTML = 'ویرایش کاربر'
        btnAddOrEdit.innerHTML = 'ویرایش کاربر'
        inputId.value = nationalCode;
        inputFirstname.value = firstName;
        inputLastname.value = lastName;
        inputEmail.value = email;
        inputPhone.value = phone;
        selectRole.value = role;
        inputUsername.value = username;
        inputPassword.value = password;
        inputConfirmPassword.value = password;
        imagePreview.src = image
        const permissionsObj = permissions || {};

        $.getElementById('admin-read').checked = permissionsObj['admin']?.read || false;
        $.getElementById('admin-write').checked = permissionsObj['admin']?.write || false;
        $.getElementById('admin-delete').checked = permissionsObj['admin']?.delete || false;

        $.getElementById('employee-read').checked = permissionsObj['employee']?.read || false;
        $.getElementById('employee-write').checked = permissionsObj['employee']?.write || false;
        $.getElementById('employee-delete').checked = permissionsObj['employee']?.delete || false;

        $.getElementById('support-read').checked = permissionsObj['support']?.read || false;
        $.getElementById('support-write').checked = permissionsObj['support']?.write || false;
        $.getElementById('support-delete').checked = permissionsObj['support']?.delete || false;
    }
    else {
        modalTitleElem.innerHTML = 'افزودن کاربر';
        btnAddOrEdit.innerHTML = 'افزودن کاربر';
        clearInputs();
    }
}

// clear inputs
const clearInputs = () => {
    inputId.value = '';
    inputFirstname.value = '';
    inputLastname.value = '';;
    inputEmail.value = '';
    inputPhone.value = '';
    selectRole.value = 'empty';
    inputUsername.value = '';
    inputPassword.value = '';
    inputConfirmPassword.value = '';
    passwordValid = false;
    confirmPasswordValid = false;
    userNameValid = false;
    imageValid = false;
    usernameMessage.innerHTML = ''
    passwordMessage.innerHTML = ''
    confirmPasswordMessage.innerHTML = ''
    imagePreview.removeAttribute("src")
    rolesTableInput.forEach(role => {
        role.checked = false;
    });
}

const closeModal = () => {
    modalUserElem.classList.remove('show');
    modalUserElem.style.display = 'none';
    modalActiveElem.classList.remove('show');
    modalActiveElem.style.display = 'none';
}

const showDeleteModal = () => {
    modalDeleteElem.classList.add('show');
    modalDeleteElem.classList.remove('d-none');
    modalActiveElem.classList.add('show');
    modalActiveElem.classList.remove('d-none');
}

const closeDeleteModal = () => {
    modalDeleteElem.classList.remove('show');
    modalDeleteElem.classList.add('d-none');
    modalActiveElem.classList.remove('show');
    modalActiveElem.classList.add('d-none');
}

const generateData = (admins) => {
    if (userContainer) {
        if (admins.length === 0) {
            userContainer.innerHTML = ''
            userContainer.insertAdjacentHTML('beforeend', `
            <tr>
				<td colspan="4">
					<h1 class="users-empty text-center w-100">کاربری وجود ندارد</h1>
				</td>
			</tr>`)
        } else {
            userContainer.innerHTML = '';
            admins.forEach(admin => {
                if (location.pathname === '/index.html' || location.pathname === '/USERS-CMS/index.html' || location.pathname === '/USERS-CMS/') {
                    userContainer.insertAdjacentHTML('beforeend', `
                         <tr>
                             <td class="user-info d-flex align-center">
                                 <div class="user-text mx-0 d-flex flex-col">
                                     <h3 class="title-box user-name mx-0">${admin.firstName} ${admin.lastName}</h3>
                                     <span class="user-email">${admin.email}</span>
                                 </div>
                             </td>
                             <td class="user-create-date">
                              ${admin.date}
                             </td>
                             <td class="user-role">
                               ${admin.role === 'super-admin' ? 'مدیر محصول' : admin.role === 'admin' ? 'مدیر' : admin.role === 'employee' ? 'کارمند' : admin.role === 'support' ? 'پشتیبان' : 'کاربر عادی'}
                             </td>
                             <td class="action">
                                 <i class="fa fa-pencil mx-0 cursor-pointer" onclick="editModal(${admin.id})"></i>
                                 <i class="fa fa-trash-o mx-0 cursor-pointer" onclick="deleteModal(${admin.id})"></i>
                             </td>
                         </tr>`);
                }
                else {
                    userContainer.insertAdjacentHTML('beforeend', `
                  <tr>
                      <td class="user-info">
                          <h3 class="title-box user-name mx-0">${admin.firstName} ${admin.lastName}</h3>
                      </td>
                      <td class="user-id">
                          ${admin.nationalCode}
                      </td>
                      <td class="user-date">
                         ${admin.date}
                      </td>
                      <td class="action">
                          <i class="fa fa-check-circle-o mx-0 cursor-pointer"></i>
                          <i class="fa fa-trash-o mx-0 cursor-pointer" onclick="deleteModal(${admin.id})"></i>
                      </td>
                 </tr>`);
                }
            });
            limitations()
        }
    }
}

// show edit modal
const editModal = (adminId) => {    
    // validateInputs();
    // if (validateInputs()) {
        passwordValid = true;
        confirmPasswordValid = true;
        userNameValid = true;
        imageValid=true
    // }
    // else{
    //     passwordValid = false;
    //     confirmPasswordValid = false;
    //     userNameValid = false;
    //     imageValid=false
    // }
    isEdit = true;
    adminID = adminId;

    if (adminID) {
        let allAdmins = getAdminsFromLocalStorage();
        let mainUserAdmin = allAdmins.find(userAdmin => {
            return userAdmin.id === adminID;
        });
        if (mainUserAdmin) {
            showModal(mainUserAdmin.nationalCode, mainUserAdmin.firstName, mainUserAdmin.lastName, mainUserAdmin.email, mainUserAdmin.phone, mainUserAdmin.role, mainUserAdmin.username, mainUserAdmin.password, mainUserAdmin.permissions, mainUserAdmin.image);
        }
    }
}

// show delete modal
const deleteModal = (adminId) => {
    showDeleteModal();
    let mainFindUser = admins.find((user) => {
        return user.id === adminId;
    });

    modalTextDeleteElem.innerHTML = `ایا از حذف ${mainFindUser.firstName} ${mainFindUser.lastName} مطمئن هستید؟`;
    adminID = adminId;
};

// menu
const showMenu = () => {
    userMenuElem.classList.remove('d-none');
}

const closeMenu = () => {
    userMenuElem.classList.add('d-none');
}

// choose Image handler
const dragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
}

const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
}

const drop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const dt = event.dataTransfer;
    const files = dt.files;

    selectImageByDragging(files)
}

const selectImageByDragging = (files) => {
    let file;
    if (!files.length) {
        $.querySelector('.empty').style.display = 'block'
        imageValid = false;
    } else {
        $.querySelector('.empty').style.display = 'none'
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            if (!file.type.startsWith('image/')) {
                continue;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
            }
            reader.readAsDataURL(file)
        }
        imageValid = true;
    }
}

const selectImageByClick = (event) => {
    const files = event.target.files;
    if (!files.length) {
        $.querySelector('.empty').style.display = 'block';
        imageValid = false;
    }
    else {
        $.querySelector('.empty').style.display = 'none';
        const file = files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result;
            imagePreview.src = base64String;
        }
        reader.readAsDataURL(file);
        imageValid = true;
    }
}

// limit access level
const limitations = () => {
    let actions;
    let actionsTrash;

    let admins = getAdminsFromLocalStorage();
    let adminID = localStorage.getItem('adminID');

    let mainUserLogin = admins.filter(admin => admin.id === Number(adminID));

    mainUserLogin.forEach(admin => {
        if (rolesTable) {
            rolesTable.style.display = 'none';
        }

        if (btnAddUserElem) {
            if (admin.role === 'employee' || admin.role === 'support') {
                btnAddUserElem.style.display = 'none';
                $.querySelector('.head-actions').style.display = 'none';
                searchInputElem.parentElement.classList.replace('w-60', 'w-70')
                actions = $.querySelectorAll('.action');
                actions.forEach(action => {
                    action.style.display = 'none';
                });
                selectRole.setAttribute('disabled', 'true')
            }
            else {
                btnAddUserElem.style.display = 'block';
                $.querySelector('.head-actions').style.display = 'table-cell';

                actions = $.querySelectorAll('.action');
                actions.forEach(action => {
                    action.style.display = 'table-cell';

                    actionsTrash = action.querySelectorAll('.fa-trash-o');
                    actionsTrash.forEach(trash => {
                        trash.style.display = 'none';
                    });
                });
            }
        }
    });
}

// base url
const getBaseUrl = () => {
    let hostName = window.location.hostname;
    if (hostName === '127.0.0.1' || hostName === 'localhost') {
        return ''
    } else {
        return "/USERS-CMS"
    }
}

// photos
const photos = (admins, owner) => {

    let box = '';
    if (containerPhotosElem) {
        containerPhotosElem.innerHTML = ''
        if (admins) {
            admins.forEach(admin => {
                box = `
                <div class="box-photo rounded-8">
                <img src="${admin.image}" class="user-image">
                <div class="user-infos d-flex justify-between align-center">
                <span class="user-fullname d-flex align-center">
                <i class="fa fa-user"></i>
                ${admin.firstName} ${admin.lastName}
                </span>
                <span class="user-role d-flex align-center">
                <i class="fa fa-briefcase"></i>
                ${admin.role === 'super-admin' ? 'مدیر محصول' :
                        admin.role === 'admin' ? 'مدیر' :
                            admin.role === 'employee' ? 'کارمند' :
                                admin.role === 'support' ? 'پشتیبان' : 'کاربر عادی'}
                </span>
                </div>
                </div>
                `
                containerPhotosElem.insertAdjacentHTML('beforeend', box)
            })
        }

        if (owner) {
            owner.forEach(owner => {
                box = `
                <div class="box-photo rounded-8">
                <img src="${owner.image}" class="user-image">
                <div class="user-infos d-flex justify-between align-center">
                <span class="user-fullname d-flex align-center">
                <i class="fa fa-user"></i>
                ${owner.firstname} ${owner.lastname}
                </span>
                <span class="user-role d-flex align-center">
                <i class="fa fa-briefcase"></i>
                ${owner.role === 'super-admin' ? 'مدیر محصول' :
                        owner.role === 'admin' ? 'مدیر' :
                            owner.role === 'employee' ? 'کارمند' :
                                owner.role === 'support' ? 'پشتیبان' : 'کاربر عادی'}
                </span>
                </div>
                </div>`
                containerPhotosElem.insertAdjacentHTML('beforeend', box)
            })
        }
    }

}
// events
btnCloseModalElem?.addEventListener('click', closeModal);

btnDeleteModalDeleteElem?.addEventListener('click', () => {
    let getAdmins = getAdminsFromLocalStorage();
    let mainIndexUser = getAdmins.findIndex((user) => {
        return user.id === adminID;
    });

    if (mainIndexUser !== -1) {
        getAdmins.splice(mainIndexUser, 1);
        setAdminsToLocalStorage(admins);
        generateData(admins);
        ownerCounter();
        adminCounter();
        employeeCounter();
        supportCounter();
        closeDeleteModal();
    }
});

btnAddUserElem?.addEventListener('click', () => {
    isEdit = false;
    showModal();
});

btnAddOrEdit?.addEventListener('click', () => {
    if (inputId.value.trim() !== '' && inputFirstname.value.trim() !== '' && inputLastname.value.trim() !== '' && inputEmail.value.trim() !== '' && inputPhone.value.trim() !== '' && selectRole.value !== 'empty' && inputUsername.value.trim() !== '' && inputPassword.value.trim() !== '') {
        if (validateInputs()) {
            if (isEdit) {
                let allAdmins = getAdminsFromLocalStorage();
                let userIndex = allAdmins.findIndex(admin => admin.id === adminID);
                if (userIndex !== -1) {
                    let updatedUser = collectUserData();
                    if (updatedUser) {
                        allAdmins[userIndex] = updatedUser;
                        setAdminsToLocalStorage(allAdmins);
                        generateData(allAdmins);
                        closeModal();
                        isEdit = false;
                    }
                }
            } else {
                newUser();
                isEdit = true;
            }
            ownerCounter();
            adminCounter();
            employeeCounter();
            supportCounter();
        }
        else {
            alert('لطفا اطلاعات معتبر وارد کنید')
        }
    } else {
        alert('لطفا همه کادر ها را پر کنید!')
    }
});

closeModalDeleteElem?.addEventListener("click", () => {
    closeDeleteModal();
});

btnCloseModalDeleteElem?.addEventListener('click', () => {
    closeDeleteModal();
    closeModal();
});

// user setting menu
showMenuElem.addEventListener('click', () => {
    showMenu();
    document.addEventListener('click', (event) => {
        if (event.target.tagName !== "I") {
            closeMenu();
        }
    })
});

closeModalElem?.addEventListener('click', () => {
    closeModal();
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'Escape') {
        closeModal();
        closeMenu();
    }
});

editProfile.addEventListener('click', () => {
    isEdit = true;
    let allAdmins = getAdminsFromLocalStorage();
    let adminId = localStorage.getItem('adminID');
    if (adminId) {
        let mainAdmin = allAdmins.find(admin => {
            return admin.id === +adminId;
        });
        if (mainAdmin) {
            editModal(mainAdmin.id, mainAdmin.firstName, mainAdmin.lastName, mainAdmin.email, mainAdmin.phone, mainAdmin.role, mainAdmin.username, mainAdmin.password, mainAdmin.permissions, mainAdmin.image)
            showModal(mainAdmin.nationalCode, mainAdmin.firstName, mainAdmin.lastName, mainAdmin.email, mainAdmin.phone, mainAdmin.role, mainAdmin.username, mainAdmin.password, mainAdmin.permissions, mainAdmin.image)
        }
    }
});

// sort btn
orderByElem?.addEventListener('click', () => {
    let admins = getAdminsFromLocalStorage();
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedAdmins = sortAdmins(admins, sortOrder);
    generateData(sortedAdmins);
});

searchInputElem.addEventListener('input', searchUsers);

exitPanel.addEventListener('click', () => {
    let ownerId = localStorage.getItem('ownerID');
    let adminId = localStorage.getItem('adminID');
    const baseUrl = getBaseUrl();

    if (ownerId) {
        localStorage.removeItem('ownerID');
    }
    if (adminId) {
        localStorage.removeItem('adminID');
    }
    location.href = `${baseUrl}/login.html`;
})

window.addEventListener('load', () => {
    const admins = getAdminsFromLocalStorage();
    const baseUrl = getBaseUrl();
    let ownerId = localStorage.getItem('ownerID');
    let adminId = localStorage.getItem('adminID');
    let owner = getOwnerFromLocalStorage()
    generateData(admins);
    ownerCounter();
    adminCounter();
    employeeCounter();
    supportCounter();
    photos(admins, owner);
    if (!ownerId && (!owner || owner.length === 0) && !adminId) {
        location.href = `${baseUrl}/register.html`;
        return;
    }

    if (owner && ownerId) {
        let mainUserLogin = owner.filter(owner => owner.id === Number(ownerId));
        if (editProfile && editProfile.parentElement) {
            editProfile.parentElement.remove();
        };

        mainUserLogin.forEach(owner => {
            titleHeader.innerHTML = `سلام ${owner.firstname}`
            userTitle.innerHTML = `${owner.firstname} ${owner.lastname}`;
            userRoul.innerHTML = owner.role === 'super-admin' ? 'مدیر محصول' :
                owner.role === 'admin' ? 'مدیر' :
                    owner.role === 'employee' ? 'کارمند' :
                        owner.role === 'support' ? 'پشتیبان' : 'کاربر عادی'
            userProfile.setAttribute('src', owner.image)
        });
        return;
    }

    if (admins && adminId) {
        let mainUserLogin = admins.filter(admin => admin.id === Number(adminId));

        mainUserLogin.forEach(admin => {
            titleHeader.innerHTML = `سلام ${admin.firstName}`
            userTitle.innerHTML = `${admin.firstName} ${admin.lastName}`;
            userRoul.innerHTML = admin.role === 'super-admin' ? 'مدیر محصول' : admin.role === 'admin' ? 'مدیر' : admin.role === 'employee' ? 'کارمند' : admin.role === 'support' ? 'پشتیبان' : 'کاربر عادی';
            userProfile.setAttribute('src', admin.image)
        });
        limitations();
        return;
    }

    location.href = `${baseUrl}/login.html`;
});

inputGroupChoose?.addEventListener('dragenter', dragEnter, false);
inputGroupChoose?.addEventListener('dragover', dragOver, false);
inputGroupChoose?.addEventListener('drop', drop, false);
chooseImage?.addEventListener('change', (event) => { selectImageByClick(event, this) }, false)
