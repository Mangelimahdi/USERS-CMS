const ownerCount = document.querySelector(".owner-count");
const adminCount = document.querySelector(".admin-count");
const employeeCount = document.querySelector(".employee-count");
const supportCount = document.querySelector(".support-count");


const getOwner = JSON.parse(localStorage.getItem('owner'));
const getAdmins = JSON.parse(localStorage.getItem('admins'));
console.log(getOwner)
const ownerCounter = () => {
    if (getOwner || getOwner.length != 0) {
        ownerCount.innerHTML = getOwner.length
    }
    else {
        ownerCount.innerHTML = '0'
    }
}

const adminCounter = () => {
    let adminFilter = getAdmins.filter(admin => {
        return admin.roule === 'admin'
    })
    if (adminFilter) {
        adminCount.innerHTML = adminFilter.length
    } else {
        adminCount.innerHTML = '0';
    }
}

const employeeCounter = () => {
    let employeeFilter = getAdmins.filter(employee => {
        return employee.roule === 'employee';
    });
    if (employeeFilter) {
        employeeCount.innerHTML = employeeFilter.length
    } else {
        employeeCount.innerHTML = '0'
    }
}
const supportCounter = () => {
    let supportFilter = getAdmins.filter(support => {
        return support.roule === 'support';
    });
    if (supportFilter) {
        supportCount.innerHTML = supportFilter.length
    }
    else {
        supportCount.innerHTML = '0'
    }
}
ownerCounter();
adminCounter();
employeeCounter();
supportCounter();