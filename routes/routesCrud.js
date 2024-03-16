const express = require('express');
const router = express.Router();
const { Cliente, Producto, Factura } = require('../modelos/modelosCrud');

 // Importa los modelos desde el archivo mdatos.js



// Rutas para Clientes

router.get('/clientes', async (req, res) => {
    try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Definir una ruta para guardar datos
router.post('/clientes', async (req, res) => {
  try {
      
      const nuevoCliente = new Cliente({
          nombre: req.body.nombre,
          email: req.body.email,
          telefono: req.body.telefono,
          direccion: req.body.direccion
             
      });
      await  nuevoCliente.save();
      res.json({ message: 'Datos guardados en MongoDB exitosamente.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar los datos en MongoDB.' });
  }
});


/*
router.post('/clientes', async (req, res) => {
  const nuevoCliente = new Cliente({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion
     });
  try {
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json({ message: 'Datos guardados con mucho exito.' });
    console.log(clienteGuardado)
  } catch (err) {
    console.error(error);
    res.status(400).json({ message: 'Error al guardar los datos en MongoDB.' });
  }
});

*/
router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rutas para Productos 

router.get('/productos', async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post('/api/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    try {
      const producto = await nuevoProducto.save();
      res.status(201).json(producto);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.get('/productos/:id', async (req, res) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.put('/productos/:id', async (req, res) => {
    try {
      const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.delete('/productos/:id', async (req, res) => {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Rutas para Facturas 

router.get('/facturas', async (req, res) => {
    try {
      const facturas = await Factura.find().populate('cliente productos.producto');
      res.json(facturas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post('/facturas', async (req, res) => {
    const nuevaFactura = new Factura(req.body);
    try {
      const factura = await nuevaFactura.save();
      res.status(201).json(factura);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.get('/facturas/:id', async (req, res) => {
    try {
      const factura = await Factura.findById(req.params.id).populate('cliente productos.producto');
      if (!factura) {
        return res.status(404).json({ error: 'Factura no encontrada' });
      }
      res.json(factura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.put('/facturas/:id', async (req, res) => {
    try {
      const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!factura) {
        return res.status(404).json({ error: 'Factura no encontrada' });
      }
      res.json(factura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.delete('/facturas/:id', async (req, res) => {
    try {
      const factura = await Factura.findByIdAndDelete(req.params.id);
      if (!factura) {
        return res.status(404).json({ error: 'Factura no encontrada' });
      }
      res.json({ message: 'Factura eliminada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
