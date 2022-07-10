require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("build"));

morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/info", (request, response) => {
  const fechaHoy = new Date();
  Person.find({}).then((persons) => {
    totalPersons = persons.length;
    response.send(
      `Phonebook has info for ${totalPersons} people <br>${fechaHoy}`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(`searching person with id: ${id}`);
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;

  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const maxId = (array) => {
  const max = array.length > 0 ? Math.max(...array.map((p) => p.id)) : 0;
  // console.log(`y el max id es: ${max}`);
  return max;
};

app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  const person = request.body;

  const newPerson = {
    name: person.name,
    phone: person.phone,
  };

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((result) => {
      return response.json(result);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "content missing" });
  }
  if (!body.name) {
    return response.status(400).json({ error: "name content missing" });
  }
  if (!body.phone) {
    return response.status(400).json({ error: "phone content missing" });
  }

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

app.use(notFound);

app.use(handleErrors);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
