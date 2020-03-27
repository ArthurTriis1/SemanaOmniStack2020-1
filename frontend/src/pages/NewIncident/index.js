import React, {useState} from 'react';

import "./style.css"
import {FiArrowLeft, FiAlertOctagon} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import api from '../../services/api';
// import { Container } from './styles';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId')

    const history = useHistory();


    async function handleNewSubmit(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile')
        } catch (error) {
            alert("Erro ao cadastrar caso")
        }
    }
    
 
  return (
    <div className="new-incident-container">

        <div className="content">

            <section>

                <img src={logoImg} alt="Be The Hero"/>

                <h1>Cdastrat novo caso</h1>

                <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>

            </section>

            <form onSubmit={handleNewSubmit}>

                <input type="text" placeholder="Titulo do caso"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}/>
                <textarea placeholder="Descrição"
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}/>
                <input type="text" placeholder="Valor em reais"
                onChange={(e) => {setValue(e.target.value)}}
                value={value}/>
                    

                <button className="button" type="submit">Cadastre-se</button>
            </form>

        </div>

    </div>
  );
}
