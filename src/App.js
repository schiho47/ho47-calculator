import { useState } from 'react';
import styles from './App.module.scss';
import NumberItem from './components/NumberItem/NumberItem';
import Result from './components/Result/Result';

const numberItems = [
  'AC',
  '+/-',
  '%',
  '÷',
  '7',
  '8',
  '9',
  '×',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '=',
];
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

function App() {
  const [result, setResult] = useState(0);
  const [pickTarget, setPickTarget] = useState([]);
  const [isAfterAction, setIsAfterAction] = useState(false);
  const [isSelectedOperator, setIsSelectedOperator] = useState('');

  const checkOnClickFunction = (e, isOperator) => {
    const value = e.target.innerText;

    const handleOperator = (value) => {
      setPickTarget((prev) => [...prev, value]);
      setIsAfterAction(true);
      if (value === '+' || value === '-' || value === '×' || value === '÷') {
        setIsSelectedOperator(value);
      }
    };

    const handleClearAll = () => {
      setResult(0);
      setPickTarget([]);
      setIsAfterAction(false);
    };

    const handlePlusMinusToggle = () => {
      setResult((prev) => (prev > 0 ? -prev : Math.abs(prev)));
    };

    const handlePercentage = () => {
      setResult((prev) => prev / 100);
    };

    const handleDecimal = (value) => {
      if (!pickTarget.includes('.')) {
        setResult((prev) => `${prev}.`);
        setPickTarget((prev) => [...prev, value]);
      }
    };

    const handleEqual = () => {
      const resultFun = pickTarget.join('').replace('×', '*').replace('÷', '/');
      const answer = eval(resultFun);
      setResult(answer);
      setPickTarget([answer]);
      setIsAfterAction(false);
      setIsSelectedOperator('');
    };

    const handleNumber = (value) => {
      if (result === 0) {
        setResult(value);
        setPickTarget(value);
        setIsAfterAction(false);
        setIsSelectedOperator('');
      } else {
        isAfterAction
          ? setResult(value)
          : setResult((prev) => `${prev}${value}`);
        setPickTarget((prev) => [...prev, value]);
        setIsAfterAction(false);
        setIsSelectedOperator('');
      }
    };

    switch (value) {
      case 'AC':
        handleClearAll();
        break;
      case 'C':
        handleClearAll();
        break;
      case '+/-':
        handlePlusMinusToggle();
        break;
      case '%':
        handlePercentage();
        break;
      case '.':
        handleDecimal(value);
        break;
      case '=':
        handleEqual();
        break;
      default:
        if (isOperator) {
          handleOperator(value);
        } else if (!isNaN(parseFloat(value))) {
          handleNumber(value);
        }
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
              key={number}
              data={result !== 0 && number === 'AC' ? 'C' : number}
              operator={findOperatorClass(index)}
              isSelectedOperator={isSelectedOperator}
              onClick={(e) => checkOnClickFunction(e, findOperatorClass(index))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
