import React from 'react';
import { Link } from 'react-router-dom';
import useLoginSubmit from '../hooks/useLoginSubmit';
import { Button } from '@windmill/react-ui';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';

const Login = () => {
    const { onSubmit, register, handleSubmit, loading } = useLoginSubmit();

    return (
        <>
            <div className="auth-form-container">
                <h2>Sign In</h2>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <LabelArea label="Email" />
                    <InputArea
                        register={register}
                        //   defaultValue="admin@gmail.com"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john@doe.com"
                    />
                    <div className="mt-6"></div>
                    <LabelArea label="Password" />
                    <InputArea
                        register={register}
                        //  defaultValue="12345678"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="***************"
                    />

                    <Button
                        disabled={loading}
                        type="submit"
                        className="mt-4 h-12 w-full"
                        to="/"
                    >
                        Log in
                    </Button>
                </form>

                <Link to="/signup">Create account</Link>
            </div>
        </>
    )

}

export default Login;
