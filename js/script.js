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
const inputUserneme = $.querySelector(".input-userneme");
const inputPassword = $.querySelector(".input-password");
const inputPasswordConfirm = $.querySelector(".input-password-confirm");
const userContainer = $.querySelector('.user-container');
const modalActiveElem = $.querySelector('.modal-active');
const modalUserElem = $.querySelector('.modal');
const modalTitleElem = $.querySelector('.modal .modal-title');
const closeModalElem = $.querySelector('.modal-close');
const btnCloseModalElem = $.querySelector('.modal .btn-close');
const searchInputElem = $.querySelector('.search-input');
const orderByElem = $.querySelector('.order-by');
// const searchUserElem = $.querySelector('.search-user');
// const searchSaveElem = $.querySelector('.search-save');
const btnAddUserElem = $.querySelector('.btn-add-user');
const showMenuElem = $.getElementById('show_menu');
const userMenuElem = $.querySelector('.user-menu');
const modalDeleteElem = $.querySelector('.modal-delete');
const closeModalDeleteElem = $.querySelector('.modal-delete .modal-close');
const btnCloseModalDeleteElem = $.querySelector('.modal-delete .btn-close');
const btnDeleteModalDeleteElem = $.querySelector('.modal-delete .btn-delete');
const modalTextDeleteElem = $.querySelector('.modal-delete .modal-text');
const rolesTable = $.querySelector('.roles-table');

let admins = [];

let adminID = null;
let isEdit = false;
let sortOrder = 'acs';

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

const collectUserData = () => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let now = new Date().toLocaleDateString('fa-IR', options);

    if (inputId.value.trim() === '' || inputFirstname.value.trim() === '' || inputLastname.value.trim() === '' || inputEmail.value.trim() === '' || inputPhone.value.trim() === '' || selectRole.value === 'empty' || inputUserneme.value.trim() === '' || inputPassword.value.trim() === '') {
        alert('لطفا کارد ها را با دقت پر کنید!');
        return null
    }

    if (inputPassword.value.trim() !== inputPasswordConfirm.value.trim()) {
        alert('رمز عبور تطابق ندارد');
        return null
    }
    return {
        id: isEdit ? adminID : admins.length + 1,
        nationalCode: inputId.value.trim(),
        firstName: inputFirstname.value.trim(),
        lastName: inputLastname.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        roule: selectRole.value,
        username: inputUserneme.value.trim(),
        password: inputPassword.value.trim(),
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
// clear inputs
const clearInputs = () => {
    inputId.value = '';
    inputFirstname.value = '';
    inputLastname.value = '';;
    inputEmail.value = '';
    inputPhone.value = '';
    selectRole.value = 'empty';
    inputUserneme.value = '';
    inputPassword.value = '';
    inputPasswordConfirm.value = '';
}
// show and close modal add and edit
const showModal = (nationalCode, firstName, lastName, email, phone, roule, username, password, permissions) => {
    modalUserElem.classList.add('show');
    modalUserElem.style.display = 'block';
    modalActiveElem.classList.add('show');
    modalActiveElem.style.display = 'block';

    if (isEdit) {
        modalTitleElem.innerHTML = 'ویرایش کاربر'
        btnAdd.innerHTML = 'ویرایش کاربر'
        inputId.value = nationalCode;
        inputFirstname.value = firstName;
        inputLastname.value = lastName;
        inputEmail.value = email;
        inputPhone.value = phone;
        selectRole.value = roule;
        inputUserneme.value = username;
        inputPassword.value = password;
        inputPasswordConfirm.value = password;

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
                if (location.pathname === '/index.html') {
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
                             <td class="user-roule">
                               ${admin.roule === 'super-admin' ? 'مدیر محصول' : admin.roule === 'admin' ? 'مدیر' : admin.roule === 'employee' ? 'کارمند' : admin.roule === 'support' ? 'پشتیبان' : 'کاربر عادی'}
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
        }
    }
}

// show edit modal
const editModal = (adminId) => {
    isEdit = true;
    adminID = adminId;

    if (adminID) {
        let allAdmins = getAdminsFromLocalStorage();
        let mainUserAdmin = allAdmins.find(userAdmin => {
            return userAdmin.id === adminID;
        });
        if (mainUserAdmin) {
            showModal(mainUserAdmin.nationalCode, mainUserAdmin.firstName, mainUserAdmin.lastName, mainUserAdmin.email, mainUserAdmin.phone, mainUserAdmin.roule, mainUserAdmin.username, mainUserAdmin.password, mainUserAdmin.permissions);
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
        closeDeleteModal();
    }
});

// menu
const showMenu = () => {
    userMenuElem.classList.remove('d-none');
}

const closeMenu = () => {
    userMenuElem.classList.add('d-none');
}

const searchUsers = (event) => {
    let admins = getAdminsFromLocalStorage();
    let filterUsers = admins.filter((admin) => {
        return admin.nationalCode.includes(event.target.value) || admin.firstName.includes(event.target.value) || admin.lastName.includes(event.target.value);
    })
    generateData(filterUsers)
}

btnAddUserElem?.addEventListener('click', () => {
    isEdit = false;
    showModal();
});

btnAddOrEdit?.addEventListener('click', () => {
    if (isEdit) {
        let allAdmins = getAdminsFromLocalStorage();
        let userIndex = allAdmins.findIndex(admin => admin.id === adminID);
        if (userIndex !== -1) {
            let updatedUser = collectUserData();
            if (updatedUser) {
                allAdmins[userIndex] = updatedUser
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

closeModalElem.addEventListener('click', () => {
    closeModal();
});

window.addEventListener('load', () => {
    const admins = getAdminsFromLocalStorage();
    generateData(admins);

    let ownerId = localStorage.getItem('ownerID');
    let adminId = localStorage.getItem('adminID');
    let owner = JSON.parse(localStorage.getItem('owner'));

    if (!ownerId && (!owner || owner.length === 0) && !adminId) {
        location.href = '/register.html';
        return;
    }

    if (owner && ownerId) {
        let mainUserLogin = owner.filter(owner => owner.id === Number(ownerId));
        if (editProfile && editProfile.parentElement) {
            editProfile.parentElement.remove();
        }
        mainUserLogin.forEach(owner => {
            titleHeader.innerHTML = `سلام ${owner.firstname}`
            userTitle.innerHTML = `${owner.firstname} ${owner.lastname}`;
            userRoul.innerHTML = owner.roule === 'super-admin' ? 'مدیر محصول' :
                owner.roule === 'admin' ? 'مدیر' :
                    owner.roule === 'employee' ? 'کارمند' :
                        owner.roule === 'support' ? 'پشتیبان' : 'کاربر عادی'
        });
        return;
    }

    if (admins && adminId) {
        let actions;
        let actionsTrash;

        let mainUserLogin = admins.filter(admin => admin.id === Number(adminId));

        mainUserLogin.forEach(admin => {
            titleHeader.innerHTML = `سلام ${admin.firstName}`
            userTitle.innerHTML = `${admin.firstName} ${admin.lastName}`;
            userRoul.innerHTML = admin.roule === 'super-admin' ? 'مدیر محصول' : admin.roule === 'admin' ? 'مدیر' : admin.roule === 'employee' ? 'کارمند' : admin.roule === 'support' ? 'پشتیبان' : 'کاربر عادی'
            if (rolesTable) {
                rolesTable.style.display = 'none';
            }
            if (btnAddUserElem) {
                if (admin.roule === 'employee' || admin.roule === 'support') {
                    btnAddUserElem.style.display = 'none';
                    $.querySelector('.head-actions').style.display = 'none';

                    actions = $.querySelectorAll('.action');
                    actions.forEach(action => {
                        action.style.display = 'none';
                    });
                }
                else {
                    btnAddUserElem.style.display = 'block';

                    $.querySelector('.head-actions').style.display = 'block';

                    actions = $.querySelectorAll('.action');
                    actions.forEach(action => {
                        action.style.display = 'block';

                        actionsTrash = action.querySelectorAll('.fa-trash-o');
                        actionsTrash.forEach(trash => {
                            action.style.display = 'block';
                            trash.style.display = 'none';
                        });
                    });
                }
            }
        });
        return;
    }
    location.href = '/login.html';
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
        })
        if (mainAdmin) {
            editModal(mainAdmin.id, mainAdmin.firstName, mainAdmin.lastName, mainAdmin.email, mainAdmin.phone, mainAdmin.roule, mainAdmin.username, mainAdmin.password, mainAdmin.permissions)
            showModal(mainAdmin.nationalCode, mainAdmin.firstName, mainAdmin.lastName, mainAdmin.email, mainAdmin.phone, mainAdmin.roule, mainAdmin.username, mainAdmin.password, mainAdmin.permissions)
        }
    }
});

// sort btn
orderByElem.addEventListener('click', () => {
    let admins = getAdminsFromLocalStorag();
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedAdmins = sortAdmins(admins, sortOrder)
    generateData(sortedAdmins)
});

searchInputElem.addEventListener('input', searchUsers);

exitPanel.addEventListener('click', () => {
    let ownerId = localStorage.getItem('ownerID');
    let adminId = localStorage.getItem('adminID');

    if (ownerId) {
        localStorage.removeItem('ownerID')
    }
    if (adminId) {
        localStorage.removeItem('adminID')
    }
    location.href = '/login.html';
})
