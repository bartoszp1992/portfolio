function start() {
    var height = innerHeight; //pobierz wysokość okna
    var width = innerWidth;
    var scrollTo = document.querySelector(".tray").offsetTop - 60;

    var headerTop = document.querySelector('header').offsetTop;

    setTimeout(function () {
        $('body').removeClass('bodyHidden');
    }, 500);

    //zainicjuj funkcję wypełniającą nagłówek
    var filling = function () {

        var scrollY = window.scrollY;


        if (scrollY > scrollTo) {
            document.querySelector('header').classList.add('filled');
        } else {
            document.querySelector('header').classList.remove('filled');
        };
    }

    function smoothShow() {

        var elements = document.querySelectorAll('.h');
        var keyPoint = height / 2 * 2;
        for (i = 0; i < elements.length; i++) {
            (function (e) {
                var elementPosition = $(elements[i]).offset().top - scrollY;
                setTimeout(function () {
                    if (elementPosition < keyPoint) {
                        $(elements[e]).removeClass('hidden');
                    } else {
                        $(elements[e]).addClass('hidden');
                    };
                }, e * 30);
            })(i);
        };
    };

    function parallax(s) {
        setTimeout(function () {
            $('body').css('background-position', '0px' + " -" + s / 4 + "px");
            var ps = document.querySelectorAll('.parallax')
            var itemCounter = ps.length;
            for (i = 0; i < itemCounter; i++) {
                var p = $(ps[i]).offset().top;
                var q = s - p;
                if (q < 0) {
                    q = q - (q * 2);
                    $(ps[i]).css('background-position', '0px' + " " + q / 5 + "px");

                } else {
                    $(ps[i]).css('background-position', '0px' + " -" + q / 5 + "px");
                }
            }
        }, 10);
    };


    //kiedy okno jest przesuwane
    window.addEventListener('scroll', function () {
        if (width > 890) {
            parallax(scrollY);
            smoothShow();
        }
        filling(); //wypełnij nagłówek, jeżeli przesunięcie jest odpowiednie

    });
};

window.onload = start;

//zainicjuj funkcję przewijania do określonego punktu strony
function directScroll(selector) {
    var sectionTop = selector.offsetTop - 52;

    $("html,body").animate({
        scrollTop: sectionTop
    }, 500);

    setTimeout(function () {
        closeMenu();
    }, 600);
}

//OBSŁUGA PRZYCISKU MENU

//przy wciśnięciu:
$('#menuM').click(function () {

    for (i = 0; i < 7; i++) {
        (function (e) {
            var elementClass = ".o" + e;
            setTimeout(function () {
                $(elementClass).removeClass('anim');
            }, e * 50);
        })(i);
    }

    setTimeout(function () {
        $('header').addClass('filledOnDrawer'); //przyciemnij nagłówek
        $('#menuM').removeClass('visible'); //schowaj menu
        $('#closeM').addClass('visible'); //pokaż close
    }, 400);
});

//przy zamknięciu(funkcja wywołana też wyżej, przy directScroll)

function closeMenu() {

    for (i = 1; i < 7; i++) {
        (function (e) {
            var elementClass = ".o" + e;
            setTimeout(function () {
                $(elementClass).addClass('anim');
            }, e * 50);
        })(i);
    }

    setTimeout(function () {
        $('.menu').addClass('anim');
    }, 400);

    setTimeout(function () {
        $('header').removeClass('filledOnDrawer');
        $('#menuM').addClass('visible');
        $('#closeM').removeClass('visible');
    }, 400);
}

$('#closeM').click(function () {
    closeMenu();
});