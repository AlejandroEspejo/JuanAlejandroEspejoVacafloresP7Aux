import React, {useState} from "react";

import "./App.css";


const Login = () => {

    const [ user, setUser ] = useState('');
    
    const [ password, setPassword ] = useState('');
    
    const [ passwordError, setPasswordError ] = useState(false);

    const [ userError, setUserError ] = useState(false);
    
    const [ isLogin, setIsLogin ] = useState(false);
    
    const [ hasError, setHasError ] = useState(false);

    const [ paramUser, setParamUser ] = useState(false);

    const [ paramPassword, setParamPassword ] = useState(false);

    function handleChange(name, value){
        if(name === 'usuario'){
            if(value.length === 0){
              setUserError(false);
            }
            else if(!(/^[a-zA-Z0-9_.+-]+@(gmail|hotmail|yahoo)+\.[com]+$/.test(value))){
              setUserError(true);
              setParamUser(true);
            } else {
              setUserError(false);
              setUser(value);
              setHasError(false);
              setParamUser(false);
            }
            
        } else{
            if(value.length === 0){
                setPasswordError(false);
            } else if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))){
                setPasswordError(true);
                setParamPassword(true);
            } else {
                setPasswordError(false);
                setPassword(value);
                setHasError(false);
                setParamPassword(false);
            }
        }
    }

    function ifMatch(param){
      if(param.user.length > 0 && param.password.length > 0){
          if(param.user === 'user@gmail.com' && param.password === 'password1'){
              const { user, password } = param;
              let ac = { user, password};
              let account =ac;
              localStorage.setItem('account', account);
              setIsLogin(true);
          } else {
              setIsLogin(false);
              setHasError(true);
          }
      } else {
          setIsLogin(false);
          setHasError(true);
      }
  }

  function handleSubmit() {
        let account = { user, password };
        if(account){
            ifMatch(account);
        }
  }

  return (
    <div className='login-container'>
            { isLogin ? 
                <div className="home-content">
                    <h1>Hola {user}</h1>
                    <p>Estas en Linea</p>
                </div>
                : 
                <div>
                    <div className='login-title'>
                        <label> INICIO DE SESION </label>
                    </div>   
                    <div className='login-content'>
                    { hasError &&
                        <label className='label-alert'>
                            Usuarios o contraseña incorrectos
                        </label>
                    }
                    <p>
                        {"\n"}
                    </p>
                    <label> Usuario </label>
                    <p>
                    {"\n"}
                    </p>
                    <input              
                          id='usuario'
                          name='usuario' 
                          placeholder='ingrese su correo'
                          type='text'
                          onChange= {(e) => handleChange(e.target.name, e.target.value)}
                          className = { paramUser ? 'input-error' : 'regular-style'}
                    />
                    <p>
                    {"\n"}
                    </p>
                    { userError &&
                    <label className='label-error'>
                        usuario no valido o incorrecto
                    </label>
                    }
                    <p>
                    {"\n"}
                    </p>
                    <label> Contraseña </label>
                    <p>
                    {"\n"}
                    </p>
                    <input              
                          id='contraseña'
                          name='contraseña' 
                          placeholder='ingrese su contraseña'
                          type='password'
                          onChange= {(e) => handleChange(e.target.name, e.target.value)}
                          className = { paramPassword ? 'input-error' : 'regular-style'}
                    />
                    <p>
                    {"\n"}
                    </p>
                    { passwordError &&
                    <label className='label-error'>
                        Contraseña no valida o incorrecta
                    </label>
                    }
                    <button onClick={handleSubmit} className='sumbit'>
                        Ingresar
                    </button>
                    </div> 
                </div> 
            }
        </div>      
  );
};

export default Login;