import { useState } from "react";
import Button from "./Button";
const StatisticLine = ({ value, text, percent }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{percent === true ? `${value * 100}%` : value}</td>
    </tr>
  </>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(2);
  const positive = (good / total).toFixed(4);
  if (good === 0 && neutral === 0 && bad === 0)
    return (<>
      <h1>statistics</h1>
      <div>No feedback given</div>
    </>);
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={total} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} percent={true} />
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const clickHandler = (buttonName) => () =>
    buttonName === "good"
      ? setGood(good + 1)
      : buttonName === "neutral"
      ? setNeutral(neutral + 1)
      : setBad(bad + 1);
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={clickHandler("good")} />
      <Button text={"neutral"} onClick={clickHandler("neutral")} />
      <Button text={"bad"} onClick={clickHandler("bad")} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
