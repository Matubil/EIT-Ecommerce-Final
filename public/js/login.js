//1- Obtener los datos del Formulario
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { email, password } = loginForm.elements;

    console.log(email.value, password.value)
    console.log(loginForm.elements)

    try {
        const dataBody = {
            email: email.value,
            password: password.value
        }
        const resp = await axios.post(`${URL}/login`, dataBody)

        const { token, user, msg } = resp.data; //clase 63 min 1:40 empieza uso de axios


        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user))

        showAlert(msg)
        setTimeout(() => {window.location.href = '/';}, 1500) //va a la home, si quisiesemos ir a una de las páginas en especial ahi si elegimos la ruta que queremos
    } catch (error) {
        console.log(error)
        showAlert('Error al hacel el Login', 'error')
    }

})
