//el siguiente middleware se coloca después de todas las rutas para que se ejecute si no ha entrado en ninguna de las anteriores
const notFound = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = notFound;
