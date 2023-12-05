function Persons({ persons, filter,deleteHandler}) {
  return (
    <>
      {persons
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p) => (
          <div key={p.name}>
            {p.name} {p.number} <button onClick={deleteHandler(p.id)}>Delete</button>
          </div>
        ))}
    </>
  );
}

export default Persons;
