const listContentElem = document.querySelector('.list-content');
const btnAddOrEditDoc = document.querySelector('.btn-docs');
const docTitle = document.querySelector('#doc-title');
const docDate = document.querySelector('#doc-date');
const docSelectCategory = document.querySelector('#doc-select-category');
const docContent = document.querySelector('#doc-content');
const deleteAllDoc = document.querySelector('.delete-all-doc');
const filterMonth = document.querySelector('#filter-month')
const filterDocument = document.querySelector('#filter-document')
const btnAddDoc = document.querySelector('.btn-add-doc');
// select modal
const modalActiveDoc = document.querySelector('.modal-active');
// select modal add or edit
const modalDocElem = document.querySelector('.modal');
const modalTitleDocElem = document.querySelector('.modal .modal-title');
// select modal delete
const modalDeleteDoc = document.querySelector('.modal-delete');
const closeModalDeleteDoc = document.querySelector('.modal-delete .modal-close');
const btnCloseModalDeleteDoc = document.querySelector('.modal-delete .btn-close');
const btnDeleteModalDeleteDoc = document.querySelector('.modal-delete .btn-delete');
const modalTextDeleteDoc = document.querySelector('.modal-delete .modal-text');
// select modal article
const modalArticleDoc = document.querySelector(".modal-article");
const modalTitleArticleDoc = document.querySelector(".modal-article .modal-title");
const modalCloseBtnArticleDoc = document.querySelector(".modal-article .btn-close");
const modalCloseArticleDoc = document.querySelector('.modal-article .modal-close');
const modalTextArticleDoc = document.querySelector('.modal-article .modal-text');

let documents = [];
let isEditDoc = false;
let isDeleteAll = false;
let documentID = null;

const newDocument = () => {
    let newDocObj = {
        id: documents.length + 1,
        title: docTitle.value,
        date: docDate.value,
        category: docSelectCategory.value,
        content: docContent.value,
    }

    documents.push(newDocObj);
    setDocumentToLocalStorage(documents);
    generageDocument(documents);
    clearInputsDoc();
    closeModalDoc();
}

const showModalDoc = (title, date, category, content) => {
    modalDocElem.classList.add('show');
    modalDocElem.style.display = 'block';
    modalActiveElem.classList.add('show');
    modalActiveElem.style.display = 'block';
    if (isEditDoc) {
        modalTitleElem.innerHTML = 'ویرایش مقاله'
        btnAddOrEditDoc.innerHTML = 'ویرایش مقاله';
        docTitle.value = title;
        docDate.value = date;
        docSelectCategory.value = category;
        docContent.value = content;
    } else {
        modalTitleElem.innerHTML = 'افزودن مقاله';
        btnAddOrEditDoc.innerHTML = 'افزودن مقاله';
        clearInputsDoc();
    }
}

const clearInputsDoc = () => {
    btnAddOrEditDoc.value = '';
    docTitle.value = '';
    docDate.value = '';
    docSelectCategory.value = 'selectcategory';
    docContent.value = '';
}
// show and close modal

const showDeleteModalDoc = () => {
    modalDeleteDoc.classList.add('show');
    modalDeleteDoc.classList.remove('d-none');
    modalActiveDoc.classList.add('show');
    modalActiveDoc.classList.remove('d-none');
    if (isDeleteAll) {
        modalTextDeleteDoc.innerHTML = 'ایا از حذف همه مقاله ها مطمئن هستید؟'
    } else {
        let mainFindDocument = documents.find((document) => {
            return document.id === documentID;
        });

        if (mainFindDocument) {
            modalTextDeleteDoc.innerHTML = `ایا از حذف مقاله ${mainFindDocument.title}`;
            documentID = documentId;
        }
    }
}

const closeDeleteModalDoc = () => {
    modalDeleteDoc.classList.remove('show');
    modalDeleteDoc.classList.add('d-none');
    modalActiveDoc.classList.remove('show');
    modalActiveDoc.classList.add('d-none');
}

const closeModalDoc = () => {
    modalDocElem.classList.remove('show');
    modalDocElem.style.display = 'none';
    modalActiveDoc.classList.remove('show');
    modalActiveDoc.style.display = 'none';
}
const showModalArticle = () => {
    modalArticleDoc.classList.add('show');
    modalArticleDoc.classList.remove('d-none');
    modalActiveDoc.classList.add('show');
    modalActiveDoc.classList.remove('d-none');
}
const closeModalArticle = () => {
    modalArticleDoc.classList.remove('show');
    modalArticleDoc.classList.add('d-none');
    modalActiveDoc.classList.remove('show');
    modalActiveDoc.classList.add('d-none');
}
const setDocumentToLocalStorage = (arrayDoc) => {
    localStorage.setItem('document', JSON.stringify(arrayDoc));
}

const getDocumentFromLocalStorage = () => {
    const allDocuments = JSON.parse(localStorage.getItem('document'));
    if (allDocuments) {
        documents = allDocuments;
    }
    else {
        documents = [];
    }
    return documents;
}

const generageDocument = (documents) => {
    if (!documents || documents.length === 0) {
        listContentElem.innerHTML = ''
        listContentElem.insertAdjacentHTML('beforeend', `
        <h1 class="users-empty text-center w-100">مقاله ای وجود ندارد!</h1
        `);
    } else {
        listContentElem.innerHTML = ''
        documents.forEach((document) => {
            listContentElem.insertAdjacentHTML('beforeend', `
            <div class="list-doc d-flex align-center justify-between flex-xl-col gap-16 rounded-8">
                <div class="list-doc-icon mx-0">
                    <i class="fa fa-file-text-o"></i>
                </div>
                <div class="content-list d-flex align-center justify-between flex-md-col gap-16 mx-0 w-100">
                    <div class="list-text mx-0">
                        <h3 class="doc-name text-md-center">${document.title}</h3>
                        <span class="sub-title d-block">${document.date}</span>
                    </div>
                    <div class="doc-discription text-xl-center mx-0 w-10 d-flex align-center">
                        <p class="mx-0 text">${document.content}</p>
                        <button class="more-button mx-0 cursor-pointer" onclick="showMore(${document.id})">بیشتر</button>
                    </div>
                    <div class="action d-flex align-center gap-16 mx-0">
                        <i class="fa fa-pencil mx-0 cursor-pointer" onclick="editModalDoc(${document.id},'${document.title}','${document.date}','${document.category}','${document.content}')"></i>
                        <i class="fa fa-trash-o mx-0 cursor-pointer" onclick="deleteModalDoc(${document.id})"></i>
                    </div>
                </div>
            </div>
            `);
        });
    }
}
const filterByDate = (event) => {
    let mainFilterDocument = documents.filter(document => {
        console.log(event.target.value===document.date)
    })
}

const editModalDoc = (documentId, title, date, category, content) => {
    isEditDoc = true;
    documentID = documentId;
    showModalDoc(title, date, category, content);
};

const deleteModalDoc = (documentId) => {
    isDeleteAll = false;
    documentID = documentId;
    showDeleteModalDoc();
};

const showMore = (documentId) => {
    showModalArticle();
    let mainFilterDocument = documents.filter(document => {
        return document.id === documentId
    });
    console.log(mainFilterDocument)
    if (mainFilterDocument) {
        modalTitleArticleDoc.innerHTML = mainFilterDocument[0].title
        modalTextArticleDoc.innerHTML = mainFilterDocument[0].content
    }
}

btnDeleteModalDeleteDoc.addEventListener('click', () => {
    if (isDeleteAll) {
        localStorage.removeItem('document');
        closeDeleteModalDoc();
        generageDocument();
    }
    else {
        let mainIndexDocument = documents.findIndex((document) => {
            return document.id === documentID;
        });

        if (mainIndexDocument != -1) {
            documents.splice(mainIndexDocument, 1);
            setDocumentToLocalStorage(documents);
            generageDocument(documents);
            closeDeleteModalDoc();
        }
    }
});

btnAddOrEditDoc.addEventListener('click', () => {
    if (isEditDoc) {
        let allDocuments = getDocumentFromLocalStorage();
        allDocuments.some(document => {
            if (document.id === documentID) {
                document.title = docTitle.value;
                document.date = docDate.value;
                document.category = docSelectCategory.value;
                document.content = docContent.value
            }
        });
        setDocumentToLocalStorage(allDocuments);
        generageDocument(allDocuments)
        clearInputsDoc();
        closeModalDoc();
        isEditDoc = false;
    } else {
        newDocument();
        isEditDoc = true;
    }
});

btnAddDoc.addEventListener('click', () => {
    showModalDoc();
});

deleteAllDoc.addEventListener('click', () => {
    isDeleteAll = true;
    showDeleteModalDoc();
});

modalCloseBtnArticleDoc.addEventListener('click', () => {
    closeModalArticle()
});

modalCloseArticleDoc.addEventListener('click', () => {
    closeModalArticle()
});

filterMonth.addEventListener('input', filterByDate());

window.addEventListener('load', () => {
    let allDocuments = getDocumentFromLocalStorage();
    generageDocument(allDocuments)
    filterMonth.value = `1400-12-31`
})