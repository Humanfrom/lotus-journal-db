import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import './authorisation.css';
import { login } from '../actions/user';

const Login = () => {
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    console.log('LOGIN_CLASS: ',userLogin, password);

    const userAuthorisation = () => dispatch(login(userLogin, password));

    return (
        <div className='authorisation'>
            <div className="authorisation__header">Авторизация</div>
            <Input value={userLogin} setValue={setUserLogin} type="text" placeholder="Введите логин..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorisation__btn" onClick={userAuthorisation}>Войти</button>
        </div>
    );
};

export default Login;