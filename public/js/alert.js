function showAlert(text, type = 'sucess'){ 
    
    // Crea un elemento HTML node
    const alertDialog = document.createElement('div')
    // Añade una clase
    alertDialog.classList.add('alert-dialog')
    alertDialog.innerText = text;

    document.body.appendChild(alertDialog);

    if(type === 'error'){
        alertDialog.style.backgroundColor= 'red'
    }

    if(type === 'warning'){
        alertDialog.style.backgroundColor= 'orange'
    }

    alertDialog.innerText = text;       

    document.querySelector('body').appendChild(alertDialog)

    //Para demorar su aparicion luego de haberlo creado lineas anterior con document CreateElement
    setTimeout(() => alertDialog.classList.add('show'), 10)
    
    setTimeout(()=>{      
        alertDialog.classList.remove('show'); //para lo que se pone esto, es que al remover el cartel y que se deje de mostrar, a los mil milisegundos despues, va a borrar el item


        setTimeout(() => { //este tambien sirve para que salga o desaparezca sutilmente, y no de una
            alertDialog.remove() //Lo que hacemos es eliminar el cartel del HTML porque lo que va a ir haciendo es acumular varias lineas de codigo innecesariamente por cada carga
        }, 1000)
    }, 3000)
}
