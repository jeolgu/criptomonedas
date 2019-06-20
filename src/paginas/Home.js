import React, {Component} from 'react';
import criptomonedas from '../data/criptomonedas.json'

const API_KEY = "L70IBKBWZI5PIGD9";
const URL_API = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY";

class CriptoMonedaItem extends Component{

  render() {
    const { criptomoneda } = this.props;
    return (

        <li>
          <p>Market Cap: {criptomoneda.codigo} </p>
          <p>Nombre: {criptomoneda.nombre} </p>
        </li>
    );
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

  render () {

    return(

      <header className="App-header">
        <p> HOME </p>
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Find a repository" />
          </div>
          <div className="control">
            <a className="button is-info filtro">
              Buscar
            </a>
          </div>

          <div className="control limpiar_filtro">
            <a className="button is-info limpiar">
              Limpiar
            </a>
          </div>
        </div>

        <ul>
          {
            criptomonedas.map(cmoneda => {
              return (<h1 key={cmoneda.codigo}>{cmoneda.codigo}</h1>)
              // return <CriptoMonedaItem key={cmoneda.id} criptomoneda={cmoneda} />
            })
          }
        </ul>

      </header>
    )
  }
}
