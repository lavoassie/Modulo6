const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Función para leer la data
function leerAnime() {
  try {
    let data = fs.readFileSync("anime.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error, no se puede leer la data :(");
  }
}

//Escribir nueva data de animé
async function escribirAnime(data) {
  try {
    fs.writeFileSync("anime.json", JSON.stringify({ animes: data }), "utf8");
    console.log("Su animé se registró correctamente");
  } catch (error) {
    throw new Error("Error, no se pudo añadir su animé :(");
  }
}


//Inicio
app.get("/", (req, res) => {
  res.status(200).send("Bienvenidos a nuestros test");
});

//Obtener animé por nombre
app.get("/animes", async (req, res) => {
  try {
    const data = await leerAnime();
    res.status(200).json(data.animes);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Obtener animé por ID
app.get("/animes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await leerAnime();
    const anime = data.animes[id];
    if (!anime) {
      throw new Error("Animé no encontrado :(");
    }
    res.status(200).send(anime);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Crear animé
// Crear animé
app.post("/animes", async (req, res) => {
  try {
    const { nombre, genero, autor, anio } = req.body;
    if (!nombre || !genero || !autor || !anio) {
      throw new Error("Datos incompletos");
    }
    const data = await leerAnime();
    const nuevoId = Object.keys(data).length + 1;
    const nuevoAnime = {
      nombre,
      genero,
      año: anio,
      autor,
    };
    data[nuevoId.toString()] = nuevoAnime;
    escribirAnime(data);
    res.status(201).send("Anime ingresado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Actualizando la lista de animé
app.put("/animes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await leerAnime();
    if (Object.hasOwnProperty.call(data.animes, id)) {
      const animeActualizado = req.body;
      data.animes[id] = animeActualizado;
      escribirAnime(data);
      res.status(202).send("Se ha modificado el anime");
    } else {
      throw new Error("Anime no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/animes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await leerAnime();
    if (Object.hasOwnProperty.call(data.animes, id)) {
      delete data.animes[id];
      escribirAnime(data);
      res.status(200).send("Anime eliminado con éxito");
    } else {
      throw new Error("Anime no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Servidor
app.listen(PORT, () => console.log("Escuchando el puerto 3000"));

//exportando módulo
module.exports = { app };
