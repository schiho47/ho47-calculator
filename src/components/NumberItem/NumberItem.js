import styles from './NumberItem.module.scss';
import { useState } from 'react';

const NumberItem = ({ data, operator, onClick, isSelectedOperator }) => {
  const itemClassName =
    operator && data !== isSelectedOperator
      ? styles.operator
      : operator && data === isSelectedOperator
      ? styles.operatorSelected
      : styles.number;

  return (
    <div className={`${styles.commonItem} ${itemClassName}`} onClick={onClick}>
      {data}
    </div>
  );
};

export default NumberItem;
