import styles from "./NumberItem.module.scss";

const NumberItem = ({ data, operator, onClick, style }) => {
  return (
    <div
      className={`${operator ? styles.operator : styles.number}`}
      onClick={(e) => onClick(e, operator)}
      style={style}
    >
      {data}
    </div>
  );
};

export default NumberItem;
