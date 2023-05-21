import {useRef, useState} from "react";
import Button from "../../UI/Button/Button";
import styles from "./FormInput.module.css";
import Card from "../../UI/Card/Card";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

const FormInput = (props) => {
  // const [userInput, setUserInput] = useState({userName: "", age: ""});
  const enteredUserNameRef = useRef();
  const enteredAgeRef = useRef();
  const [error, setError] = useState();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredUserName = enteredUserNameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input !",
        message: "plz enter a valid name and age (non-empty values)",
      });
    } else if (+enteredAge < 1) {
      setError({title: "Invalid age !", message: "plz enter a valid age (>0)"});
    } else {
      props.onSubmit({
        userName: enteredUserName,
        age: enteredAge,
      });
      enteredUserNameRef.current.value = "";
      enteredAgeRef.current.value = "";
    }
  };

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={formSubmitHandler} className={styles.box}>
          <div className={styles["form-control"]}>
            <label>UserName</label>
            <input type="text" ref={enteredUserNameRef}></input>
            <label>Age(years)</label>
            <input type="number" ref={enteredAgeRef}></input>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default FormInput;
