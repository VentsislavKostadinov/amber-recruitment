function showNotification(text, userEmail) {

    let successLogin = document.getElementById('success-login');

    successLogin.innerHTML = `<div class="alert alert-success alert-dismissible" style="position: absolute; top: 100px; right: 20px;">
                  <a href="#" class="close" data-dismiss="alert"  aria-label="close">&times;</a>
                 ${text} ${userEmail}</div>`;

    let closeAlertLogin = document.querySelector('.alert');

    // close alert in 3 seconds
    setTimeout(() => {
        closeAlertLogin.style.display = 'none';
    }, 2000)

    // close alert manually pressing x
    closeAlertLogin.addEventListener('click', () => {
        closeAlertLogin.style.display = 'none';
    })
}

export default showNotification;
