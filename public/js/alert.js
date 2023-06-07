function showAlert(text, type = 'sucess'){ //se le pone sucess, ya que al ingresar de por si el valor, si no mandas ningun type en este caso, siempre va a tomar un valor por defecto, entonces podes mandar el parametro text solamente, que no va a afectar en nada, ahora si queremos cambiar eso, cuando queramos enviar otro tipo de type seria asi:  showAlert(`El password no coincide`, 'warning')
    //!-- BORRAR DENTRO DEL registerForm.addEventListener('submit', (event)=>{ LA LINEA DE SUCESS QUE LE MANDAMOS COMO PARAMETRO, QUE ESTA AL DOPE, YA QUE POR LO QUE ESTAMOS LEYENDO ACA ARRIBA NO SERIA NECESARIO MANDARLO
    
    // * VAMOS A HACER NUESTRO ALERT CUSTOM

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

        //alertDialog.classList.add('hidden')

        setTimeout(() => { //este tambien sirve para que salga o desaparezca sutilmente, y no de una
            alertDialog.remove() //Lo que hacemos es eliminar el cartel del HTML porque lo que va a ir haciendo es acumular varias lineas de codigo innecesariamente por cada carga
        }, 1000)
        // window.location.href = '/pages/login/login.html'     
    }, 3000)
}
