import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import './authorisation.css';
import { login } from '../actions/user';

const Login = () => {
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className='authorisation'>
            <div className="authorisation__header">Авторизация</div>
            <Input value={login} setValue={setLogin} type="text" placeholder="Введите login..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorisation__btn" onClick={() => dispatch(login(userLogin, password))}>Войти</button>
        </div>
    );
};

export default Login;