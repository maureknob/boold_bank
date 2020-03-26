import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    const bancoId = localStorage.getItem('bancoId');
    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: bancoId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert("erro ao cadastrar");
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Seja um herói" />

                    <h1>Cadastrar novo pedido</h1>
                    <p>Descreva detalhadamente um pedido para doação de sangue.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do pedido"
                    value={title}
                    onChange={ e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                    value={description}
                    onChange={ e => setDescription(e.target.value)}
                    />
                    <input placeholder="Tipo Sanguíneo"
                    value={value}
                    onChange={ e => setValue(e.target.value)}
                    />

                    <button className="button"type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}