import { useState } from "react";
import styles from "./App.module.scss";
import NumberItem from "./components/NumberItem/NumberItem";
import Result from "./components/Result/Result";

const numberItems = [
  { title: "AC", isClick: false },
  { title: "+/-", isClick: false },
  { title: "%", isClick: false },
  { title: "÷", isClick: false },
  { title: "7", isClick: false },
  { title: "8", isClick: false },
  { title: "9", isClick: false },
  { title: "×", isClick: false },
  { title: "4", isClick: false },
  { title: "5", isClick: false },
  { title: "6", isClick: false },
  { title: "-", isClick: false },
  { title: "1", isClick: false },
  { title: "2", isClick: false },
  { title: "3", isClick: false },
  { title: "+", isClick: false },
  { title: "0", isClick: false },
  { title: ".", isClick: false },
  { title: "=", isClick: false },
];

function App() {
  const [result, setResult] = useState(0);
  const [pickTarget, setPickTarget] = useState([]);
  const [isAfterAction, setIsAfterAction] = useState(false);

  const findOperatorClass = (index) => {
    if (
      index === 3 ||
      index === 7 ||
      index === 11 ||
      index === 15 ||
      index === 18
    )
      return true;
    return false;
  };

  const toZero = () => {
    setResult(0);
    setPickTarget([]);
    setIsAfterAction(false);
  };

  const togglePlusMinus = () => {
    setResult((prev) => {
      if (prev > 0) {
        return -prev;
      }
      return Math.abs(prev);
    });
  };

  const getResult = () => {
    const resultFun = pickTarget.join("").replace("×", "*").replace("÷", "/");
    ///^[\d\s()+\-*\/.]+$/
    const answer = eval(resultFun);
    setResult(answer);

    setPickTarget([answer]);
    setIsAfterAction(false);
  };

  const checkOnClickFunction = (e, isOperator, index) => {
    const value = e.target.innerText;
    if (index && isOperator) {
    }

    if (isOperator && value !== "=") {
      setPickTarget((prev) => [...prev, value]);
      setIsAfterAction(true);
      return;
    }
    //處理非加減乘除的情形
    if (value === "AC") {
      toZero();
      return;
    }

    if (value === "+/-") {
      togglePlusMinus();
      return;
    }

    if (value === "%") {
      setResult((prev) => prev / 100);
      return;
    }

    if (value === "." && !pickTarget.includes(".")) {
      setResult((prev) => `${prev}.`);
      setPickTarget((prev) => [...prev, value]);
      return;
    }

    if (value === "." && pickTarget.includes(".")) {
      return;
    }

    if (value === "=") {
      getResult();
      return;
    }

    //處理數字

    if (result === 0) {
      setResult(value);
      setPickTarget(value);
      setIsAfterAction(false);
      return;
    }

    if (result !== 0) {
      isAfterAction ? setResult(value) : setResult((prev) => `${prev}${value}`);
      setPickTarget((prev) => [...prev, value]);
      setIsAfterAction(false);

      return;
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.result}>
        <Result result={result} />
      </div>
      <div className={styles.numberArea}>
        {numberItems.map((number, index) => {
          return (
            <NumberItem
              // style={{ backgroundColor: "green" }}
              key={number.title}
              data={number.title}
              operator={findOperatorClass(index)}
              onClick={(e) =>
                checkOnClickFunction(e, findOperatorClass(index), index)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
