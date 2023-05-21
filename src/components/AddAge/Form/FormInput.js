import {useState} from "react";
import Button from "../../UI/Button/Button";
import styles from "./FormInput.module.css";
import Card from "../../UI/Card/Card";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

const FormInput = (props) => {
  const [userInput, setUserInput] = useState({userName: "", age: ""});
  const [error, setError] = useState();
  const userNameInputChangeHandler = (event) => {
    setUserInput({...userInput, userName: event.target.value});
  };
  const ageInputChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      age: event.target.value.toString(),
    });
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(userInput);
    // window.alert("hey empty");
    if (
      userInput.userName.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      setError({
        title: "Invalid input !",
        message: "plz enter a valid name and age (non-empty values)",
      });
    } else if (+userInput.age < 1) {
      setError({title: "Invalid age !", message: "plz enter a valid age (>0)"});
    } else {
      props.onSubmit(userInput);
      setUserInput({userName: "", age: ""});
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
            <input
              type="text"
              value={userInput.userName}
              onChange={userNameInputChangeHandler}
            ></input>
            <label>Age(years)</label>
            <input
              type="number"
              value={userInput.age}
              onChange={ageInputChangeHandler}
            ></input>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default FormInput;
