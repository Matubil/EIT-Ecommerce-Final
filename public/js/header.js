


const signIn = document.getElementById('sign-in');
const navbarList = document.getElementById('navbar-list')
let Users = []
const token = localStorage.getItem('token');




let Products = [];

let Order = JSON.parse(sessionStorage.getItem("order")) || [];

const badgeHTML = document.getElementById('card-count')

// va a ser la lista de lo que la persona ordene y vaya agregando
function actualizarBadge() {
    let totalQuantity = 0;
    Order.forEach((producto) => {
        totalQuantity += producto.quantity
    })


    badgeHTML.innerText = totalQuantity
}


actualizarBadge()

function renderHeaderLinks(){    

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    if(currentUser){//pregunta si el usuario existe
        signIn.innerHTML =  '<div onclick="logout()" class="navbar__nav-link">Logout</div>'

        if(currentUser.role === 'ADMIN_ROLE'){

            const adminProductLink = createListItemElement('admin-products', 'Admin Product');

            const adminUserLink = createListItemElement('admin-user', 'Admin Users');
            //const li = document.createElement('li')   //? SI quisieramos que quede bien seria esta linea (ejemplo 1)            

            navbarList.appendChild(adminProductLink) //y ahora lo agregamos al navbar
            navbarList.appendChild(adminUserLink) //y ahora lo agregamos al navbar
        }

    }else{        
        const link = createLinkElement('login', 'Login')
        signIn.replaceChildren(link)
    }
}

function createListItemElement(path, text){
    const listItem = document.createElement('li')
    listItem.classList.add('navbar__nav-item')

    listItem.setAttribute('id', path)
    link = createLinkElement(path,  text) //insertamos dentro del li el adminProductLink y lo mismo con el siguiente

    listItem.appendChild(link)
    return listItem
}


//con la siguiente funcion creamos las rutas de acceso, entonces segun cada cosa que hagamos tendra su pagina
function createLinkElement(path, text, type = null){
    let li;
    const link = document.createElement('a')
    link.classList.add('navbar__nav-link')
    link.href =`/${path}`
    link.innerText = text
    
    return link
}

function logout(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser.role === 'ADMIN_ROLE'){
        document.getElementById('admin-products').remove(); //eliminamos los 2 botones cuando nos deslogueamos de un role admin
        document.getElementById('admin-user').remove(); //eliminamos los 2 botones cuando nos deslogueamos
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    sessionStorage.removeItem('order')
    renderHeaderLinks();
    window.location.replace("/");

}

renderHeaderLinks();

