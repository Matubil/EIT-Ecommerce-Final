const user = JSON.parse(localStorage.getItem("currentUser"))
const orderTable = document.getElementById('order-profile-body')
const btnChangePassword = document.getElementById('btn-psw');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
// const user = JSON.parse(localStorage.getItem("currentUser"));
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
// const password1Input = document.getElementById("password1");
// const password2Input = document.getElementById("password2");
const ageInput = document.getElementById("age");
const dateInput = document.getElementById("date");



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

nameInput.value = user.fullname; // Reemplaza "name" con la propiedad correspondiente en el objeto del usuario
emailInput.value = user.email; // Reemplaza "email" con la propiedad correspondiente en el objeto del usuario
// password1Input.value = user.password; // Reemplaza "password" con la propiedad correspondiente en el objeto del usuario
// password2Input.value = user.password; // Reemplaza "password" con la propiedad correspondiente en el objeto del usuario
ageInput.value = user.age; // Reemplaza "age" con la propiedad correspondiente en el objeto del usuario
dateInput.value = formatDate(user.date); // Reemplaza "dateOfBirth" con la propiedad correspondiente en el objeto del usuario


// async function renderizarBtn(id){
//     btnChangePassword.innerHTML = `<button class="product__action-btn btn-edit" id="btn-change-password" onclick="editPass(${id})">Cambiar Contraseña</button>`    
// }

// renderizarBtn(user._id)

async function getAllOrders(){
    try {
        const token = localStorage.getItem('token');

        respuesta = await axios.get(`${URL}/orders`,{
            headers: {
                Authorization: token
            }
        });  

        Orders = respuesta.data.orders

        renderizarTabla(Orders)
        
    } catch (error) {
        console.log(error)
    }
}

console.log(user._id)

async function getAllOrdersByUser(id){
    try {
        const token = localStorage.getItem('token');
        // router.get('/orders/:idUser/user', ordersController.getUserOrders)

        respuesta = await axios.get(`${URL}/orders/${id}/user`,{
            headers: {
                Authorization: token
            }
        });  

        Orders = respuesta.data.orders

        renderizarTabla(Orders)
        
    } catch (error) {
        console.log(error)
    }
}


if(user.role === "ADMIN_ROLE"){
    //renderizar los datos de la persona + las ordenes de todos los usuarios
    getAllOrders()
}else{
    //renderizar los datos de la persona + las ordenes de la persona
    getAllOrdersByUser(user._id)
}


async function renderizarTabla(Orders){
    try {
        //iterar el array para acceder a cada producto
    orderTable.innerHTML = ""; //lo que hace esto o para lo que está es para que cada vez que se cargue la funcion, se borre toda la tabla

    async function getProductNameById(id) {
        try {
            const respuesta = await axios.get(`${URL}/product/${id}`);
            const product = respuesta.data.product;
            return product.name;
        } catch (error) {
            console.log(error);
        }
    }

    Orders.forEach(async (orden, index) => {
        const products = await Promise.all(orden.products.map(async (producto) => {
            const productName = await getProductNameById(producto._id);
            return `${productName} x${producto.quantity}`;
        }));

        let actionsHtml = "";

            if (user.role === "ADMIN_ROLE") {
                actionsHtml = `
                    <button class="product__action-btn btn-edit" onclick="editUser('${orden._id}')">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                `;
            }
            
        const tableRow = `
                            <tr class="product">
                                <td class= "product__name">
                                    ${orden.userId._id}
                                </td>
                                <td class= "product__name">
                                    ${orden.userId.email}
                                </td>
                                <td class= "product__desc">
                                    ${orden._id}    
                                </td>
                                <td class= "product__price">
                                    ${products.join(", ")}
                                </td>
                                <td class= "product__price">
                                    $${orden.total}
                                </td>
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteOrder('${orden._id}')"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    ${actionsHtml}
                                </td>
                            </tr>`
                            orderTable.innerHTML += tableRow

    })
    } catch(error) {
        console.log(error);
    }
    
}


async function deleteOrder(id) {
    try {
        // if (confirm(`¿Está seguro que desea borrar el producto ${productName}?`)) {
        if (confirm(`¿Está seguro que desea borrar el producto?`)) {
            // console.log(id)
            // const token = localStorage.getItem('token');
            //borrar usuario
            response = await axios.delete(`${URL}/orders/${id}`);

            // showAlert(`El elemento "${productName}" borrado correctamente`, 'success')
            showAlert(`La orden ha sido borrado correctamente`, 'success')

            getAllOrders()

            //aunque creo que deberia de obtener los productos que quedaron y ahi renderizar tabla mandandole una constante productos

            // showAlert(`Elemento borrado correctamente.`);
            return
        } else {
            showAlert(`Error al borrar la orden`, 'error');
            return; //es como poner return null, incluso se podria dejar sin el else, para que no haga nada
        }
    } catch (error) {
        console.log(error)
    }

}

async function editOrder(id){
    try {
        // if (confirm(`¿Está seguro que desea borrar el producto ${productName}?`)) {
        if (confirm(`¿Está seguro que desea actualizar la contraseña?`)) {
            console.log(password1)
            console.log(password2)
            if (password1 !== password2) {
                showAlert(`El password no coincide`, 'warning')
                return
            }
            // console.log(id)
            // const token = localStorage.getItem('token');
            //borrar usuario
            response = await axios.put(`${URL}/users/${id}/${password1}`);

            // showAlert(`El elemento "${productName}" borrado correctamente`, 'success')
            showAlert(`El usuario ha sido actualizado correctamente`, 'success')

            getAllOrders()

            //aunque creo que deberia de obtener los productos que quedaron y ahi renderizar tabla mandandole una constante productos

            // showAlert(`Elemento borrado correctamente.`);
            return
        } else {
            showAlert(`Error al editar el usuario`, 'error');
            return; //es como poner return null, incluso se podria dejar sin el else, para que no haga nada
        }
    } catch (error) {
        console.log(error)
    }
}