import React, { useState } from 'react';
import Input from '../../utils/input/Input';
import './authorisation.css';
import { registration } from '../actions/user';

const Registration = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='authorisation'>
            <div className="authorisation__header">Регистрация</div>
            <Input value={login} setValue={setLogin} type="text" placeholder="Введите логин..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorisation__btn" onClick={() => registration(login, password)}>Зарегестрироваться</button>
        </div>
    );
};

export default Registration;