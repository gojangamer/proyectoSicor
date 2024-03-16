const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../modelos/modeloAuth");
const util = require('util');
const findUserByUsernameAsync = util.promisify(Usuario.findUserByUsername);


router.post("/registro", async (req, res) => {
  try {
    if (!req.body.namer || !req.body.usernamer || !req.body.passwordr) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    Usuario.findUserByUsername(req.body.usernamer, (error, existingUser) => {
      if (error) {
        console.error("Error al buscar usuario:", error);
        return res
          .status(500)
          .json({ error: "Error en el servidor al buscar usuario." });
      }
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El nombre de usuario ya está en uso." });
      }
      bcrypt.hash(req.body.passwordr, 12, async (err, hashedPassword) => {
        if (err) {
          console.error("Error al hashear contraseña:", err);
          return res
            .status(500)
            .json({ error: "Error en el servidor al hashear contraseña." });
        }
        const newUsuario = {
          name: req.body.namer,
          username: req.body.usernamer,
          password: hashedPassword,
        };
        console.log(newUsuario);
        Usuario.createUser(newUsuario, (error, userId) => {
          if (error) {
            console.error("Error al registrar el usuario:", error);
            return res
              .status(500)
              .json({ error: "Error al registrar el usuario." });
          }
          console.log("Registrado con éxito");
          res
            .status(201)
            .json({ mensaje: "Usuario registrado correctamente." });
        });
      });
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
});

/*
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // Llama a la función findUserByUsername con el nombre de usuario y el callback
    Usuario.findUserByUsername(username, (error, user) => {
      if (error) {
        console.error("Error al buscar usuario:", error);
        return res
          .status(500)
          .json({ error: "Error en el servidor al buscar usuario." });
       
      }
      // Comprueba si el usuario no fue encontrado
      if (!user) {
        console.log("El usuario no existe");
        return res.status(404).json({ error: "El usuario no existe" });
      
      }
      // Verifica la contraseña
      bcrypt.compare(password, user.password, (err, passwordValido) => {
        if (err) {
          console.error("Error al comparar contraseñas:", err);
          return res
            .status(500)
            .json({ error: "Error en el servidor al comparar contraseñas." });
        }
        // Comprueba si la contraseña es incorrecta
        if (!passwordValido) {
          console.log("Contraseña incorrecta");
          return res.status(401).json({ error: "Contraseña incorrecta" });
        
        }
        // Si las credenciales son válidas, genera un token
        const token = jwt.sign({ usuarioId: user._id }, "secreto", {
          expiresIn: "1h"});
        // Determinar la redirección según el perfil del usuario
        let redirectTo = "/";
        if (user.profile === "admin") {
          redirectTo = "/admin";
        } else if (user.profile === "cajero") {
          redirectTo = "/cajero";
        } else {
          redirectTo = "/normal";
        }

        // Envía el token y la redirección al cliente
        res.json({
          token: token,
          profile: user.profile,
          redirectTo: redirectTo,
          mensaje: "Inicio de sesión exitoso",
        })
    } ) 
});
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" 
});
  }
});*/



router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    const user = await findUserByUsernameAsync(username);

    // Comprobar si el usuario existe
    if (!user) {
      console.log("El usuario no existe");
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Verificar la contraseña
    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ usuarioId: user._id }, "secreto", { expiresIn: "1h" });

    // Determinar la redirección según el perfil del usuario
    let redirectTo = "/";
    if (user.profile === "admin") {
      redirectTo = "/admin";
    } else if (user.profile === "cajero") {
      redirectTo = "/cajero";
    } else {
      redirectTo = "/normal";
    }

    // Enviar token y redirección al cliente
    res.json({
      token: token,
      profile: user.profile,
      redirectTo: redirectTo,
      mensaje: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});




router.delete("/eliminar/:id", async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findUserById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    await Usuario.deleteUser(usuarioId);
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/logout", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const decodedToken = jwt.verify(token, "secreto");
    res.json({ mensaje: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

module.exports = router;

//Funciones para:
//REGISTRO
//LOGIN
//ELIMINAR
//logout
