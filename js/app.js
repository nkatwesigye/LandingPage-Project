/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// check which element is active
function isElementViewable(element) {
    const bnd = element.getBoundingClientRect();
    return (
        bnd.top >= 0 &&
        bnd.left >= 0 &&
        bnd.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bnd.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function addSections() {
    for (let item of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navbar.appendChild(section);
    };
};

//Add class to set active
function setActive() {
    window.addEventListener('scroll', function(event) {
        for (let item of sections) {
            if (isElementViewable(item)) {
                item.classList.add('your-active-class');
                //set corresponding header style
                const active = document.querySelector('li[data-nav="' + item.id + '"]');
                active.classList.add('active__link');
                const headers = document.querySelectorAll('.menu__link');
                //remove from other headers
                for (let item of headers) {
                    if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
                        item.classList.remove('active__link');
                    }
                }
            } else {
                item.classList.remove('your-active-class');
            }
        };
    });

}

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navbar.addEventListener('click', function(event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();
    });
};


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
addSections();

// Scroll to section on link click
scrollToClick();

// Set sections as active
setActive();