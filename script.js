// Función que cambia el idioma de todos los textos y resalta el botón activo
function cambiarIdioma(idioma) {
    // 1. Guarda la preferencia en el navegador
    localStorage.setItem('idiomaEccolimpia', idioma);

    // 2. Recorre todos los elementos que tienen al menos el atributo data-es
    const elementos = document.querySelectorAll('[data-es]');
    elementos.forEach(el => {
        // Si existe el atributo para el idioma seleccionado (data-es, data-en, data-it)
        if (el.hasAttribute('data-' + idioma)) {
            // Para inputs y textareas cambiamos el placeholder, para el resto el texto visible
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-' + idioma);
            } else {
                el.textContent = el.getAttribute('data-' + idioma);
            }
        }
    });

    // 3. Resaltar el botón del idioma activo
    const botones = document.querySelectorAll('.lang-btn');
    botones.forEach(boton => {
        boton.classList.remove('active');                     // Quita el resalte de todos
        if (boton.getAttribute('data-lang') === idioma) {     // Si coincide con el idioma elegido
            boton.classList.add('active');                    // Le añade la clase active
        }
    });
}

// Al cargar la página, aplica el idioma guardado o detecta el del navegador
document.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('idiomaEccolimpia');
    if (idiomaGuardado) {
        // Si ya había elegido un idioma antes, lo usa
        cambiarIdioma(idiomaGuardado);
    } else {
        // Si no, detecta el idioma del navegador
        const idiomaNavegador = navigator.language || navigator.userLanguage;
        if (idiomaNavegador.startsWith('es')) {
            cambiarIdioma('es');
        } else if (idiomaNavegador.startsWith('en')) {
            cambiarIdioma('en');
        } else {
            // Por defecto, italiano
            cambiarIdioma('it');
        }
    }
});