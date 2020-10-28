// Theme switch
const version = '2.0';
const KEY_THEME = 'KEY_THEME';
let theme = 'light';
let root = document.documentElement;
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem(KEY_THEME) == null)
        localStorage.setItem(KEY_THEME, theme);
    else theme = localStorage.getItem(KEY_THEME);
}
if (theme == 'light') {
    root.style.setProperty('--bg-background-color', '#ffffff');
    root.style.setProperty('--bg-foreground-color', '#1a1a1a');
    root.style.setProperty('--bg-shadow-color', 'hsla(0, 0%, 10%, 0.1)');
    root.style.setProperty('--bg-navbar-color', 'hsla(0, 0%, 100%, 0.7)');
} else {
    root.style.setProperty('--bg-background-color', '#1a1a1a');
    root.style.setProperty('--bg-foreground-color', '#ffffff');
    root.style.setProperty('--bg-shadow-color', 'hsla(214, 93%, 55%, 0.1)');
    root.style.setProperty('--bg-navbar-color', 'hsla(214, 93%, 55%, 0.7)');
}

function themeSwitch() {
    let themeSwitchs = this.document.getElementsByClassName('theme-switch');
    for (let themeSwitch of themeSwitchs) {
        themeSwitch.addEventListener("click", function () {
            if (theme == 'light') {
                theme = 'dark';
                localStorage.setItem(KEY_THEME, theme);
                root.style.setProperty('--bg-background-color', '#1a1a1a');
                root.style.setProperty('--bg-foreground-color', '#ffffff');
                root.style.setProperty('--bg-shadow-color', 'hsla(214, 93%, 55%, 0.1)');
                root.style.setProperty('--bg-navbar-color', 'hsla(214, 93%, 55%, 0.7)');
            } else {
                theme = 'light';
                localStorage.setItem(KEY_THEME, theme);
                root.style.setProperty('--bg-background-color', '#ffffff');
                root.style.setProperty('--bg-foreground-color', '#1a1a1a');
                root.style.setProperty('--bg-shadow-color', 'hsla(0, 0%, 10%, 0.1)');
                root.style.setProperty('--bg-navbar-color', 'hsla(0, 0%, 100%, 0.7)');
            }
        });
    }
}

window.onload = function () {

    // Theme switch
    this.themeSwitch();

    // Spinner
    this.loadSpinner();

    // Mobile nav
    this.loadMobileNav();

    // Navigation logic
    window.onscroll = function () {
        this.detectNavLogic();
        this.detectNavLogicMobile();
    }
    this.detectNavLogic();
    this.detectNavLogicMobile();

    // Load skills
    this.loadSkills();

    // Load educations
    this.loadEducations();

    // Load experiences
    this.loadExperiences();

    // Load achievements
    this.loadAchievements();

    // Load portofolios
    this.loadPortofolios();

    // Load publications
    this.loadPublications();

    // Copyright date
    this.loadCopyright();
}

// All function load untuk membatasi/ manajemen scope variabel

function loadSpinner() {
    let spinner = document.querySelector('.spinner');
    spinner.classList.add('hide');
    let spinnerAllChilds = document.querySelectorAll('.spinner div');
    for (let spinnerObj of spinnerAllChilds) {
        spinnerObj.style.display = 'none';
    }
}

function loadMobileNav() {
    let showMobileNav = this.document.getElementById('show-mobile-nav');
    let mobileNav = this.document.getElementById('mobile-nav');
    let closeMobileNav = this.document.querySelector('nav#mobile-nav > a');
    let menuMobileNavs = this.document.querySelectorAll('nav#mobile-nav > ul > li > a');

    showMobileNav.addEventListener('click', function () {
        mobileNav.classList.add('show');
    });

    closeMobileNav.addEventListener('click', function () {
        mobileNav.classList.remove('show');
    });

    for (let menuMobileNav of menuMobileNavs) {
        menuMobileNav.addEventListener('click', function () {
            mobileNav.classList.remove('show');
        });
    }
}

function detectNavLogic() {
    let fixedNav = this.document.querySelector('nav#nav-fixed');

    if (window.scrollY > 350) {
        fixedNav.removeAttribute('hidden');
    } else {
        fixedNav.setAttribute('hidden', true);
    }
}

function detectNavLogicMobile() {
    let fixedMobileNav = this.document.querySelector('header > nav');
    let linkFixedMobileNavs = this.document.querySelectorAll('header > nav > ul > li > a');

    if (window.scrollY > 70) {
        fixedMobileNav.style.backgroundColor = 'var(--bg-navbar-color)';
        fixedMobileNav.style.boxShadow = '0 0 24px 0 var(--bg-navbar-color)';
        for (let linkFixedMobileNav of linkFixedMobileNavs) {
            linkFixedMobileNav.style.color = 'var(--bg-foreground-color)';
        }
    } else {
        fixedMobileNav.style.backgroundColor = 'transparent';
        fixedMobileNav.style.boxShadow = 'none';
        for (let linkFixedMobileNav of linkFixedMobileNavs) {
            linkFixedMobileNav.style.color = 'var(--bg-background-color)';
        }
    }
}

function loadSkills() {
    loadJSON(`assets/json/skills_v${version}.json`, function (response) {
        let skills = JSON.parse(response);
        let elemSkill = '';
        for (let skill of skills) {
            elemSkill +=
                `
                <div class="progress">
                    <div class="title">
                        <span class="icon"><i class="${skill.icon}"></i>&nbsp;</span>
                        <span>${skill.name}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="bar">
                            <div>
                                <div style="width: ${skill.value};"></div>
                            </div>
                        </div>
                        <div class="value">
                            <span>${skill.value}</span>
                        </div>
                    </div>
                </div>
                `;
        }
        let skillContainer = document.querySelector('#skills > .content-section');
        skillContainer.innerHTML = elemSkill;
    });
}

function loadEducations() {
    loadJSON(`assets/json/educations_v${version}.json`, function (response) {
        let educations = JSON.parse(response);
        let elemSkill = '';
        for (let education of educations) {
            elemSkill +=
                `
                <div class="content">
                    <h2>${education.title}</h2>
                    <h3>${education.subtitle}</h3>
                    <h4>${education.desc}</h4>
                </div>
                `;
        }
        let educationContainer = document.querySelector('#educations > .content-section');
        educationContainer.innerHTML = elemSkill;
    });
}

function loadExperiences() {
    loadJSON(`assets/json/experiences_v${version}.json`, function (response) {
        let experiences = JSON.parse(response);
        let elemSkill = '';
        for (let experience of experiences) {
            elemSkill +=
                `
                <div class="content">
                    <h2>${experience.title}</h2>
                    <h3>${experience.subtitle}</h3>
                    <h4>${experience.desc}</h4>
                </div>
                `;
        }
        let experienceContainer = document.querySelector('#experiences > .content-section');
        experienceContainer.innerHTML = elemSkill;
    });
}

function loadAchievements() {
    loadJSON(`assets/json/achievements_v${version}.json`, function (response) {
        let achievements = JSON.parse(response);
        let elemSkill = '';
        for (let achievement of achievements) {
            elemSkill +=
                `
                <div class="content">
                    <h2>${achievement.title}</h2>
                    <h3>${achievement.subtitle}</h3>
                    <h4>${achievement.desc}</h4>
                </div>
                `;
        }
        let achievementContainer = document.querySelector('#achievements > .content-section');
        achievementContainer.innerHTML = elemSkill;
    });
}

function loadPortofolios() {
    loadJSON(`assets/json/portofolios_v${version}.json`, function (response) {
        let portofolios = JSON.parse(response);
        let elemSkill = '';
        let id = 0;
        for (let portofolioRow of portofolios) {
            let elemSkillTemp = '';
            let idTemp = 0;
            let leftRight = 'left';
            for (let portofolioCol of portofolioRow) {
                elemSkillTemp +=
                    `
                    <div class="col hide-in-mobile" style="background-image: url(assets/img/portofolios/${portofolioCol.image});">
                        <div id="decor-port-${id}-${idTemp}" class="port-decor ${leftRight}">
                        </div>
                        <div class="port-content" id="port-${id}-${idTemp}">
                            <h2 class="anim">${portofolioCol.title}</h2>
                            <h3 class="anim">${portofolioCol.subtitle}</h3>
                            <h4 class="anim">${portofolioCol.desc};</h4>
                            <h4>
                                <a class="btn anim" target="_blank" href="${portofolioCol.link}">Visit</a>
                            </h4>
                        </div>
                    </div>
                    `;
                idTemp++;
                if (leftRight == 'left') leftRight = 'right';
                else leftRight = 'left';
            }
            elemSkill += `<div class="row hide-in-mobile">${elemSkillTemp}</div>`;
            id++;
        }

        // Mobile responsive
        for (let portofolioRowMobile of portofolios) {
            let idTempMobile = 0;
            let leftRightMobile = 'left';
            for (let portofolioColMobile of portofolioRowMobile) {
                elemSkill +=
                    `
                    <div class="row show-in-mobile">
                        <div class="col show-in-mobile" style="background-image: url(assets/img/portofolios/${portofolioColMobile.image});">
                            <div id="decor-port-${id}-${idTempMobile}" class="port-decor ${leftRightMobile}">
                            </div>
                            <div class="port-content" id="port-${id}-${idTempMobile}">
                                <h2 class="anim">${portofolioColMobile.title}</h2>
                                <h3 class="anim">${portofolioColMobile.subtitle}</h3>
                                <h4 class="anim">${portofolioColMobile.desc};</h4>
                                <h4>
                                    <a class="btn anim" target="_blank" href="${portofolioColMobile.link}">Visit</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                    `;
                idTempMobile++;
                if (leftRightMobile == 'left') leftRightMobile = 'right';
                else leftRightMobile = 'left';
            }
            id++;
        }

        let portofolioContainer = document.querySelector('#portofolios > .content-section > .content-grid');
        portofolioContainer.innerHTML = elemSkill;

        let portofolioObjs = document.querySelectorAll('section > .content-section > .content-grid > .row > .col > .port-content');
        for (let portofolioObj of portofolioObjs) {
            let id = portofolioObj.getAttribute('id');
            portofolioObj.addEventListener("mouseover", function () {
                portofolioObj.style.opacity = '1';
                let anims = document.querySelectorAll(`#${id} .anim`);
                for (let anim of anims) {
                    anim.style.transform = 'scale(1)';
                }
                let decorPort = document.getElementById(`decor-${id}`);
                decorPort.setAttribute('hidden', true);
            });
            portofolioObj.addEventListener("mouseout", function () {
                portofolioObj.style.opacity = '0.6';
                let anims = document.querySelectorAll(`#${id} .anim`);
                for (let anim of anims) {
                    anim.style.transform = 'scale(0)';
                }
                let decorPort = document.getElementById(`decor-${id}`);
                decorPort.removeAttribute('hidden');
            });
        }
        let portofolioObjsDecor = document.querySelectorAll('section > .content-section > .content-grid > .row > .col > .port-decor');
        for (let portofolioObjDecor of portofolioObjsDecor) {
            portofolioObjDecor.addEventListener("mouseover", function () {
                portofolioObjDecor.setAttribute('hidden', true);
            });
        }

    });
}

function loadPublications() {
    loadJSON(`assets/json/publications_v${version}.json`, function (response) {
        let publications = JSON.parse(response);
        let elemSkill = '';
        for (let publication of publications) {
            elemSkill +=
                `
                <div class="content">
                    <h2>${publication.title}</h2>
                    <h3>${publication.subtitle}</h3>
                    <h4>
                        <a class="btn" target="_blank" href="${publication.link}">Visit</a>
                    </h4>
                </div>
                `;
        }
        let publicationContainer = document.querySelector('#publications > .content-section');
        publicationContainer.innerHTML = elemSkill;
    });
}

function loadCopyright() {
    let copyrightDate = document.querySelector('footer > p > span');
    copyrightDate.innerHTML = (new Date()).getFullYear();
}

// Load json

function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200")
            callback(xobj.responseText);
    };
    xobj.send(null);
}