import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [identifiedPlace, setIdentifiedPlace] = useState();
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setIdentifiedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                },
                    true
                );
            } catch (err) {
                // ok to leave empty
            }
        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    const placeUpdateSubmitHandler = async e => {
        e.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push(`/${auth.userId}/places`);
        } catch (err) {
            // ok to be empty block
        }
    };

    if (isLoading) {
        return (
            <div className='center'>
                <Card>
                    <LoadingSpinner />
                </Card>
            </div>
        );
    }

    if (!identifiedPlace && !error) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && identifiedPlace && (
                <form className='place-form' onSubmit={placeUpdateSubmitHandler} >
                    <Input
                        id='title'
                        element='input'
                        type='text'
                        label='Title'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a valid title'
                        onInput={inputHandler}
                        initialValue={identifiedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id='description'
                        element='textarea'
                        label='Description'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid description (at least 5 characters)'
                        onInput={inputHandler}
                        initialValue={identifiedPlace.description}
                        initialValid={true}
                    />
                    <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
                </form>
            )}
        </React.Fragment>
    )
};

export default UpdatePlace;