cardsContainer = document.getElementById('cards-container')
// Products = JSON.parse(localStorage.getItem("Products"));

async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)

        console.log(respuesta)
        Products = respuesta.data.products
        console.log(respuesta.data)

        renderizarCard(Products)
        
    } catch (error) {
        console.log(error)
    }
}

cargarProductos();


function renderizarCard(listaProducts) {
    //iterar el array para acceder a cada producto
    cardsContainer.innerHTML = "";

    if (listaProducts.length === 0) {
        cardsContainer.innerHTML = `<h1 class="disabled">ERROR, NO SE ENCONTRARON PRODUCTOS</h1>`;
        return;
    }

    listaProducts.forEach((producto) => {
        let imageSrc = producto.image ? `/upload/product/${producto.image}` : '/assets/images/funciones-pagina/not-found.webp';

        // Buscar el índice correspondiente en la lista original usando el nombre del producto
        let index = Products.findIndex((p) => p.name === producto.name);

        const card = `                                          
                        <article class="card">
                            <div class="card__header">
                                <img src="${imageSrc}" alt="${producto.name}" class="card__img">
                            </div>
                            <div class="card__body">
                                <div class="card__title">
                                    ${producto.name}
                                </div>
                                <p class="card__description">
                                    ${producto.description}    
                                </p>
                                <div class="card__details">
                                    <div class="card__date">
                                        13/12/2022
                                    </div>
                                    <div class="card__price">
                                        $ ${producto.price}
                                    </div>
                                </div>
                            </div>
                            <div class="card__footer">
                            <div class="card__btn-container">
                                <a class="card__btn" href="/" onclick="addToCart(event, ${index})">
                                Comprar
                                </a>
                            </div>
                            <div class="card__btn-container">
                                <a class="card__btn" href="/product-detail?id=${index}">
                                Detalle
                                </a>
                            </div>
                            </div>
                        </article>`
        cardsContainer.innerHTML += card
    })
}

renderizarCard(Products)

async function searchProduct() {
    const respuesta = await axios.get(`${URL}/products`)
    var products = respuesta.data.products

    // console.log(respuesta.data.products)

    var searchTerm = document.getElementById('search-input').value;
    // var products = JSON.parse(localStorage.getItem('Products'));
    var foundProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    var productCountElement = document.getElementById('product-count');
    productCountElement.textContent = 'Se encontraron ' + foundProducts.length + ' productos';

    renderizarCard(foundProducts)
}



function addToCart(event, productId) {
    event.preventDefault();

    const product = Products[productId];

    // Buscar si el producto ya está en el carrito
    const index = Order.findIndex(item => item.name === product.name);

    if (index !== -1) { // Si el producto ya está en el carrito, aumentar su cantidad
        Order[index].quantity++;
    } else { // Si el producto no está en el carrito, agregarlo con cantidad 1
        const newProduct = {
            ...product,
            quantity: 1
        };
        Order.push(newProduct);
    }

    // Guardar el carrito actualizado en el localStorage
    sessionStorage.setItem("order", JSON.stringify(Order));
    console.log(Order);
    window.location.replace("/order-detail");
}



function deleteProduct(id) {
    const productName = Products[id].name;

    if (confirm(`¿Está seguro que desea borrar el producto ${productName}?`)) {
        Products.splice(id, 1);

        localStorage.setItem("Products", JSON.stringify(Products));

        // showAlert(`Elemento borrado correctamente.`);

        showAlert(`El elemento "${productName}" borrado correctamente`, 'success')

        renderizarTabla()
        return
    } else {
        showAlert(`Error al borrar el producto`, 'error');
        return; //es como poner return null, incluso se podria dejar sin el else, para que no haga nada
    }
}


function editProduct(id) {

    submitBtn.classList.add('edit-btn') //le agrega una clase al boton para que tome los estilos del css
    submitBtn.innerText = 'Modificar Producto' //va a cambiar lo que dice el boton

    let product = Products[id];
    console.table(product)
    const el = productForm.elements;
    el.name.value = product.name
    el.description.value = product.description
    el.price.value = product.price
    el.image.value = product.image

    editIndex = id; //esta declarado arriba de renderizarTabla y se hace para que podamos traernos el id del que estamos editando para mas tarde que se termine de modificar
}