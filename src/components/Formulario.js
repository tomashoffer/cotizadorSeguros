import React, { useState } from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helpers';

const Campo = styled.div`
display: flex;
margin-bottom: 1rem;
align-items: center;
`;
const Label = styled.label`
flex: 0 0 100px;
`;
const Select = styled.select`
display: block;
width: 100%100px;
padding: 1rem;
border: 1px solid #E1E1E1;
-webkit-appearance: none;
`;
const InputRadio = styled.input`
margin: 0 1rem;
`;
const Button = styled.button`
background-color:#00838f;
font-size: 16px;
width: 100%;
padding: 1rem;
color: #fff;
text-transform: uppercase;
font-weight: bold;
border: none;
transition: background-color .3s ease; 
margin-top: 2rem;

&:hover { 
    cursor: pointer;
    background-color: #26C6DA
}
`;
const Error = styled.div`
background-color: red;
color: white;
padding: 1rem;
width: 100%;
margin-bottom: 2rem;
text-align: center;
`;


const Formulario = ({guardarResumen, guardarCargando}) => {

    const [ datos, guardarDatos ] = useState({
        marca:'',
        year:'',
        plan:''
    })
    const [error, guardarError] = useState(false)
    // Extraer los valores del State
    const {marca, year, plan} = datos;

    //  Leer los datos del form y colocarlos en el state
    const obtenerDatos = e =>{
        guardarDatos({
            ...datos, [e.target.name] : e.target.value
        })
    }
    const cotizarSeguro = e =>{
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true)
            return; 
        }

        guardarError(false)
    
    // Base
    let resultado = 2000;
    // Obtener diferencia de año
    const diferencia = obtenerDiferenciaYear(year);
    // Por cada año restar 3%
    resultado -= ((diferencia * 3) * resultado ) / 100;
     // Armericano 15% - Europeo - 30% Asiatico 5%
    resultado = calcularMarca(marca) * resultado;
    // Plan Basico 20% - Plan Completo 50%
    const incrementoPlan = obtenerPlan(plan)
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2)
    // Spinner
    guardarCargando(true)
    setTimeout(()=>{
        // elimina spinner
        guardarCargando(false)
        // pasa info a componente principal
        guardarResumen({
            cotizacion: Number(resultado),
            datos
        });
    }, 2000)
 
}
    return ( 
        <form 
        onSubmit={cotizarSeguro}>
            {error ? <Error>All fields are required</Error> :  null}
            <Campo>
                <Label htmlFor="">Brand</Label>
                <Select name="marca" value={marca} onChange={obtenerDatos}>
                    <option value="">--Select--</option>
                    <option value="american">American</option>
                    <option value="european">European</option>
                    <option value="asiatic">Asiatic</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Year</Label>
                <Select name="year" value={year} onChange={obtenerDatos}>
                    <option value="">-- Select --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Plan</Label>
                <InputRadio 
                type="radio"
                name='plan'
                value='basic' 
                checked={plan === 'basic'}
                onChange={obtenerDatos}
                />Basic
                <InputRadio 
                type="radio"
                name='plan'
                value='complete' 
                checked={plan === 'complete'}
                onChange={obtenerDatos}
                />Complete
            </Campo>
            <Button type='submit'>Quote</Button>
        </form>
     );
}
 
Formulario.protoTypes ={
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;