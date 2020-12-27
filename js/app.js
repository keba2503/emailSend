//Variables
const btnEnviar = document.querySelector("#enviar")
const formulario = document.querySelector('#enviar-mail')
const btnResetear = document.querySelector('#resetear');

//Variables de campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Expresion regular de validacion de email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Eventos
eventos();
function eventos() {
    //Arrancar APP
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos de formularios
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar email

    formulario.addEventListener('submit', enviarEmail);

    btnResetear.addEventListener('click', resetearFormulario);


}


//Funciones
function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('not-allowed');
}


function validarFormulario(e) {

    //validar si campo esta vacio
    if (e.target.value.length > 0) {

        //Remover errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove()
        }

        //cambiar clase
        e.target.style.borderColor = 'green';

    } else {
        //cambiar clase
        e.target.style.borderColor = 'red';
        mostrarError('Todos los campos son obligatorios');
    }
        //validar email
    if (e.target.type === 'email') {

        if (er.test(e.target.value)) {
            e.target.style.borderColor = 'green';
        } else {
            e.target.style.borderColor = 'red';
            mostrarError('email no valido');
        }

    }

    //Validar que todo el formulario este correcto
    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        //Habilitar Boton Enviar
        btnEnviar.disable = false;
        btnEnviar.classList.remove('not-allowed');
    }
}

//Mostrar mensaje de error
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('p-mensaje', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);

    }
}

//Enviar email
function enviarEmail (e) {
    e.preventDefault();

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    setTimeout (() => {
        spinner.style.display='none';

        //mensaje enviado

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';

       
        parrafo.classList.add('enviado');
        formulario.appendChild(parrafo);
        
        setTimeout (() => {
            parrafo.remove();   
            resetearFormulario();     
        }, 3000);

    }, 3000);

}

function resetearFormulario () {
    formulario.reset();
}
