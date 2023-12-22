import React, {useState} from 'react';
import './Home.css';
import {Link, useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify'
import {auth} from '../../firebase/FirebaseConfig';

const Home = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [MostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function handleMostrarSenha() {
    setMostrarSenha(!MostrarSenha);
  }

  async function logarUsuario() {
    if(email.length == '' && pass.length == '') {

      toast.error("Preencha os campos corretamente!")
      
    }else {
      await signInWithEmailAndPassword(auth, email, pass)

      .then((data)=> {

        setTimeout(() => {
          toast.success("Usuário logado, seja bem vindo " + data.user.email)
          navigate('/tarefas')
        },2000);
      })

      .catch((error)=> {
        toast.error("Essa conta não existe, tente novamente")
      })

    }
  }
  return (
    <div className='home-container'>
      <h2>Lista de tarefas</h2>
        <div className='box-container-login'>
              <input 
              type="email" 
              name="email" 
              id="email"
              className='input-email'
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}
              placeholder='Digite seu e-mail'
              />

              <input 
              type={ MostrarSenha ? 'text' : 'password'}
              name="password" 
              id="password" 
              className='input-password'
              value={pass}
              onChange={(e)=> {setPass(e.target.value)}}
              placeholder='*******'
              />

        <div className='input-checkbox'>
          <label>
            <input
              onChange={handleMostrarSenha}
              className='checkInput'
              type='checkbox'
            />{' '}
            Mostrar Senha
          </label>
        </div>
            <Link className='link-register' to="/register">Não tem uma conta? Cadastre-se</Link>
            <button onClick={logarUsuario}>Entrar</button>
            
        </div> 


    </div> /* CONTAINER MAIN*/
  )
}

export default Home;