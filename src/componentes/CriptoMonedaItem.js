import React, { Component } from 'react';
import Cargando from '../images/cargando.gif';

export default class CriptoMonedaItem extends Component{

  render() {

    const { criptomoneda } = this.props;
    debugger;
    return (
          <tbody>
            <tr>
              <td>{criptomoneda.codigo}</td>
              <td>{criptomoneda.nombre}</td>
              <td>{_getValorMarket(criptomoneda.estado, criptomoneda.codigo)}</td>
              <td>{_getValorCierre(criptomoneda.estado, criptomoneda.codigo)}</td>
              <td>{_getValorVolumen(criptomoneda.estado, criptomoneda.codigo)}</td>
            </tr>
          </tbody>
    );
  }
}

function comprobarEstado(state, codigo){
debugger;
  if(
    state !== undefined
    && state[codigo] !== undefined
  )
  {
    return true
  }
  else{

    return false
  }
}

function _devuelveCargando(){

  return(

    <img src={Cargando} alt="cargando" className="cargando" />
  )
}

function _getValorMarket(state, codigo){

  if(comprobarEstado(state,codigo)){

    return (

      state[codigo].market
    )
  }
  else{

    return(

      _devuelveCargando()
    )
  }
}

function _getValorCierre(state, codigo){

  if(comprobarEstado(state,codigo)){

    return (

      state[codigo].market
    )
  }
  else{

    return(

      _devuelveCargando()
    )
  }
}

function _getValorVolumen(state, codigo){

  if(comprobarEstado(state,codigo)){

    return (

      state[codigo].market
    )
  }
  else{

    return(

      _devuelveCargando()
    )
  }
}
