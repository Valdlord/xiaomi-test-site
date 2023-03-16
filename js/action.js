"use strict";
// (function () {


// slider-top start
const swiperTop = new Swiper('.slider-swiper-top', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    mousewheel: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
// slider-top end

// slider-bottom start
const swiperBottom = new Swiper('.slider-swiper-bottom', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    mousewheel: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
// slider-bottom end

const btnRadioGrey = document.querySelector('.radio-grey');
const btnRadioWhite = document.querySelector('.radio-white');
const btnRadioRed = document.querySelector('.radio-red');

const imageBicycleGrey = document.querySelector('.order-wrap-image__item_gray');
const imageBicycleWhite = document.querySelector('.order-wrap-image__item_white');
const imageBicycleRed = document.querySelector('.order-wrap-image__item_red');

btnRadioGrey.addEventListener('click', function () {
    imageBicycleGrey.style.display = 'block';
    imageBicycleWhite.style.display = 'none';
    imageBicycleRed.style.display = 'none';
});

btnRadioWhite.addEventListener('click', function () {
    imageBicycleGrey.style.display = 'none';
    imageBicycleWhite.style.display = 'block';
    imageBicycleRed.style.display = 'none';
});

btnRadioRed.addEventListener('click', function () {
    imageBicycleGrey.style.display = 'none';
    imageBicycleWhite.style.display = 'none';
    imageBicycleRed.style.display = 'block';
});

// modal window start
const btnForm = document.querySelector('.btn-form');
const popupFade = document.querySelector('.popup-fade');
const popupClose = document.querySelector('.popup-close');
const errorName = document.querySelector('.error-name');
const errorPhone = document.querySelector('.error-phone');

btnForm.addEventListener('click', function () {
    errorName.style.display = 'none';
    errorPhone.style.display = 'none';
    let error = false;
    let name = document.querySelector('input[name="name"]').value;
    let phone = document.querySelector('input[name="phone"]').value;

    if (!/^[а-яА-Яa-zA-Z]{2,30}$/.test(name)) {
        showError('name');
        error = true;
    }

    if (!/^((\+7|7|8)+([0-9]){10})$/.test(phone)) {
        showError('phone');
        error = true;
    }

    if (!error) {
        fetch(
            'send.php', {
                method: 'POST',
                body: JSON.stringify({name: name, phone: phone}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (result) => result.json()
        ).then(
            (result) => {
                if (result.success) {
                    // alert("Успешно");
                    popupFade.style.display = 'block';
                    document.querySelector('input[name="name"]').value = '';
                    document.querySelector('input[name="phone"]').value = '';
                } else {
                    if (result.error === 'name') {
                        showError('name');
                    } else {
                        showError('phone');
                    }
                }
            }
        );
    }
});

function showError(fieldName) {
    let errorText = document.querySelector('.error-' + fieldName);
    errorText.style.display = 'block';
}

popupClose.addEventListener('click', function () {
    popupFade.style.display = 'none';
});
popupFade.addEventListener('click', function (event) {
    if (event.target === popupFade) {
        popupFade.style.display = 'none';
    }
});
document.addEventListener('keydown', function (event) {
    if (event.code === "Escape") {
        popupFade.style.display = 'none';
    }
});
// modal window end

// btn up start
const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        // удалим у кнопки класс btn-up_hide
        this.el.classList.remove('btn-up-hide');
    },
    hide() {
        // добавим к кнопке класс btn-up-hide
        this.el.classList.add('btn-up-hide');
    },
    addEventListener() {
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
            scrollY > 400 ? this.show() : this.hide();
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

btnUp.addEventListener();
// btn up end

// })();