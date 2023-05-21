import Card from "../../UI/Card/Card";
import Item from "../Item/Item";
import styles from "./ItemList.module.css";

const ItemList = (props) => {
  return (
    <Card className={styles.box}>
      {props.items.map((item) => (
        <Item
          userName={item.userName}
          age={item.age}
          key={Math.random().toString()}
        />
      ))}
    </Card>
  );
};
export default ItemList;
