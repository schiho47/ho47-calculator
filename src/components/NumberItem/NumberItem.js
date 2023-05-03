import styles from './NumberItem.module.scss';

const NumberItem = ({data,operator,onClick}) => {
  
    return (
        <div className={`${operator? styles.operator:styles.number}`} onClick={(e)=>onClick(e,operator)}> 
            {data}
        </div>
     );
}
 
export default NumberItem;