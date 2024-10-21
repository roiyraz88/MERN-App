import React, {useState, useContext} from "react";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import { useForm } from '../../shared/hooks/form-hook';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
  } from '../../shared/util/validators';
import { AuthContext } from "../../shared/contex/auth-contex";
import './Auth.css';

function Auth(){
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [formState, inputHandler, setFormData] = useForm({
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    }, false)

    const authSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);
      auth.login();
    }

    const switchModeHandler = () => {
      if(!isLoginMode){
        setFormData(
        {
          ...formState.inputs,
            name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
      } else {
        setFormData(
          {
            ...formState.inputs,
            name: {
            value: '',  
            isValid: false
            }
          },
          false
        )
      }
      setIsLoginMode(prevMode => !prevMode);
    }

    return (
    <Card className= "authentication">
      <h2> {isLoginMode ? 'LOGIN' : 'SIGNUP'} </h2>
      <hr />
      <form onSubmit={authSubmitHandler} className="place-form">
        {!isLoginMode && 
        <Input 
        element="input"
        id = "name"
        type = "text"
        lable ="Your Name:"
        validators = {[VALIDATOR_REQUIRE()]}
        errorText = "Please enter a name."
        onInput = {inputHandler}
        />
        }
        <Input 
          element="input"
          id = "email"
          type = "email"
          lable ="E-Mail:"
          validators = {[VALIDATOR_EMAIL()]}
          errorText = "Please enter a valid email address."
          onInput = {inputHandler}
          />
        <Input 
          element="input"
          id = "password"
          type = "password"
          lable ="Password:"
          validators = {[VALIDATOR_MINLENGTH(6)]}
          errorText = "Please enter a valid password(at least 6 characters)."
          onInput = {inputHandler}
          />
        <Button type = "submit" disabled = {!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      {!isLoginMode && <h3>ALREADY HAVE AN ACCOUNT?</h3>}
      <div className="switch-button"><Button  inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </div>
    </Card>
)}

export default Auth;