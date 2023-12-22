import React, {useState} from 'react'
import './Register.css'
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../../firebase/FirebaseConfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {toast, ToastContainer} from 'react-toastify'


const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");  

  const navigate = useNavigate();
  async function cadastrarUsuario(e) {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, senha)
    
    .then(()=> {
      toast.warn('Aguarde, cadastrando usuário em nosso sistema', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      setTimeout(() => {
        toast.success('Usuário cadastrado com sucesso', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },2500);

      setTimeout(() => {
        toast.info('Você foi levado para a tela de LOGIN', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          navigate("/")
      }, 3500);
      
      setEmail("");
      setSenha("");
    })

    .catch(()=> {
      alert("Usuário não cadastrado")
    })
  }
  return (
    <div className='register-container'>
        <h2>Lista de Tarefas | Cadastro</h2>
      <div className='form-container'>

        <input 
        type="email" 
        id="email" 
        placeholder='Digite seu e-mail...'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}

        />

        <input 
        type="password" 
        placeholder='Digite uma senha'
        value={senha}
        onChange={(e)=>{setSenha(e.target.value)}}
        />
        

        <button onClick={cadastrarUsuario}>Cadastrar Usuário</button>

        <Link to="/" className='link-login'>Voltar para o Login</Link>
      </div>
    </div>
  )
}

export default Register