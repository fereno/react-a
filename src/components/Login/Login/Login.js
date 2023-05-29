import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../../storage/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value: "", isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === "PASS_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: "", isValid: false};
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });
  const {isValid: emailIsValid} = emailState;
  const {isValid: passIsValid} = passwordState;
  useEffect(() => {
    const identify = setTimeout(() => {
      console.log("set is valid");
      setFormIsValid(passIsValid && emailIsValid);
    }, 500);
    return () => {
      clearTimeout(identify);
    };
  }, [emailIsValid, passIsValid]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "PASS_INPUT", val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!formIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          label={"E-Mail"}
          htmlFor={"email"}
          type={"email"}
          id={"email"}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          label={"Password"}
          htmlFor={"password"}
          type={"password"}
          id={"password"}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
