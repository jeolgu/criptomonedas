import React, { Component } from 'react';
import Cargando from '../images/cargando.gif';
import grafica from '../images/grafica.png';
import {getFecha} from '../global/global.js';
// import {DetalleCriptoMoneda} from './DetalleCriptoMoneda.js'

export default class CriptoMonedaItem extends Component{

  render() {

    const { criptomoneda } = this.props;
    const { estado } = this.props;

    if(estado[criptomoneda.codigo]["FILTRADO"] === 1 || estado[criptomoneda.codigo]["FILTRADO"] === undefined){

      return (

        <tbody>
          <tr>
            <td data-codigo={criptomoneda.codigo}>{criptomoneda.codigo}</td>
            <td>{criptomoneda.nombre}</td>
            <td>{_getValorMarket(estado, criptomoneda.codigo)}</td>
            <td>{_getValorCierre(estado, criptomoneda.codigo)}</td>
            <td>{_getValorVolumen(estado, criptomoneda.codigo)}</td>
            <td>
              <button className="button is-info detalle" onClick={_getDetalles}>
                <img className="icono-grafica" src={grafica} alt="grafica" />
              </button>
            </td>
          </tr>
        </tbody>
      )
    }
    else{

      return false
    }
  }
}

function getValor(estado, codigo, fecha, busqueda){

  var valor = undefined
  if(estado[codigo]["HISTORICO"] !== undefined
    && Object.keys(estado[codigo]["HISTORICO"]).length > 0 ) {

    var indice_

    Object.keys(estado[codigo]["HISTORICO"][fecha]).forEach(
        function(a){
            if(a.indexOf(busqueda) !== -1) { indice_ = a; }
        })

    valor = estado[codigo]["HISTORICO"][fecha][indice_]
  }

  return valor
}

function comprobarEstado(estado, codigo){

  if(
    estado !== undefined
    && estado[codigo] !== undefined
    && Object.keys(estado[codigo]).length > 0
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

function _renderView(estado, codigo, busqueda, moneda){

  if(comprobarEstado(estado,codigo)){

    const fecha_completa = "2019-06-19"//getFecha();
    var valor = getValor(estado, codigo, fecha_completa, busqueda)

    if(valor !== undefined){

      return ( valor + " " + moneda )
    }
    else{

      return( _devuelveCargando() )
    }
  }
  else{

    return(

      _devuelveCargando()
    )
  }
}

function _getValorMarket(estado, codigo, moneda = "USD"){

  const busqueda = "market cap";

  return (

    _renderView(estado, codigo, busqueda, moneda)
  )
}

function _getValorCierre(estado, codigo, moneda = "EUR"){

  const busqueda = "close ("+moneda+")";

  return (

    _renderView(estado, codigo, busqueda, moneda = "EUR")
  )
}

function _getValorVolumen(estado, codigo, moneda = "EUR"){

  const busqueda = "volume";

  return (

    _renderView(estado, codigo, busqueda, moneda)
  )
}

function _getDetalles(){

    var elemento = document.getElementById("modal_detalle")
    elemento.classList.add("is-active")
}
