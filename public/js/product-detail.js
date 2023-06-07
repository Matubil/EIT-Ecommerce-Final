const params = location.search

console.log(params)
const paramsUrl = new URLSearchParams(params)

const paramsEntries = Object.fromEntries(paramsUrl)

console.log(paramsEntries)

const id = paramsEntries['id'];

// console.log(Products, "products en detail")
const mainDetail = document.getElementById('main-detail')

async function obtenerProductos() {
    try {
        const respuesta = await axios.get(`${URL}/products`);
        const products = respuesta.data.products;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}


async function renderizarDetail() {
    mainDetail.innerHTML = '';

    try {
        const products = await obtenerProductos();
        const id = paramsEntries['id'];
        const product = products[id];
        let imageSrc = product.image ? `/upload/product/${product.image}` : '/assets/images/funciones-pagina/not-found.webp';

        const detail = `
                    <div class="product-container">
                        
                        <img class="product-container__img" src="${imageSrc}" alt="${product.name}">
                        
                        <div class="product-container__section ">

                            <div class="product-info-container">
                                <h6 class="product-info-container__category">
                                    Categoria
                                </h6>
                                <h1 class="product-info-container__title">
                                    ${product.name}
                                </h1>
                                <div class="product-info-container__price">
                                    $ ${product.price}
                                </div>
                                <p class="product-info-container__mini-description">
                                    "Conquista el futuro de la tecnología en Vikings Technology, donde tus sueños se hacen realidad con un solo clic."
                                </p>
                            </div>
                            <div class="product-function-container">
                                <div class="product-function-container__quantity product-quantity-container">
                                    <h5 class="product-quantity-container__title">
                                        Cantidad
                                    </h5>
                                    
                                    <div class="product-quantity-container__increase quantity-product">
                                        <button class="quantity-product__btn" onclick="decreaseInput()">
                                            -
                                        </button>
                                        <input type="number" class="quantity-product__input" id="quantity-input" value=1>
                                        <button class="quantity-product__btn" onclick="increaseInput()">
                                            +
                                        </button>
                                    </div>
                                </div>
                            
                                <div class="product-function-container__btns product-detail-btn">
                                    <button class="product-detail-btn__functions" id="agregarCarrito" onclick="addCart()">Agregar al carrito</button>
                                    <button class="product-detail-btn__functions" onclick="boughtProduct()">Comprar ahora</button>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div class="product-description">
                    <h3 class="product-description__title">
                        Características
                    </h3>
                    <p class="product-description__description">
                        ${product.description}
                    </p>
                    </div> `

        mainDetail.innerHTML = detail;
    } catch (error) {
        console.error(error);
        // Lógica de manejo de errores, si es necesario
    }
}

renderizarDetail()

let input = document.getElementById("quantity-input");

console.log(input)
let currentValue = 1;

function increaseInput() {
    let input = document.getElementById("quantity-input");
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
}

function decreaseInput() {
    let input = document.getElementById("quantity-input");
    let currentValue = parseInt(input.value);

    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}



async function addCart() {
    try {
        const products = await obtenerProductos();
        const id = paramsEntries['id'];
        const product = products[id];
        const existingCartItems = JSON.parse(sessionStorage.getItem('order')) || [];
        const updatedProduct = { ...product, quantity: parseInt(document.querySelector('.quantity-product__input').value) };
        const existingProductIndex = existingCartItems.findIndex(item => item.name === updatedProduct.name);
        if (existingProductIndex !== -1) {
            existingCartItems[existingProductIndex].quantity += updatedProduct.quantity;
        } else {
            existingCartItems.push(updatedProduct);
        }
        sessionStorage.setItem('order', JSON.stringify(existingCartItems));

        // Actualizar el contador del carrito
        const cartCounter = document.getElementById('card-count');
        let currentCount = parseInt(cartCounter.textContent) || 0;
        cartCounter.textContent = (currentCount + updatedProduct.quantity).toString();
    } catch (error) {
        console.error(error);
        // Lógica de manejo de errores, si es necesario
    }
}


async function boughtProduct() {
    try {
        const products = await obtenerProductos();
        const id = paramsEntries['id'];
        const product = products[id];
        const existingCartItems = JSON.parse(sessionStorage.getItem('order')) || [];
        const updatedProduct = { ...product, quantity: parseInt(document.querySelector('.quantity-product__input').value) };
        const existingProductIndex = existingCartItems.findIndex(item => item.name === updatedProduct.name);
        if (existingProductIndex !== -1) {
            existingCartItems[existingProductIndex].quantity += updatedProduct.quantity;
        } else {
            existingCartItems.push(updatedProduct);
        }
        sessionStorage.setItem('order', JSON.stringify(existingCartItems));

        window.location.replace("/order-detail");
    } catch (error) {
        console.error(error);
    }
}

