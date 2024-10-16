import React, {useCallback, useReducer} from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from '../../shared/components/FormElements/Button'
import {useForm} from '../../shared/hooks/form-hook'
import "./PlaceForm.css";



function NewPlace(){

    const [formState, inputHandler] = useForm(
        {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    },
    false
)


    const placeSubnitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }


    return <form className="place-form" onSubmit={placeSubnitHandler}>
        <Input 
            id= "title"
            element="input" 
            type="text" 
            lable="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText = 'Please enter a valid title.'
            onInput = {inputHandler}
            />
         <Input 
            id= "description"
            element="textarea" 
            type="text" 
            lable="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText = 'Please enter a valid description(at least 5 characters).'
            onInput = {inputHandler}
            />
             <Input 
            id= "address"
            element="input" 
            type="Address" 
            lable="Address" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText = 'Please enter a valid address.'
            onInput = {inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                 ADD PLACE
            </Button>
    </form>  
}

export default NewPlace;