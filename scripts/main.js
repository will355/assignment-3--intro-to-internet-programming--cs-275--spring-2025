document.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.querySelector('#js-triggers li:nth-child(2) a');
    const menuTrigger = document.querySelector('#js-triggers li:nth-child(1) a');
    const modalPanel = document.querySelector('.modal-panel');
    const modalContentPane = document.querySelector('.modal-content-pane');
    const nav = document.querySelector('nav');
    let isMobile = window.innerWidth < 736;

    modalTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        modalPanel.classList.add('active');
    });

    // Close Modal on background click or ESC key
    modalPanel.addEventListener('click', (e) => {
        if (e.target === modalPanel) {
            modalPanel.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalPanel.classList.remove('active');
        }
    });

    // Toggle Menu
    menuTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (isMobile) {
            nav.classList.toggle('side-tray-active');
        } else {
            nav.classList.toggle('dropdown-active');
        }
    });

    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth < 736;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            nav.classList.remove('side-tray-active', 'dropdown-active');
            modalPanel.classList.remove('active');
        }
    });
});
