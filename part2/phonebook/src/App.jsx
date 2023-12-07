import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [person, setPerson] = useState({
    name: "",
    number: "",
  });
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const changeHandler = (e) =>
    setPerson({ ...person, [e.target.name]: e.target.value });

  const filterHandler = (e) => setFilter(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    const existed = persons.filter((p) => p.name === person.name)[0];
    if (existed !== undefined) {
      const updatedPerson = { id: existed.id, ...person };
      if (existed.number === updatedPerson.number) {
        setNotification({
          type: "error",
          message: `Information of '${existed.name}' is already exists`,
        });

        setTimeout(() => {
          setNotification({
            type: null,
            message: null,
          });
        }, 3000);
      } else if (
        window.confirm(
          `${updatedPerson.name} is already added to phonebook,replace the old number with the new one?`
        )
      ) {
        personServices
          .update(updatedPerson.id, updatedPerson)
          .then((personChanges) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : personChanges
              )
            );
            setNotification({
              type: "success",
              message: `${existed.name}'s phone updated`,
            });

            setTimeout(() => {
              setNotification({
                type: null,
                message: null,
              });
            }, 3000);
          });
      }
    } else {
      const newPerson = { id: persons.length + 1, ...person };
      personServices.create(newPerson).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNotification({
          type: "success",
          message: `'${newPerson.name}' Added`,
        });

        setTimeout(() => {
          setNotification({
            type: null,
            message: null,
          });
        }, 3000);
      });
    }
  };

  const deleteHandler = (id) => () => {
    const deletedPerson = persons.filter((p) => p.id === id)[0];
    window.confirm(`Are you sure to delete ${deletedPerson.name}`) &&
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setNotification({
            type: "error",
            message: `Information of '${deletedPerson.name}' has already been removed from server`,
          });
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            setNotification({
              type: null,
              message: null,
            });
          }, 3000);
        });
  };

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter onChange={filterHandler} filter={filter} />
      <h1>add a new </h1>
      <PersonForm
        onChange={changeHandler}
        onSubmit={submitHandler}
        person={person}
      />
      <h2>Numbers</h2>
      <Persons
        deleteHandler={deleteHandler}
        persons={persons}
        filter={filter}
      />
    </div>
  );
}

export default App;
