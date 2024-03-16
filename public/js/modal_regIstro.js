// Función para abrir el modal
function abrirModal() {
  // Oculta el formulario de inicio de sesión
  document.getElementById('form_logon').style.display = 'none';
  // Muestra el modal
  document.getElementById('modal').style.display = 'block';
}
// Función para abrir el modal desde un enlace
function abrirModalDesdeEnlace() {
  // Muestra el modal al hacer clic en el enlace
  abrirModal();
}
// Función para cerrar el modal
function cerrarModal() {
  // Muestra el formulario de inicio de sesión al cerrar el modal
  document.getElementById('form_logon').style.display = 'inline-block';
  // Oculta el modal
  document.getElementById('modal').style.display = 'none';
}
// Función asíncrona para enviar datos de registro al servidor
const enviarRegistro = async () => {
  // Obtiene los valores de los campos del formulario de registro
  const namer = document.getElementById('namer').value;
  const usernamer = document.getElementById('usernamer').value;
  const passwordr = document.getElementById('passwordr').value;
  const mensajeRegistro = document.getElementById('mensajeRegistro');

  try {
    // Envía una solicitud POST al servidor con los datos de registro
    const response = await axios.post('/api/registro', {
      namer,
      usernamer,
      passwordr
      // Agrega más campos según tus necesidades
    });
    // Cierra el modal después de un registro exitoso
    cerrarModal();
    // Si la respuesta del servidor tiene un código de estado 201 (creado con éxito)
    if (response.status === 201) {
      // Muestra un mensaje de registro exitoso en el HTML
      mensajeRegistro.innerHTML = `<span style="color: green;">${response.data.mensaje}</span>`;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);

    // Maneja errores, incluyendo mensajes de error del servidor si están disponibles
    if (error.response) {
      mensajeRegistro.innerHTML = `<span style="color: red;">${error.response.data.error}</span>`;
    }
  }
};

/*
Este código contiene funciones para manejar la apertura y cierre de un modal, 
así como una función asíncrona (enviarRegistro) para enviar datos de registro 
al servidor utilizando Axios. También incluye manejo de errores y actualización 
del mensaje de registro en la interfaz de usuario en consecuencia.
*/







