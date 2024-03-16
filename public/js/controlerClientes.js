const axios = window.axios;

document.addEventListener('DOMContentLoaded', () => {
  const clientForm = document.getElementById('clientForm');
  const clientTable = document.getElementById('clientTable');

  // Función para cargar la lista de clientes en la tabla de Bootstrap
  async function loadClientList() {
    try {
      const response = await axios.get('/clientes');
      const data = await response.data;

      clientTable.innerHTML = ''; // Limpiar la tabla existente

      data.forEach((client) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${client.nombre}</td>
          <td>${client.email}</td>
          <td>${client.telefono}</td>
          <td>${client.direccion}</td>
          <td>
            <button class="btn btn-danger delete-button" data-cliente-id="${client._id}">
              <i class="fas fa-trash"></i> Borrar
            </button>
          </td>
        `;
        clientTable.appendChild(row);
      });
    } catch (error) {
      console.error(error);
      alert('Error al cargar la lista de clientes.');
    }
  }

  // Agregar un evento para manejar los botones de borrado
  clientTable.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
      const clienteId = e.target.getAttribute('data-cliente-id');
      deleteClient(clienteId);
    }
  });

  // Función para eliminar un cliente
  async function deleteClient(clientId) {
    try {
      await axios.delete(`/clientes/${clientId}`);
      alert('Cliente eliminado.');
      loadClientList();
    } catch (error) {
      console.error(error);
      alert('Error al borrar el cliente.');
    }
  }

  // Agrega un evento para el formulario (para POST)
  clientForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
    };
    try {
      await axios.post('/clientes', data);
      alert('Cliente creado.');
      loadClientList();
      clearInputFields();
    } catch (error) {
      console.error(error);
      alert('Error al crear el cliente.');
    }
  });

  // Función para limpiar los campos de entrada
  function clearInputFields() {
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
  }

  // Llama a loadClientList para cargar la lista de clientes cuando se carga la página.
  loadClientList();
});
