const productForm = document.getElementById('add-product')

productForm.addEventListener('click', () => {
    console.dir(productForm.dataset)
})

const submitBtn = document.getElementById('submit-btn')

const tableBody = document.getElementById('table-body')

async function cargarProductos() {
    try {
        const respuesta = await axios.get(`${URL}/products`)

        console.log(respuesta)
        Products = respuesta.data.products
        console.log(respuesta.data)

        renderizarTabla(Products)

    } catch (error) {
        console.log(error)
    }
}
cargarProductos()
let editIndex;

function renderizarTabla(arrayProducts) {
    tableBody.innerHTML = "";
    console.log(arrayProducts)
    if (arrayProducts.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`;

        return
    }
    arrayProducts.forEach((producto, index) => {
        let imageSrc = producto.image ? `/upload/product/${producto.image}` : '/public/assets/images/funciones-pagina/not-found.webp'; //clase 66 min 1:55:30

        const tableRow = `
                            <tr class="product">
                                <td class="product__img-cell">
                                    <img class= "product__img" src="${imageSrc}" width="120px" alt="${producto.name}">                    
                                </td>
                                <td class= "product__name">
                                    ${producto.name}
                                </td>
                                <td class= "product__desc">
                                    ${producto.description}    
                                </td>
                                <td class= "product__price">
                                    $ ${producto.price.toFixed(2)}
                                </td>
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteProduct('${producto._id}')"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editProduct('${producto._id}')">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                </td>
                            </tr>`
        tableBody.innerHTML += tableRow


    })
}

renderizarTabla()

token = localStorage.getItem('token')

async function addProduct(evt) {
    try {
        evt.preventDefault(); //esto se pone porque la pagina se vive recargando, entonces se pone eso para que no se recargue la pagina
        console.dir(evt.target); //puedo ver las cosas que trae por defecto ese evento
        console.log(evt.target);


        const formFile = new FormData(evt.target);  //Clase 66 min 2:11:00
        const obj = Object.fromEntries(formFile); //aca ya tengo el objeto ya armado


        if (editIndex) {
            const response = await axios.put(`${URL}/product/${editIndex}`, obj, {
                headers: {
                    Authorization: token,
                    'content-type': 'multipart/form-data'
                }
            })
            if (!response) {
                showAlert('No se pudo modificar el producto', 'error')
                return
            }
            else {
                showAlert('El producto fue modificado', 'exito')
                cargarProductos()
                return
            }
        } else {
            const {data } = await axios.post(`${URL}/product`, formFile, {
                headers: {
                    Authorization: token
                }
            })
            if (!response) {
                showAlert('No se pudo agregar el producto', 'error')
                cargarProductos()
                return
            } else {
                showAlert('El producto se agrego correctamente', 'exito')
                cargarProductos()
                return data
            }
        }

        
    } catch (error) {
        console.log(error)
    }
}



async function deleteProduct(id) {
    try {
        if (confirm(`¿Está seguro que desea borrar el producto?`)) {

            const token = localStorage.getItem('token');
            //borrar usuario
            response = await axios.delete(`${URL}/product/${id}`, {
                headers: {
                    Authorization: token
                }
            });

            // showAlert(`El elemento "${productName}" borrado correctamente`, 'success')
            showAlert(`El elemento ha sido borrado correctamente`, 'success')

            cargarProductos()
            return
        } else {
            showAlert(`Error al borrar el producto`, 'error');
            return; //es como poner return null, incluso se podria dejar sin el else, para que no haga nada
        }
    } catch (error) {
        console.log(error)
    }

}


async function editProduct(id) {
    try {
        submitBtn.classList.add('edit-btn') //le agrega una clase al boton para que tome los estilos del css
        submitBtn.innerText = 'Modificar Producto' //va a cambiar lo que dice el boton

        const token = localStorage.getItem('token');
        response = await axios.get(`${URL}/product/${id}`, {
            headers: {
                Authorization: token
            }
        });

        // console.log(el)


        const product = response.data.product;
        console.log(productForm)
        console.log(productForm.elements)
        const el = productForm.elements;
        console.log(el.name)

        console.table(product)
        console.log('estamos dentro de editar')
        el.name.value = product.name
        el.description.value = product.description
        el.price.value = product.price
        console.log(product.image)
        console.log(el.image)

        console.log('estamos dentro de editar')

        editIndex = id; //esta declarado arriba de renderizarTabla y se hace para que podamos traernos el id del que estamos editando para mas tarde que se termine de modificar
    } catch (error) {
        console.log(error);
    }

}
