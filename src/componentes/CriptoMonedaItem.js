import React, { Component } from 'react';
import Cargando from '../images/cargando.gif';
import {getFecha} from '../global/global.js';
import {DetalleCriptoMoneda} from './DetalleCriptoMoneda.js'

export default class CriptoMonedaItem extends Component{

  _getDetalles = (e) => {

    var me = this
        me.state = this.props.estado

    e.preventDefault();
    var codigo = e.currentTarget.getAttribute("data-codigo")

    return(

      <DetalleCriptoMoneda key={codigo} estado={me.state}/>
    )
  }

  render() {

    const { criptomoneda } = this.props;
    const { estado } = this.props;

    if(estado[criptomoneda.codigo]["FILTRADO"] === 1 || estado[criptomoneda.codigo]["FILTRADO"] === undefined){
      return (

        <tbody data-codigo={criptomoneda.codigo} onClick={this._getDetalles}>
          <tr>
            <td>{criptomoneda.codigo}</td>
            <td>{criptomoneda.nombre}</td>
            <td>{_getValorMarket(estado, criptomoneda.codigo)}</td>
            <td>{_getValorCierre(estado, criptomoneda.codigo)}</td>
            <td>{_getValorVolumen(estado, criptomoneda.codigo)}</td>
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

    const fecha_completa = getFecha();
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
