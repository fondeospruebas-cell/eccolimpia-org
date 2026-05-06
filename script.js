function cambiarIdioma(idioma) {
    // Guardar preferencia
    localStorage.setItem('idiomaEccolimpia', idioma);

    // Recorrer todos los elementos con atributos data-lang
    const elementos = document.querySelectorAll('[data-es]');
    elementos.forEach(el => {
        // Si existe el atributo para el idioma seleccionado, cambiar el texto
        if (el.hasAttribute('data-' + idioma)) {
            // Para inputs/placeholders se cambia el placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-' + idioma);
            } else {
                el.textContent = el.getAttribute('data-' + idioma);
            }
        }
    });
}

// Al cargar la página, aplicar el idioma guardado o detectar el del navegador
document.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('idiomaEccolimpia');
    if (idiomaGuardado) {
        cambiarIdioma(idiomaGuardado);
    } else {
        // Detectar idioma del navegador (opcional)
        const idiomaNavegador = navigator.language || navigator.userLanguage;
        if (idiomaNavegador.startsWith('es')) {
            cambiarIdioma('es');
        } else if (idiomaNavegador.startsWith('en')) {
            cambiarIdioma('en');
        } else {
            // Por defecto italiano
            cambiarIdioma('it');
        }
    }
});