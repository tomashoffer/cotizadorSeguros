import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import {TransitionGroup, CSSTransition} from 'react-transition-group'


const Mensaje = styled.p`
padding: 1rem;
text-align: center;
background-color: rgb(127, 224, 237);
margin-top: 2rem;
`
const TextoCotizacion = styled.p`
padding: 1rem;
color: #00838f;
text-transform: uppercase;
font-weight: bold;
margin: 0;
`
const ResultadoCotizacion = styled.p`
padding: .5rem;
text-align: center;
border: 1px solid #26C6DA;
background-color: rgb(127, 224, 237);
margin-top: 1rem;
position: relative;
`


const Resultado = ({cotizacion}) => {
    return (
        (cotizacion === 0) 
        ? <Mensaje>Choose brand, year and type of insurance</Mensaje>
        : 
        (   <ResultadoCotizacion>
                <TransitionGroup
                component='span'
                className='resultado'
                >
                    <CSSTransition
                    classNames='resultado'
                    key={cotizacion}
                    timeout={{enter: 500, exit: 500}}
                    >
                        <TextoCotizacion>Total: $<span>{cotizacion}</span></TextoCotizacion>
                    </CSSTransition>
                </TransitionGroup>
            </ResultadoCotizacion>
        )

     );
}

Resultado.protoTypes ={
    cotizacion: PropTypes.number.isRequired,
}

 
export default Resultado;