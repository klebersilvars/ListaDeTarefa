import React, { useState, useEffect } from 'react';
import './Tarefas.css';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Tarefas = () => {
  const [tarefa, setTarefa] = useState('');
  const [tarefasBanco, setTarefasBanco] = useState([])
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadingUser() { 
      const userDetail = localStorage.getItem('@userDetail'); //buscando os dados do usuário logado
        setUser(JSON.parse(userDetail));

        if(userDetail) { //se estiver usuário logado, vou buscar as tarefas que foram criadas pelo o UID do usuário logado
          const userDetalhes = JSON.parse(userDetail)
    
          const refTarefa = collection(db, "posts")
    
          const q = query(refTarefa, where("uidd","==", userDetalhes?.uid))
    
          const unSub = onSnapshot(q, (snapshot)=> {
    
            let listaTarefas = [];
    
            snapshot.forEach((date)=> {
              listaTarefas.push({
                id: date.id,
                tarefa: date.data().tarefa,
                userUid: date.data().uidd
              })
            })
            setTarefasBanco(listaTarefas);
            console.log(tarefasBanco)
          })
        } 
    }


    
    loadingUser();
  }, []);



  async function criarTarefa () {
    if (tarefa == '') {
      toast.error('Preencha uma tarefa');
      return;
    }

    await addDoc(collection(db, 'posts'), {
      tarefa: tarefa,
      uidd: user?.uid
    })
      .then(() => {
        toast.success('Tarefa criada com sucesso', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
  
        setTarefa('');
      })
      .catch((error) => {
        toast.error('Erro ao criar a tarefa');
      });
  };

  async function deslogar() {
    await signOut(auth)
      .then(() => {
        toast.success('Usuário deslogado com sucesso');
        navigate('/');
      })
      .catch(() => {
        toast.error('Erro ao tentar sair! Sistema fora do ar');
      });
  };

  async function excluirTarefa(id) {
    await deleteDoc(doc(db, "posts", id))
    .then(()=> {
      toast.success('Tarefa deletada com sucesso', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    })
    .catch(()=> {
      toast.error('Erro ao deletar a tarefa, tente novamente mais tarde!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    })
  }

  async function concluirTarefa(id) {
    await deleteDoc(doc(db, "posts", id)) 
    .then(()=> {
      toast.success('Tarefa concluida com sucesso', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })

    .catch(()=> {
      toast.error('Erro ao concluir a tarefa, tente novamente mais tarde!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  }

  return (
    <div className="tarefas-container">
      <button onClick={deslogar} className="sair-button">
        Sair
      </button>
      <section className="main">
        <input
          placeholder="Digite a tarefa"
          className="input-tarefa"
          type="text"
          value={tarefa}
          onChange={(e) => {
            setTarefa(e.target.value);
          }}
        />
        <button onClick={criarTarefa} className="button-criar-tarefa">
          Criar tarefa
        </button>
      </section>

      
      <div className='lista-tarefas'>
        {tarefasBanco.map((index) => (
          <article key={index.id} className='box-tarefa'>
            <p>{index.tarefa}</p>
            <div className='btn-container'>
              <button onClick={()=> {excluirTarefa(index.id)}} className="excluir-tarefa">Excluir tarefa</button>
              <button onClick={()=> {concluirTarefa(index.id)}} className='concluir-tarefa'>Concluir tarefa</button>
            </div>
          </article>
        ))}
      </div>
      
    </div>
  );
};

export default Tarefas;
