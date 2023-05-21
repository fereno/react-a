import styles from "./Item.module.css";
const Item = (props) => {
  return (
    <>
      <div className={styles["div-item"]}>
        {props.userName} ({props.age} years old)
      </div>
    </>
  );
};

export default Item;
