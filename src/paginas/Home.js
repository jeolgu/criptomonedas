import React, {Component} from 'react';
import criptomonedas from '../data/criptomonedas.json';
import CriptoMonedaItem from '../componentes/CriptoMonedaItem.js';

const API_KEY = "L70IBKBWZI5PIGD9";
const URL_API = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY";

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
          "ERROR": 0,
          "CODIGO": codigo
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

        peticionApi(me, criptomoneda.codigo);
    })
  }

  _renderChanges(){
    console.log("hay cambios");
    console.log(this.state);
  }

  _filtrarDatos = (e) => {

    e.preventDefault();
    var me = this;
    debugger;
    console.log("click filtro");
    var valor_filtro = document.getElementById("filtro").value;


  }

  _quitarFiltro = (e) => {

    e.preventDefault();
    debugger;
    console.log("quitar filtro");
  }

  render () {

    return(

      <header className="App-header">
        <div className="field has-addons central">

            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Código criptomoneda"
                id="filtro"
                name="textoFiltro"
                ref={inputElement => this.inputFiltro = inputElement} />
            </div>
            <div className="control">
              <button className="button is-info filtro" onClick={this._filtrarDatos}>
                Filtrar
              </button>
            </div>

            <div className="control limpiar_filtro">
              <button className="button is-info limpiar" onClick={this._quitarFiltro}>
                Limpiar
              </button>
            </div>

        </div>

        <table className="table footer">
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

              return <CriptoMonedaItem key={cmoneda.id} criptomoneda={cmoneda} estado={this.state} />
            })
          }

        </table>
        {this._renderChanges()}
      </header>
    )
  }
}
