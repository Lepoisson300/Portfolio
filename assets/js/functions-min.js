// Retained necessary functions only

// Add this at the top of your file
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
let currentLanguage = "English";

function toggleLanguage() {
    const translations = {


        English: {
            H3atouts2: "Kind & Altruistic",
            H1Titre: "Rémi Puigsech <br> Here begins innovation </br>",
            sldH:"Home",
            sldI:"Introduction",
            sldP:"Projects",
            sldC:"Contact",
            H3atouts1:"Innovative &amp; Relentless",
            pAtouts1:"Discover all completed projects, personal and academic.",
            pAtouts2: "Discover my passions and who I am.",
            H3atouts3: "Reachable",
            pAtouts3: "Check out my pages and links to resources associated with me.",
            aboutTitle: "Musician<br>Worker<br>Athlete<br>Adventurer",
            activities: "Activities",
            services: "Services",
            discoveries: "Discoveries",
            projectsTitle: "Selected Projects",
            contactTitle: "Contact Me",
            contactDesc: "If you have any questions or would like to collaborate, feel free to reach out!",
            pdfLinks: {
                parcours: "assets/pdf/parcours.pdf",
                activities: "assets/pdf/Activités.pdf",
                services: "assets/pdf/Prestations.pdf",
                discoveries: "assets/pdf/découvertes.pdf",
                cvFrench: "assets/pdf/CVfrancais.pdf",
                cvEnglish: "assets/pdf/CVenglais.pdf",
            },
            buttonLabel: "English",
        },
        Français: {
            H3atouts2: "A l'écoute & Altruiste",
            H1Titre: "Rémi Puigsech <br> Ici commence l'innovation </br>",
            sldH:"Accueil",
            sldI:"Introduction",
            sldP:"Projets",
            sldC:"Contact",
            H3atouts1:"Innovant &amp; Tenace",
            pAtouts1:"Découvrez tous les projets réalisés, personnels et académiques.",
            pAtouts2: "Découvrez mes passions et qui je suis.",
            H3atouts3: "Accessible",
            pAtouts3: "Consultez mes pages et liens vers des ressources associées à moi.",
            aboutTitle: "Musicien<br>Travailleur<br>Athlète<br>Aventurier",
            activities: "Activités",
            services: "Prestations",
            discoveries: "Découvertes",
            projectsTitle: "Projets Sélectionnés",
            contactTitle: "Contactez-moi",
            contactDesc: "Si vous avez des questions ou souhaitez collaborer, n'hésitez pas à me contacter!",
            pdfLinks: {
                parcours: "assets/pdf/parcours_FR.pdf",
                activities: "assets/pdf/Activités_FR.pdf",
                services: "assets/pdf/Prestations_FR.pdf",
                discoveries: "assets/pdf/découvertes_FR.pdf",
                cvFrench: "assets/pdf/CVfrancais_FR.pdf",
                cvEnglish: "assets/pdf/CVenglais_FR.pdf",
            },
            buttonLabel: "Français",
        },
    };

    // Toggle language
    currentLanguage = currentLanguage === "English" ? "Français" : "English";
    const lang = translations[currentLanguage];

    // Update text content
    document.getElementById("H3atouts1").innerHTML = lang.H3atouts1;
    document.getElementById("pAtouts1").innerHTML = lang.pAtouts1;
    
    document.getElementById("H3atouts2").innerHTML = lang.H3atouts2;
    document.getElementById("pAtouts2").innerText = lang.pAtouts2;

    document.getElementById("H3atouts3").innerHTML = lang.H3atouts3;
    document.getElementById("pAtouts3").innerHTML = lang.pAtouts3;
    
    document.getElementById("H1Titre").innerHTML = lang.H1Titre;
    document.getElementById("sldH").innerText = lang.sldH;
    document.getElementById("sldI").innerText = lang.sldI;
    document.getElementById("sldP").innerText = lang.sldP;
    document.getElementById("sldC").innerText = lang.sldC;

    const reachableSection = document.querySelector('a[href="#0"]');
    reachableSection.querySelector("h3").innerHTML = lang.reachableTitle;
    reachableSection.querySelector("p").innerText = lang.reachableDescription;

    document.querySelector(".about--banner h2").innerHTML = lang.aboutTitle;
    document.querySelector(".about--options a:nth-child(1) h3").innerHTML = lang.activities;
    document.querySelector(".about--options a:nth-child(2) h3").innerHTML = lang.services;
    document.querySelector(".about--options a:nth-child(3) h3").innerHTML = lang.discoveries;

    document.querySelector(".work h2").innerHTML = lang.projectsTitle;

    document.querySelector(".contact-container h2").innerHTML = lang.contactTitle;
    document.querySelector(".contact-container p").innerText = lang.contactDesc;

    // Update PDF links
    document.querySelector('a[href="assets/pdf/parcours.pdf"]').setAttribute("href", lang.pdfLinks.parcours);
    document.querySelector('.about--options a:nth-child(1)').setAttribute("href", lang.pdfLinks.activities);
    document.querySelector('.about--options a:nth-child(2)').setAttribute("href", lang.pdfLinks.services);
    document.querySelector('.about--options a:nth-child(3)').setAttribute("href", lang.pdfLinks.discoveries);
    document.querySelector('.contact-btn[href="assets/pdf/CVfrancais.pdf"]').setAttribute("href", lang.pdfLinks.cvFrench);
    document.querySelector('.contact-btn[href="assets/pdf/CVenglais.pdf"]').setAttribute("href", lang.pdfLinks.cvEnglish);

    // Update button text
    document.getElementById("languageSwitch").innerText = lang.buttonLabel;
}


function updateNavs(nextPos) {
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');
}

function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
        $('.main-content .section').children().removeClass('section--next section--prev');
    } else if (curPos < nextPos) {
        $('.main-content').children().eq(curPos).children().addClass('section--next');
    } else {
        $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
        $('.header--cta').addClass('is-active');
    } else {
        $('.header--cta').removeClass('is-active');
    }
}

function outerNav() {
    $('.header--nav-toggle').click(function() {
        $('.perspective').addClass('perspective--modalview');
        setTimeout(function() {
            $('.perspective').addClass('effect-rotate-left--animate');
        }, 25);
        $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
    });

    $('.outer-nav--return, .outer-nav li').click(function() {
        $('.perspective').removeClass('effect-rotate-left--animate');
        setTimeout(function() {
            $('.perspective').removeClass('perspective--modalview');
        }, 400);
        $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
    });
}

function workSlider() {
    $('.slider--prev, .slider--next').click(function() {
        var $this = $(this),
            curLeft = $('.slider').find('.slider--item-left'),
            curLeftPos = $('.slider').children().index(curLeft),
            curCenter = $('.slider').find('.slider--item-center'),
            curCenterPos = $('.slider').children().index(curCenter),
            curRight = $('.slider').find('.slider--item-right'),
            curRightPos = $('.slider').children().index(curRight),
            totalWorks = $('.slider').children().length,
            $left = $('.slider--item-left'),
            $center = $('.slider--item-center'),
            $right = $('.slider--item-right'),
            $item = $('.slider--item');

        $('.slider').animate({ opacity : 0 }, 400);

        setTimeout(function() {
            if ($this.hasClass('slider--next')) {
                if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
                    $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                    $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                    $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                } else {
                    if (curLeftPos === totalWorks - 1) {
                        $item.removeClass('slider--item-left').first().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                    } else if (curCenterPos === totalWorks - 1) {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                        $item.removeClass('slider--item-center').first().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                    } else {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                        $item.removeClass('slider--item-right').first().addClass('slider--item-right');
                    }
                }
            } else {
                if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
                    $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                    $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                    $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                } else {
                    if (curLeftPos === 0) {
                        $item.removeClass('slider--item-left').last().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                    } else if (curCenterPos === 0) {
                        $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                        $item.removeClass('slider--item-center').last().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                    } else {
                        $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                        $item.removeClass('slider--item-right').last().addClass('slider--item-right');
                    }
                }
            }
        }, 400);

        $('.slider').animate({ opacity : 1 }, 400);
    });
}

function transitionLabels() {
    $('.work-request--information input').focusout(function() {
        var textVal = $(this).val();

        if (textVal === "") {
            $(this).removeClass('has-value');
        } else {
            $(this).addClass('has-value');
        }

        // correct mobile device window position
        window.scrollTo(0, 0);
    });
}

$('.side-nav li, .outer-nav li').click(function() {
    if (!$(this).hasClass('is-active')) {
        var $this = $(this),
            curActive = $this.parent().find('.is-active'),
            curPos = $this.parent().children().index(curActive),
            nextPos = $this.parent().children().index($this),
            lastItem = $this.parent().children().length - 1;

        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
    }
});

$(document).keyup(function(e) {
    if (!($('.outer-nav').hasClass('is-vis'))) {
        e.preventDefault();
        updateHelper(e);
    }
});



let lastScrollTime = Date.now();
const scrollCooldown = 1000; // Adjust this value to control scroll frequency (in milliseconds)

$(this).on('mousewheel DOMMouseScroll', function(e) {
    if (!$('.outer-nav').hasClass('is-vis')) {
        e.preventDefault();
        
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < scrollCooldown) {
            return; // Ignore scroll if not enough time has passed
        }
        
        // Update last scroll time
        lastScrollTime = currentTime;
        
        // Get scroll direction with reduced sensitivity
        const delta = e.originalEvent.wheelDelta ? -e.originalEvent.wheelDelta : e.originalEvent.detail;
        // Reduce the sensitivity by requiring a larger scroll
        if (Math.abs(delta) > 10) { // Adjust this threshold to change sensitivity
            // Debounce the updateHelper call
            debounce(function() {
                updateHelper(delta);
            }, 50)(); // 50ms delay, adjust as needed
        }
    }
});

// Update the Hammer configuration
var targetElement = document.getElementById('viewport'),
    mc = new Hammer(targetElement);

// Enable both vertical and horizontal swipes
mc.get('swipe').set({ 
    direction: Hammer.DIRECTION_ALL,
    threshold: 50,          // Minimum distance required before recognizing
    velocity: 0.3,          // Minimum velocity required before recognizing
    touchAction: 'pan-y'    // Allow native vertical scrolling
});

// Add touch action style to viewport
document.getElementById('viewport').style.touchAction = 'pan-y';


// Add these variables at the top of your file
let touchStartY = 0;
let isScrolling = false;
let lastSwipeTime = Date.now();

// Add touch event listeners
targetElement.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    isScrolling = false;
});

targetElement.addEventListener('touchmove', function(e) {
    if (isScrolling) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    
    // Check if it's a deliberate swipe
    if (Math.abs(deltaY) > 50) {
        isScrolling = true;
        const currentTime = Date.now();
        
        // Add cooldown to prevent rapid scrolling
        if (currentTime - lastSwipeTime > 1000) { // 1 second cooldown
            lastSwipeTime = currentTime;
            updateHelper(deltaY > 0 ? 1 : -1);
        }
    }
});

// Update the Hammer swipe handler
mc.on('swipe', function(e) {
    const currentTime = Date.now();
    
    // Only handle swipe if enough time has passed since last swipe
    if (currentTime - lastSwipeTime > 1000) {
        lastSwipeTime = currentTime;
        
        if (e.direction === Hammer.DIRECTION_UP) {
            updateHelper(1);
        } else if (e.direction === Hammer.DIRECTION_DOWN) {
            updateHelper(-1);
        }
    }
});

function updateHelper(e) {
    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (typeof e === 'number') {
        nextPos = e > 0 ? (curPos === lastItem ? 0 : curPos + 1) : (curPos === 0 ? lastItem : curPos - 1);
    } else if (e.type === "keyup" && (e.keyCode === 40 || e.keyCode === 38)) {
        if (e.keyCode === 40) { // down arrow
            nextPos = curPos === lastItem ? 0 : curPos + 1;
        } else if (e.keyCode === 38) { // up arrow
            nextPos = curPos === 0 ? lastItem : curPos - 1;
        }
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnEnglish').addEventListener('click', function() {
        translate('en');
    });

    document.getElementById('btnFrench').addEventListener('click', function() {
        translate('fr');
    });

    document.getElementById('languageSwitch').addEventListener('click', toggleLanguage);
});

outerNav();
workSlider();
transitionLabels();