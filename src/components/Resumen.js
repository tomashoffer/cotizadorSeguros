import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import {primerMayuscula} from '../helpers';

const ContenedorResumen = styled.div`
padding: 1rem;
text-align: center;
background-color: #00838f;
color: #fff;
margin-top: 1rem;
`

const Resumen = ({datos}) => {

    const {marca, year, plan} = datos;

    if(marca === '' || year === '' || plan === '') return null;

    return ( 
        <ContenedorResumen>
            <h2>Quote Summary</h2>
            <ul>
                <li>Brand: {primerMayuscula(marca)}</li>
                <li>Plan: {primerMayuscula(plan)}</li>
                <li>Year: {primerMayuscula(year)}</li>
            </ul>
        </ContenedorResumen>
        
     );
}

Resumen.protoTypes ={
    datos: PropTypes.object.isRequired,
}

 
export default Resumen;