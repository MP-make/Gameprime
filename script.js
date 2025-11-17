function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function validarFormulario(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById('mensaje').value;
    let telefono = document.getElementById('telefono').value;

    if (nombre === "" || email === "" || mensaje === ""|| telefono=== "") {
        alert("Por favor, completa todos los campos.");
    } else {
        abrirModalContacto();
    }
}

function abrirModalContacto() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalContacto").style.display = "block";
}

function cerrarModalContacto() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("modalContacto").style.display = "none";
    location.reload();
}


function validarFormularioReclamaciones(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let descripcion = document.getElementById('reclamacion').value;
    let fecha = document.getElementById('fecha').value;
    let archivo = document.getElementById('archivo').value;
    let terminos = document.getElementById('terminos').checked;
    
    if (nombre === "" || email === "" ||  telefono=== "" || descripcion== "" || fecha== "" || archivo== "" || !terminos) {
        alert("Por favor, completa todos los campos.");
    } else {
        abrirModalReclamaciones();
    }
}

function abrirModalReclamaciones() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalReclamaciones").style.display = "block";
}

function cerrarModalReclamaciones() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("modalReclamaciones").style.display = "none";
    location.reload();
}

let imagenCarrusel = 1;

function banner() {
    setInterval(function(){
        imagenCarrusel += 1;
        if (imagenCarrusel > 3) {
            imagenCarrusel = 1;
        }
        document.getElementById('img_banner').setAttribute("src", "imagenes/banner" + imagenCarrusel + ".jpg");
    }, 3000);
}

function iniciarPagina() {
    if (window.location.href.includes('contactanos.html')) {
        document.getElementById('contactForm').addEventListener('submit', validarFormulario);
    }
    banner();
}