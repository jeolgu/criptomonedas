import React, {Component} from 'react';
import criptomonedas from '../data/criptomonedas.json'
import Cargando from '../images/cargando.gif';

const API_KEY = "L70IBKBWZI5PIGD9";
const URL_API = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY";

class CriptoMonedaItem extends Component{

  render() {

    const { criptomoneda } = this.props;
    return (
          <tbody>
            <tr>
              <td>{criptomoneda.codigo}</td>
              <td>{criptomoneda.nombre}</td>
              <td>{_getValorMarket(this.state,criptomoneda.codigo)}</td>
              <td>{_getValorCierre(this.state,criptomoneda.codigo)}</td>
              <td>{_getValorVolumen(this.state,criptomoneda.codigo)}</td>
            </tr>
          </tbody>
    );
  }
}

function comprobarEstado(state, codigo){

  if(
    state !== null
    && state[codigo] !== null
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

function peticionApi(me, codigo, moneda = "EUR"){

  var dir_api = `${URL_API}&symbol=${codigo}&market=${moneda}&apikey=${API_KEY}}`
  var datos = {}

  fetch(dir_api)
    .then(res => res.json())
    .then(results => {

      if(results.Note === undefined){

        datos[codigo] = {

          "META":results[Object.keys(results)[0]],
          "HISTORICO" :results[Object.keys(results)[1]],
          "ERROR": 0
        };

        me.setState( datos )
      }
      else if(results.Note !== undefined){

        // Hacemos que la petición fallida
        // se lanze al minuto y un segundo
        // ya que la api solo responde a 5 peticiones en un minuto.

        setTimeout( function(){

          peticionApi(me, codigo)
        }, 6000)
      }
      else{

        alert("Upps! Error con la conexión a la API")
      }
    })
}

export class Home extends Component {

  constructor(){

    super()

    var datos = {};
    criptomonedas.map(function(a){

      return a.codigo;
    }).forEach(function(a){

      datos[a] = {}
    })

    this.state = datos;
  }

  componentDidMount () {

    var me = this;
    criptomonedas.forEach(function(criptomoneda){

        // peticionApi(me, criptomoneda.codigo);
    })
  }

  _renderChanges(){



    console.log(this.state);
  }

  render () {

    return(

      <header className="App-header">
        <p> HOME </p>
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Filtrar criptomoneda" />
          </div>
          <div className="control">
            <button className="button is-info filtro">
              Filtrar
            </button>
          </div>

          <div className="control limpiar_filtro">
            <button className="button is-info limpiar">
              Limpiar
            </button>
          </div>
        </div>

        <table className="table">

          <thead>
            <tr>
              <th>Código</th>
              <th>Criptomoneda</th>
              <th>Market Cap</th>
              <th>Precio Cierre</th>
              <th>Volumen</th>
            </tr>
          </thead>

          {
            criptomonedas.map(cmoneda => {

              return <CriptoMonedaItem key={cmoneda.id} criptomoneda={cmoneda} />
            })
          }

        </table>

        {this._renderChanges()}


      </header>
    )
  }
}
