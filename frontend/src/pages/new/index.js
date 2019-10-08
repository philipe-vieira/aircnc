import React, { useState, useMemo } from 'react';
import api from '../../services/api.js'

import camera from '../../assets/camera.svg';
import './styles.css';
import { helpers } from 'handlebars';

export default function New( {history} ){
    const [ company, setCompany,  ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ thumbnail,setThumbnail ] = useState(null);

    const preview = useMemo( () => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail] );

    async function handleSubmit (event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {    headers: { user_id }    } );
        history.push('/dashboard');
    }
    
    return(
        <form onSubmit={ handleSubmit }>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail': ''}
                >
                <input type="file" onChange={event => setThumbnail(event.target.files[0]) }/>
                <img src={camera} alt="Select Image"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                type="text"
                placeholder="sua empresa incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="Tecs">TECNOLOGIAS *  <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                type="text"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="Price">Valor da diária <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                type="text"
                placeholder="Qual o valor da diaria? "
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}