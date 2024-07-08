const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="js/components/aside-header/aside-site.css">
    <link rel="stylesheet" href="css/style.css">
    <div class="burger-menu d-none d-lg-block">
    <i class="fa fa-bars"></i>
    </div>
    <div class="container-aside h-100 w-20 w-lg-30 w-md-40 w-sm-50 w-xs-70 translate-x-lg-400">
    <div class="user-logo">
        <img src="images/userlogo.png" alt="userlogo" class="logo-img">
    </div>
    <div class="menu-first">
        <ul class="menu-list">
            <li class="list-item active">
                <i class="fa fa-dashboard"></i>
                <a href="index.html">داشبورد</a>
            </li>
            <li class="list-item">
                <i class="fa fa-users"></i>
                <a href="users.html">کاربران</a>
            </li>
            <li class="list-item">
                <i class="fa fa-file-text"></i>
                <a href="document.html">مقالات</a>
            </li>
            <li class="list-item">
                <i class="fa fa-photo"></i>
                <a href="#">عکس ها</a>
            </li>
            <li class="list-item">
                <i class="fa fa-cubes"></i>
                <a href="#">سلسله مراتب</a>
            </li>
        </ul>
    </div>
    <div class="menu-tow ">
        <ul class="menu-list">
            <li class="list-item">
                <i class="fa fa-commenting"></i>
                <a href="message.html">
                    پیام ها
                </a>
            </li>
            <li class="list-item">
                <i class="fa fa-question-circle-o"></i>
                <a href="#">
                    کمک
                </a>
            </li>
            <li class="list-item">
                <i class="fa fa-cog"></i>
                <a href="#">
                    تنظیمات
                </a>
            </li>
        </ul>
    </div>
</div>
`

class AsideSite extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const currentPath = window.location.href;
        let asideLinks = this.shadowRoot.querySelectorAll('.list-item a');
        const burgerMenuElem = this.shadowRoot.querySelector('.burger-menu');
        const containerAsideElem = this.shadowRoot.querySelector('.container-aside');

        let prevActive = null;
        asideLinks.forEach((link) => {
            if (link.parentElement.classList.contains('active')) {
                prevActive = link.parentElement;
                prevActive.classList.remove('active')
            }
            if (link.href === currentPath) {
                link.parentElement.classList.add('active');
            }
        });

        const closeAside = () => {
            containerAsideElem.classList.remove('translate-x-0');
        }
        // aside
        burgerMenuElem.addEventListener('click', (event) => {
            containerAsideElem.classList.add('translate-x-0');
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'Escape') {
                closeAside();
            }
        });
        document.body.addEventListener('click', (event) => {
            if (event.target.nodeName != 'ASIDE-SITE') {
                closeAside();
            }
        })
    }

}
export { AsideSite };
