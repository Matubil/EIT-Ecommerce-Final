const registerForm = document.querySelector('#register');
console.log(registerForm)
const registerBtn = document.getElementById('registerSubmit');

registerForm.addEventListener('submit', async (event) => {
    try {
        console.log('Submit event')
        event.preventDefault();
        const el = event.target.elements
        console.log(el)

        if (el.password1.value !== el.password2.value) {
            showAlert(`El password no coincide`, 'warning')
            return
        }

        console.log(el.age.value, "elemento age valor") 
        console.log(el.date.value, "elemento age") 

        const user = {
            fullname: el.name.value.toLowerCase(),
            email: el.email.value,
            password: el.password1.value,
            age: el.age.value,
            date: el.date.value
        }
        console.log(user.age, "user age") 
        try {
            const response = await axios.post(`${URL}/users`, user);
            Users = response.data.user;
    
            console.log(Users)
            showAlert('El usuario se registro correctamente', 'success')
    
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500)
        } catch(error) {
            showAlert('Error al registrar el usuario', 'error')
        }       
    } catch (error) {
        console.log(error)
    }
})


function checkIfUserExist(users, emailToSearch) {

    const userExist = users.find(user => {

        if (user.email === emailToSearch) {
            return true;
        }
        return false; //no es necesario poner esta linea ya que si no lo ponemos, va a retornar undefined y esto es = a false
    })

    if (userExist) {
        console.warn(`El usuario ya existe`)
        return true
    }

}

