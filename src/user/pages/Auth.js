import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
                name: undefined,
                image: undefined
            },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else { // set form inputs for Sign IN
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = async e => {
        e.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { 'Content-Type': 'application/json' }
                );

                auth.login(responseData.userId, responseData.token);
            } catch (err) {
                // ok to be empty block, error handling in useHttpClient hook
            }
        } else {
            try {
                const formData = new FormData();
                formData.append('name', formState.inputs.name.value);
                formData.append('email', formState.inputs.email.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    formData
                );

                auth.login(responseData.userId, responseData.token);
            } catch (err) {
                // ok to be empty block
            }
        };
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
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
                    {!isLoginMode && (
                        <ImageUpload
                            center id='image'
                            onInput={inputHandler}
                            errorText='Please provide an image'
                        />
                    )}
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
        </React.Fragment>
    )
};

export default Auth;