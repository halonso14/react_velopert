import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const { value, name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            }),
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if([username, password, passwordConfirm].includes('')) {
            setError('Empyt value is not allowed.');
            return;
        }

        if(password !== passwordConfirm) {
            setError('Password does not match.');
            dispatch(changeField({ form: 'register', key: 'passowrd', value: ''}));
            dispatch(changeField({ form: 'register', key: 'passowrdConfirm', value: ''}));
            return;
        }
        dispatch(register({ username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            if(authError.response.status === 409) {
                setError('Account is already registered.');
                return;
            }
            setError('Failed to register.');
            return;
        }

        if(auth) {
            console.log('Success');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);