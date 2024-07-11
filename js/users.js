const ownerCount = document.querySelector(".owner-count");
const adminCount = document.querySelector(".admin-count");
const employeeCount = document.querySelector(".employee-count");
const supportCount = document.querySelector(".support-count");

const getOwner = JSON.parse(localStorage.getItem('owner'));
const getAdmins = JSON.parse(localStorage.getItem('admins'));
console.log(getAdmins)
const ownerCounter = () => {
    if (getOwner) {
        ownerCount.innerHTML = getOwner.length;
    }
    else {
        ownerCount.innerHTML = 0;
    }
}

const adminCounter = () => {
    if (getAdmins && getAdmins.length != 0) {
        let adminFilter = getAdmins.filter(admin => {
            return admin.role === 'admin'
        })
        if (adminFilter && adminFilter.length != 0) {
            adminCount.innerHTML = adminFilter.length;
        } else {
            adminCount.innerHTML = "0";
        }
    }
}

const employeeCounter = () => {
    if (getAdmins && getAdmins.length > 0) {
        let employeeFilter = getAdmins.filter(employee => {
            return employee.role === 'employee';
        });
        if (employeeFilter && employeeFilter.length != 0) {
            employeeCount.innerHTML = employeeFilter.length
        } else {
            employeeCount.innerHTML = employeeFilter.length
        }
    }
}
const supportCounter = () => {
    if (getAdmins && getAdmins.length > 0) {
        let supportFilter = getAdmins.filter(support => {
            return support.role === 'support';
        });
        if (supportFilter && supportFilter.length != 0) {
            supportCount.innerHTML = supportFilter.length
        }
        else {
            supportCount.innerHTML = supportFilter.length
        }
    }
}

ownerCounter();
adminCounter();
employeeCounter();
supportCounter();