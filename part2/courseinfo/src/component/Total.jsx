const Total = ({parts}) => {
  const total = parts.reduce((prev,current)=>prev + current.exercises,0)
  return <p><b>Total of exercises {total}</b></p>;
};

export default Total;
