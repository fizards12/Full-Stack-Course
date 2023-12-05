
function PersonForm({person , onSubmit , onChange }) {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name:{" "}
          <input
            type="text"
            value={person.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={person.number}
            name="number"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm