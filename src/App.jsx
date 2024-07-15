import { useState } from 'react'
import './App.css'

function App() {

  let [ data, setData ] = useState({ nome:'', email:'', senha:'', confirmeSenha: ''});
  let [ isOk, setOk ] = useState(false);
  let [errors, setErrors] = useState({});

  function handlerChange(e){

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  }

  function handlerSubmit(e){
    e.preventDefault();

    let newErrors = validation();

    if(Object.keys(newErrors).length > 0){
      setOk(false);
      setErrors(newErrors)
      console.log(errors);
    }else{
      setOk(true);
      setErrors({})
      
    }
  }

  function validation(){
    let errors_tmp = {};

    console.log(data)
    if(!data.nome){ errors_tmp.nome = 'campo vazio' };
    
    if(!data.email){
      errors_tmp.email = 'campo vazio';

    }else if(!data.email.includes('@')){
      errors_tmp.email = 'email inválido';
    }

    if(!data.senha){
      errors_tmp.senha = 'campo vazio';

    }else if(data.senha.length < 8){
      errors_tmp.senha = 'campo com menos de 8 caracteres';
    }else{
      
      if(!data.confirmeSenha){
        errors_tmp.confirmeSenha = 'campo vazio';
      }else if(data.senha !== data.confirmeSenha){
        errors_tmp.confirmeSenha = 'senhas diferentes';
      }
    }
    

    console.log(errors_tmp)
    return errors_tmp
  }

  return (
    <>
    <h3>Formulário de cadastro</h3>
    <form onSubmit={handlerSubmit}>
      <input type="text" placeholder='nome' name='nome' value={data.nome} onChange={handlerChange} />
      {errors.nome ? <p>{errors.nome}</p> : <p></p>}
      <input type="email" placeholder='email' name='email' value={data.email} onChange={handlerChange}/>
      {errors.email ? <p>{errors.email}</p> : <p></p>}
      <input type="password" placeholder='senha' name='senha' value={data.senha} onChange={handlerChange}/>
      {errors.senha ? <p>{errors.senha}</p> : <p></p>}
      <input type="password" placeholder='Digite novamente a senha...' name='confirmeSenha' value={data.confirmeSenha} onChange={handlerChange} />
      {errors.confirmeSenha ? <p>{errors.confirmeSenha}</p> : <p></p>}
      <button type="submit">Submit</button>
      {isOk ? <p>Enviado com sucesso!</p> : <p></p>}
    </form>
    </>
  )
}

export default App
