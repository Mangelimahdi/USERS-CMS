const messageContentElem = document.querySelector('#message-content');
const messageReceiverElem = document.querySelector('#message-receiver');
const sendMessageElem = document.querySelector('#send-message');
const messageElem = document.querySelector('#message');
const searchMessageElem = document.querySelector('.search-input')

const createMessage = (senderId, receiverId, content, isPublic = false) => {
    return {
        id: Date.now(),
        senderId,
        receiverId,
        content,
        isPublic,
        timestamp: new Date().toISOString(),
    };
};

const generateUserOptions = () => {
    let option;
    const users = [...JSON.parse(localStorage.getItem('admins')), JSON.parse(localStorage.getItem('owner'))];
    let filterUser = users.filter(user => {
        return user.id ? user.id != localStorage.getItem('adminID') : user[0].id != localStorage.getItem('ownerID')
    });

    filterUser.forEach(user => {
        option = `<option value="${user.id ? user.id : user[0].id}">${user.firstName ? user.firstName : user[0].firstname} ${user.lastName ? user.lastName : user[0].lastname}</option>`
        messageReceiverElem.insertAdjacentHTML('beforeend', option)
    });
}

const setMessageToLocalStorage = (message) => {
    localStorage.setItem('message', JSON.stringify(message));
}

const getMessageFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('message')) || [];
}

const displayMessages = (messages) => {
    let adminID = localStorage.getItem('adminID');
    let ownerID = localStorage.getItem('ownerID');

    if (messages.length === 0) {
        messageElem.innerHTML = ''
        messageElem.insertAdjacentHTML('beforeend', `
            <h1 class="users-empty text-center w-100">پیامی وجود ندارد</h1>
        `);

    } else {
        messageElem.innerHTML = ''
        messages.forEach(message => {
            if (!message.isPublic && message.receiverId !== adminID && message.receiverId !== ownerID &&
                message.senderId !== adminID && message.senderId !== ownerID
            ) {
                return;
            }
            if (message.senderId === adminID || message.senderId === ownerID) {
                messageElem.insertAdjacentHTML('beforeend', `
            <div class="message-content rounded-8 w-60 w-sm-100">
                <p class="message-sender d-flex justify-between"> 
                    <span class="mx-0">
                        <strong>فرستنده:</strong> 
                        ${message.senderId === adminID || ownerID ? 'شما' : message.senderId}
                        <strong>گیرنده:</strong>
                        ${message.receiverId ? message.receiverId : 'همه کاربران'}
                    </span>
                    <span class="position-relative mx-0">
                        <i class="delete-icon fa fa-ellipsis-h cursor-pointer" onclick="showBox(this)"></i>
                        <span class="message-action position-absolute d-none">
                            <span class="message-delete cursor-pointer d-flex align-center gap-0-2" onclick="deleteMessage(${message.senderId})">
                                <i class="fa fa-trash"></i>
                                حذف
                            </span>
                        </span>
                    </span> 
                </p>
                <p class="message-text">${message.content}</p>
                <p class="message-time"><small>${new Date(message.timestamp).toLocaleString('fa-IR')}</small></p>
            </div>
            `);
            } else {
                messageElem.insertAdjacentHTML('beforeend', `
                <div class="w-100 d-flex flex-end">
                <div class="message-content rounded-8 w-60 w-sm-100">
                        <p class="message-sender d-flex justify-between"> 
                            <span class="mx-0">
                                <strong>فرستنده:</strong> 
                                ${message.senderId === adminID || ownerID ? 'شما' : message.senderId}
                                <strong>گیرنده:</strong>
                                ${message.receiverId === adminID || ownerID ? 'شما' : message.receiverId || 'همه کاربران'}
                            </span>
                        </p>
                        <p class="message-text">${message.content}</p>
                        <p class="message-time"><small>${new Date(message.timestamp).toLocaleString('fa-IR')}</small></p>
                    </div>
                </div>
                `)
            }
        });
    }
}

const showBox = (el) => {
    el.nextElementSibling.classList.remove('d-none');
    document.addEventListener('click', (event) => {
        if (event.target.tagName != 'I' || event.target != el) {
            el.nextElementSibling.classList.add('d-none');
        }
    });
}

const deleteMessage = () => {
    const messages = getMessageFromLocalStorage();
    let mainMessage = messages.findIndex((message) => {
        return message.senderId === localStorage.getItem('adminID') || message.senderId === localStorage.getItem('ownerID')
    });
    if (mainMessage != -1) {
        messages.splice(mainMessage, 1);
        setMessageToLocalStorage(messages);
        displayMessages(messages);
    }
}


sendMessageElem.addEventListener('click', () => {
    const content = messageContentElem.value
    const receiverId = messageReceiverElem.value;
    const senderId = localStorage.getItem('adminID') || localStorage.getItem('ownerID');
    const isPublic = receiverId === 'public';

    if (content && senderId) {
        const newMessage = createMessage(senderId, isPublic ? null : receiverId, content);
        const messages = getMessageFromLocalStorage();
        messages.push(newMessage)
        setMessageToLocalStorage(messages);
        displayMessages(messages);
        messageContentElem.value = ''
    }
});

searchMessageElem.addEventListener('input', (event) => {
    let messages = getMessageFromLocalStorage();

    let mainFilterMessage = messages.filter(message => {
        return message.content.includes(event.target.value);
    });

    displayMessages(mainFilterMessage)
});

window.addEventListener('load', () => {
    const messages = getMessageFromLocalStorage();
    displayMessages(messages);
    generateUserOptions();
});

