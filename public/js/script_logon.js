// Función asíncrona que envía datos al servidor al hacer clic en un botón
const enviarDatos = async () => {
  // Obtiene los valores de los campos de nombre de usuario y contraseña del formulario
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Obtiene la instancia de axios desde el entorno de ejecución del navegador
  const axios = window.axios;
  try {
    // Envía una solicitud POST al servidor con los datos de nombre de usuario y contraseña
    const response = await axios.post("/api/login", {
      username,
      password,
    });
    // Si la respuesta del servidor tiene un código de estado 200 (éxito)
    if (response.status === 200) {
      // Redirige al usuario a la página principal
      // Redirige al usuario a la página correspondiente según su perfil
      const profile = response.data.profile;
      if (profile === "admin") {
        window.location.href = "admin";
      } else if (profile === "residente") {
        window.location.href = "/colombia";
      } else {
        window.location.href = "/normal";
      }
    }
  } catch (error) {
    // Maneja los errores, incluido el mensaje del servidor si está disponible
    if (error.response) {
      // Obtiene el mensaje de error del cuerpo de la respuesta
      const mensaje = error.response.data.error;
      // Muestra una alerta en el navegador con el mensaje de error
      alert(mensaje);
    } else {
      // Muestra un mensaje de error en la consola si no hay una respuesta del servidor
      console.error("Error en la solicitud:", error.message);
      // Maneja otros tipos de errores si es necesario
    }
  }
};


/*
Este código contiene funciones para manejar la apertura y cierre de un modal,
así como una función asíncrona (enviarRegistro) para enviar datos de registro
al servidor utilizando Axios. También incluye manejo de errores y actualización
del mensaje de registro en la interfaz de usuario en consecuencia.
*/
