
let pswInput = document.getElementById('password1');
let pswInput2 = document.getElementById('password2');

const userForm = document.getElementById('add-product')//Se puede escuchar eventos sin necesidad de poner el onsubmit en el html, siempre que los almacene en una variable, en el html voy a dejar eso escrito como deberia de estar y como está ahora es como dejó explicado el profesor *2

userForm.addEventListener('click', () => {
    console.dir(userForm.dataset) //un dataset es un conjunto de propiedad que yo puedo definir y puedo leer sobre mi HTML la propiedad custom
})

const submitBtn = document.getElementById('submit-btn')

//Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.getElementById('table-body')


async function getUsers() {
    try {
        const token = localStorage.getItem('token');

        respuesta = await axios.get(`${URL}/users`, {
            headers: {
                Authorization: token
            }
        });

        Users = respuesta.data.users

        renderizarTabla(Users)

    } catch (error) {
        console.log(error)
    }
}
getUsers()


async function getUser(id) {
    try {
        const token = localStorage.getItem('token');

        respuesta = await axios.get(`${URL}/users/${id}`, {
            headers: {
                Authorization: token
            }
        });

        User = respuesta.data.users

        return User

    } catch (error) {
        console.log(error)
    }
}
getUser()

let editIndex;

function renderizarTabla(Users) {
    //iterar el array para acceder a cada producto
    tableBody.innerHTML = ""; //lo que hace esto o para lo que está es para que cada vez que se cargue la funcion, se borre toda la tabla

    if (Users.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON USUARIOS</td></tr>`; //colspan es para que ocupe hasta cierta cantidad de columnas

        return
    }
    Users.forEach((usuario, index) => {
        console.log(usuario._id)

        const tableRow = `
                            <tr class="product">
                                <td class= "product__name">
                                    ${usuario.fullname}
                                </td>
                                <td class= "product__desc">
                                    ${usuario.email}    
                                </td>
                                <td class= "product__price">
                                    ${usuario.password}
                                </td>
                                <td class= "product__price">
                                    ${formatDateArg(usuario.date)}
                                </td>
                                <td class= "product__price">
                                    ${usuario.age}
                                </td>
                                <td class= "product__price">
                                    ${usuario.role}
                                </td>
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteUser('${usuario._id}')"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editUser('${usuario._id}')">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                </td>
                            </tr>`
        tableBody.innerHTML += tableRow

    })
}

renderizarTabla(Users)


async function addUser(evt) {
    try {
        evt.preventDefault(); //esto se pone porque la pagina se vive recargando, entonces se pone eso para que no se recargue la pagina

        const elements = evt.target.elements

        const newUser = {
            fullname: elements.fullname.value.toLowerCase(),
            email: elements.email.value,
            role: elements.role.value,
            date: elements.date.value,
            password: elements.password1.value,
            age: elements.age.value
        };

        const token = localStorage.getItem('token');


        const newFormData = new FormData(evt.target);
        const newUserFormData = Object.fromEntries(newFormData); //aca ya tengo el objeto ya armado

        if (editIndex) {
            const response = await axios.put(`${URL}/users/${editIndex}`, newUserFormData, {
                headers: {
                    Authorization: token
                }
            })
            if (!response) {
                showAlert('No se pudo modificar el Usuario', 'error')
            }
            else {
                showAlert('El usuario fue modificado', 'exito')
            }
        } else {
            const response = await axios.post(`${URL}/users`, newUser);
            if (!response) {
                showAlert('No se pudo agregar el Usuario', 'error')
            } else {
                showAlert('El usuario se Agrego Correctamente', 'exito')
            }
        }
        editIndex = undefined

        submitBtn.classList.remove('edit-btn')

        submitBtn.innerText = 'Cargar usuario'

        getUsers()


        evt.target.reset() //resetea a la altura del form para que siga cargando

        elements.fullname.focus(); //esta tambien le deja el focus del puntero ahi en el elemento name de la tabla
    } catch (error) {
        console.log(error)
    }
}



async function deleteUser(id) {
    try {
        if (confirm(`¿Está seguro que desea borrar este usuario?`)) {
            const token = localStorage.getItem('token');
            //borrar usuario
            response = await axios.delete(`${URL}/users/${id}`, {
                headers: {
                    Authorization: token
                }
            });

            showAlert('El Usuario ha sido borrado correctamente.', 'success');

            getUsers()
            return
        } else {
            showAlert(`Error al borrar el usuario`, 'error');
            return; //es como poner return null, incluso se podria dejar sin el else, para que no haga nada
        }
    } catch (error) {
        console.log(error)
    }

}


async function editUser(id) {
    try {
        submitBtn.classList.add('edit-btn') //le agrega una clase al boton para que tome los estilos del css
        submitBtn.innerText = 'Modificar usuario' //va a cambiar lo que dice el boton

        const token = localStorage.getItem('token');
        response = await axios.get(`${URL}/users/${id}`, {
            headers: {
                Authorization: token
            }
        });

        const user = response.data.user;
        const el = userForm.elements;

        el.fullname.value = user.fullname
        el.email.value = user.email
        pswInput.required = false
        pswInput2.required = false
        el.age.value = user.age
        el.role.value = user.role
        el.date.value = formatDate(user.date);


        editIndex = id; 
    } catch (error) {

    }

}


//da forma a la fecha
function formatDateArg(fechaMongoDB) {
    // Obtener los componentes de la fecha
    var dia = fechaMongoDB.substring(8, 10);
    // Los meses comienzan en 0, por lo que se suma 1
    var mes = fechaMongoDB.substring(5, 7);
    var anio = fechaMongoDB.substring(0, 4);
    // Formatear la fecha y la retorno
    return fechaFormateada = dia + "/" + mes + "/" + anio;
}

//formatea la fecha devuelta por mongo db
function formatDate(fechaMongoDB) {
    // Obtener los componentes de la fecha
    var dia = fechaMongoDB.substring(8, 10);
    // Los meses comienzan en 0, por lo que se suma 1
    var mes = fechaMongoDB.substring(5, 7);
    var anio = fechaMongoDB.substring(0, 4);
    // Formatear la fecha y la retorno
    return fechaFormateada = anio + "-" + mes + "-" + dia;
}