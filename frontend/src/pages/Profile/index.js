import React, {useEffect, useState} from 'react';

import {FiPower, FiTrash2} from 'react-icons/fi'

import {Link, useHistory} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import './style.css'

import api from '../../services/api'

// import { Container } from './styles';

export default function Profile() {

    const [incidents, setIncidents] = useState([])

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    const history = useHistory();

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert("erro")
        }
    }

    async function handleLogout(){
        localStorage.clear()
        history.push("/")
    }

    useEffect(()=>{
        api.get("profile",{
            headers:{
                Authorization: ongId
            }
        }).then((response)=>{
            setIncidents(response.data)
        })
    }, [ongId])

    return (
            <div className="profile-container">
                    <header>
                        <img src={logoImg} alt="Be The Hero"/>
                        <span>Bem vinda, {ongName}</span>

                        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                        <button onClick={handleLogout}>
                            <FiPower size={18} color="#e02041"/>
                        </button>
                    </header>

                    <h1>Cassos cadastrados</h1>

                    <ul>
                        {incidents.map(incident =>(
                            <li key={incident.id}>
                                <strong>CASO {incident.id}:</strong>
                                <p>{incident.title}</p> 
        
                                <strong>DESCRIÇÃO:</strong>
                                <p>{incident.description}</p> 
        
                                <strong>VALOR:</strong>
                                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p> 
        
                                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                    <FiTrash2 size={20} color="#a8a8b3"/>
                                </button>
                            </li>
                        ))}
                    </ul>
            </div>
    );
}
