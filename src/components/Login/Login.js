import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(""); //Email жаз дегенди билдирген абал
  const [emailIsValid, setEmailIsValid] = useState(false); //Email жазылып жазылбаганын текшерген абал
  const [enteredPassword, setEnteredPassword] = useState(""); //Password жаз дегенди билдирген абал
  const [passwordIsValid, setPasswordIsValid] = useState(false); //Password жазылып жазылбаганын текшерген абал
  const [formIsValid, setFormIsValid] = useState(false); //Form'га эч нерсе жазылбаса false боюнча тура берет.Ал эми бир нерсе жазылса false true'га озгорулот.Натыйжасында Form'ду текшерип турган абал.

useEffect(()=>{
  //debouncing
  const indentifier = setTimeout(()=>{
    console.log('Valid')
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  },2500)
  //clean up function with debouncing
  return()=>{
    console.log('')
    clearTimeout(indentifier)
  };
},[setFormIsValid,enteredEmail,enteredPassword])





  const emailChangeHandler = (event) => {
    //бул функция type'ы email   болгон input'тун   ичиндеги   onChange аркылуу чакылырлат.
    // ал жактан алынган Value'ларды enteredEmail'га сакталат жанан enteredEmail'дын ичинен томонкудой  болуп setEnteredEmail чакырылат.
    setEnteredEmail(event.target.value);

    /* setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6 //setEnteredEmail'дын мааниси алынат анын ичине  созсуз собачканы(@) кошуп жаз дегенди жана passWord'тун пробели жок бирок узундугу 6 символдон коп жазылган парол туура болот дегенди тушундурот.
    ); */
  };

  const passwordChangeHandler = (event) => {
    // комментарий emailChangeHandler'ге окшош эле жызылат.
    setEnteredPassword(event.target.value);

  /*   setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    ); */
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@")); // input'ка @Собачканы жазсак бизге true кайтарып кнопка басылганда кирип кетет. ал эми @Собачканы жазбай койсок false кайтарып берип ошибка корсотот.
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6); // input'ка  6  же андан коп символ жазсак бизге true кайтарып кнопка басылганда кирип кетет. ал эми 6  символдон аз жазып койсок false кайтарып берип ошибка корсотот.
  };

  const submitHandler = (event) => {
    //баскычтын функциясы
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : "" // conditional Style 'дын условиясы
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail} // two way data binding
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} //onBlur-бул фокус.Качан биз логинди туура жазмайынча input кызыл болуп тура берет. Эгерде биз туура жазсак ал кызыл жоголуп кетет.Бул жерде true & false корсотуп берет.
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : "" // conditional Style 'дын условиясы
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword} // two way data binding
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler} //onBlur-бул фокус.Качан биз паролду туура жазмайынча input кызыл болуп тура берет. Эгерде биз туура жазсак ал кызыл жоголуп кетет.Бул жерде true & false корсотуп берет.
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            {/* disabled-баскычтар учун колдонулат.Бул жерде Form туура болбойунча баскыч иштебейт.  */}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
