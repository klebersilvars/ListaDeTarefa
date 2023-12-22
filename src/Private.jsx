import {useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/FirebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Private ({children}) {

    const [loading, setLoading] = useState(true) //começa carregando até chegar um usuário
    const [signed, setSigned] = useState(false) //só vira true quando tiver usuário logado

    useEffect(()=> {
    async function checkLogin() {
        const check = onAuthStateChanged(auth, (user)=> {
           
            //verifico se tem usuário logado

            if(user) {
                const userData = {
                    uid: user.uid,
                    email: user.email
                }
                localStorage.setItem("@userDetail", JSON.stringify(userData))

                setLoading(false)
                setSigned(true)
            }else {
                setSigned(false)
                setLoading(false)
            }

            
        })
    }

    checkLogin();
    }, [])

    if(loading) { //verificando se está em fase de carregamento (sinal que o usuário não está logado)
        return(
            <div></div>
        )
    }

    if(!signed) { // verificando se o usuário não está conectado, se não estiver, ele não consegue avançar para a página de tarefas
        return(
            <Navigate to="/"/>
        )
    }

   
    return children
}