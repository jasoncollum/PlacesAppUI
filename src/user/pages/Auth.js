import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = props => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) { // set form inputs for Sign UP
            setFormData({
                ...formState.inputs,
                name: undefined
            },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else { // set form inputs for Sign IN
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs); // <-- Future logic to send data to backend ***
    };

    return (
        <Card className='authentication'>
            <h2>Login Required</h2>
            <hr />
            <form className='auth-form' onSubmit={authSubmitHandler}>
                {!isLoginMode && <Input
                    id='name'
                    element='input'
                    type='text'
                    label='Your Name'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a name'
                    onInput={inputHandler}
                />}
                <Input
                    id='email'
                    element='input'
                    type='email'
                    label='Email'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address'
                    onInput={inputHandler}
                />
                <Input
                    id='password'
                    element='input'
                    type='password'
                    label='Password'
                    validators={[VALIDATOR_MINLENGTH(7)]}
                    errorText='Please enter a password with at least 7 characters'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    {isLoginMode ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGN UP' : 'SIGN IN'}
            </Button>
        </Card>
    )
};

export default Auth;