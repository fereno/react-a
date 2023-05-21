import FormInput from "./Form/FormInput";
import styles from "./AppPro.module.css";
import {useState} from "react";
import ItemList from "./ItemList/ItemList";

const AppPro = () => {
  const [userInfo, setUserInfo] = useState([]);
  const onSubmitHandler = (data) => {
    setUserInfo([...userInfo, data]);
    console.log("userInfo", userInfo);
  };
  return (
    <div className={styles["div-app"]}>
      <FormInput onSubmit={onSubmitHandler} />
      <ItemList items={userInfo} />
    </div>
  );
};

export default AppPro;
