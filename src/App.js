import { useState } from 'react';
import styles from'./App.module.scss';
import NumberItem from './components/NumberItem/NumberItem';
import Result from './components/Result/Result';

const numberItems=["AC","+/-","%","÷","7","8","9","×","4","5","6","-","1","2","3","+","0",".","="];

function App() {
  const [result,setResult] = useState(0);
  const [pickTarget,setPickTarget] = useState([]);
  const [isAfterAction,setIsAfterAction]=useState(false);


  const findOperatorClass=(index)=>{
    if(index===3 || index===7 || index===11 || index===15 ||index===18) return true;
    return false;
  };


  const toZero=()=>{
    setResult(0);
    setPickTarget([]);
    setIsAfterAction(false);
  };

  const togglePlusMinus = ()=>{
    setResult((prev)=>{
      if(prev>0){
        return -prev;
      }
      return Math.abs(prev);
    })
  };

  const getResult=()=>{
    
    const resultFun=pickTarget.join('').replace('×','*').replace("÷",'/');
    ///^[\d\s()+\-*\/.]+$/ 
    const answer=eval(resultFun);
    setResult(answer);

    setPickTarget([answer]);
    setIsAfterAction(false);
  };

  const checkOnClickFunction=(e,isOperator)=>{
    const value=e.target.innerText;

   if(isOperator && value!=="="){
    setPickTarget((prev)=>([...prev,value]));
    setIsAfterAction(true);
    return;
   };
   //處理非加減乘除的情形
   if(value === 'AC'){
    toZero();
    return;
   };

   if(value === "+/-"){
    togglePlusMinus();
    return;
   };

   if(value === "%"){
    setResult((prev)=>prev/100);
    return;
   };

   if(value === "." && !pickTarget.includes('.')){
    setResult((prev)=>`${prev}.`);
    setPickTarget((prev)=>([...prev,value]));
    return;
   }

   if(value === "." && pickTarget.includes('.')){
    return;
   }

   if(value === "="){
    getResult();
    return;
   }

   //處理數字

   if(result === 0){
    setResult(value);
    setPickTarget(value);
    setIsAfterAction(false);
    return;
   };

   if(result!== 0){
    isAfterAction? setResult(value): setResult((prev)=>`${prev}${value}`);
    setPickTarget((prev)=>([...prev,value]));
    setIsAfterAction(false);

    return;
   }
   
  };

 


  return (
    <div className={styles.app}>
      <div className={styles.result}>
      <Result result={result}/>
      </div>
    <div className={styles.numberArea}>
      {numberItems.map((number,index)=>{
        return(
          <NumberItem key={number} data={number} operator={findOperatorClass(index)} onClick={(e)=>checkOnClickFunction(e,findOperatorClass(index))}/>
        )
      })}
    </div>
    
    </div>
  );
}

export default App;
