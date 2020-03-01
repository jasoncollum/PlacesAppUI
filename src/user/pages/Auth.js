import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

const Auth = props => {
    const [formState, inputHandler] = useForm({
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

    const authSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs); // <-- Future logic to send data to backend ***
    };

    return (
        <form className='auth-form' onSubmit={authSubmitHandler}>
            <Input
                id='email'
                element='input'
                type='email'
                label='Email'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter a valid email'
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
            <Button type='submit' disabled={!formState.isValid}>SIGN IN</Button>
        </form>
    )
};

export default Auth;