const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const PORT = process.env.PORT || 3001;
const app = express();

const generateId = () => {
  const MaxId = Math.max(...persons.map((p) => p.id));
  return MaxId + 1;
};

app.use(cors());
app.use(express.json());

app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms", tokens.body(req,res),
    ].join(" ")
  )
);
morgan.token("body", (req,res) => {
  return JSON.stringify(req.body);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello to Phonebook Server</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === Number(id));
  person || false
    ? res.json(person)
    : res.status(404).send("<h1>Person Information not found</h1>");
});

app.get("/api/info", (req, res) => {
  const length = persons.length;
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${length} people </br>${currentDate}</p>`
  );
});

app.post("/api/persons", (req, res) => {
  const body = { ...req.body };
  const person = persons.filter((p) => p.name === body.name)[0];
  if (!body.name) {
    res.status(400).json({ err: "name is missing" });
  } else if (!body.number) {
    res.status(400).json({ err: "number is missing" });
  } else if (person) {
    res.status(400).json({ err: "name must be unique" });
  } else {
    const newPerson = {
      id: generateId(),
      ...body,
    };
    persons = persons.concat(newPerson);
    res.status(201).json(newPerson);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  if (persons.find((p) => p.id === id) || false) {
    persons = persons.filter((p) => p.id !== id);
    res.status(204).send("");
  } else {
    res.status(404).send("");
  }
});

app.listen(PORT, () => {
  console.log(`The server runs on PORT ${PORT}`);
});
