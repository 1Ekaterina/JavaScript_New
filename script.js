
document.querySelector(".repl1").onclick = function () {
    const str1 = document.getElementById('text1').textContent;
    const regexp1 = new RegExp('\'', 'g');
    let newstr = str1.replace(regexp1, '"');
    document.getElementById('output').innerHTML = newstr;
}

document.querySelector(".repl2").onclick = function () {
    const str2 = document.getElementById('text2').textContent;
    const regexp2 = /\B'|'\B/g;
    let newstr = str2.replace(regexp2, '"');
    document.getElementById('output2').innerHTML = newstr;
}


function valideForm() {
    var regexp_name = /^[a-zа-яё]+$/gi,
        regexp_email = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
        regexp_phone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/,
        regexp_message = /[a-zа-яё0-9]/;

    let name = document.getElementsByName('name')[0].value,
        email = document.getElementsByName('email')[0].value,
        phone = document.getElementsByName('phone')[0].value,
        message = document.getElementsByName('message')[0].value;

    // имя
    if(regexp_name.test(name) === true) {
        document.getElementById('name').className = 'done_val';
    } else {
        document.getElementById('name').className = 'error_val';
    }
    // телефон
    if(regexp_phone.test(phone) === true) {
        document.getElementById('phone').className = 'done_val';
    } else {
        document.getElementById('phone').className = 'error_val';
    }
    // email
    if(regexp_email.test(email) === true) {
        document.getElementById('email').className = 'done_val';
    } else {
        document.getElementById('email').className = 'error_val';
    }
    // сообщение
    if(regexp_message.test(message) === true) {
        document.getElementById('message').className = 'done_val';
    } else {
        document.getElementById('message').className = 'error_val';
    }
}
document.querySelector('.button').addEventListener("click", valideForm);