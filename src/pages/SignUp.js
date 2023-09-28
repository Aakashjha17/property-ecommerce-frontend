import React from 'react';
import { Link } from 'react-router-dom';
import useLoginSubmit from '../hooks/useLoginSubmit';
import { Button } from '@windmill/react-ui';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
import './SignUp.css'

const SignUp = () => {
    const { onSubmit, register, handleSubmit, loading } = useLoginSubmit();
    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Name" />
                <InputArea
                    register={register}
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                />

                <LabelArea label="Email" />
                <InputArea
                    register={register}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                />

                <LabelArea label="Password" />
                <InputArea
                    register={register}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="***************"
                />

                <LabelArea label="Confirm Password" />
                <InputArea
                    register={register}
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    placeholder="***************"
                />

                <Button
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                >
                    Sign Up
                </Button>
            </form>

            <Link to="/login">Already have an account? Sign In</Link>
        </div>
    )

}

export default SignUp;