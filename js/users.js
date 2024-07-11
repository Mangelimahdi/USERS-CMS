const ownerCount = document.querySelector(".owner-count");
const adminCount = document.querySelector(".admin-count");
const employeeCount = document.querySelector(".employee-count");
const supportCount = document.querySelector(".support-count");

const getOwner = JSON.parse(localStorage.getItem('owner'));
const getAdmins = JSON.parse(localStorage.getItem('admins'));

const ownerCounter = () => {
    if (getOwner || getOwner.length != 0) {
        ownerCount.innerHTML = getOwner.length;
    }
    else {
        ownerCount.innerHTML = 0;
    }
}

const adminCounter = () => {
    if(getAdmins){
        let adminFilter = getAdmins.filter(admin => {
            return admin.role === 'admin'
        })
        if (adminFilter) {
            adminCount.innerHTML = adminFilter.length
        } else {
            adminCount.innerHTML = adminFilter.length;
        }
    }
}

const employeeCounter = () => {
    if(getAdmins){
        let employeeFilter = getAdmins.filter(employee => {
            return employee.role === 'employee';
        });
        if (employeeFilter) {
            employeeCount.innerHTML = employeeFilter.length
        } else {
            employeeCount.innerHTML = employeeFilter.length
        }
    }
}
const supportCounter = () => {
    if(getAdmins){
        let supportFilter = getAdmins.filter(support => {
            return support.role === 'support';
        });
        if (supportFilter) {
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