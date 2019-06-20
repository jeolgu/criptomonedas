import React, {Component} from 'react';
import criptomonedas from '../data/criptomonedas.json';
import CriptoMonedaItem from '../componentes/CriptoMonedaItem.js';
import {getFecha} from '../global/global.js';
import ASC from '../images/asc.png';
import btc from '../data/BTC.json';

// const API_KEY = "L70IBKBWZI5PIGD9";
const API_KEY = "HF8URGNBZ0AVR9I5";
const URL_API = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY";
// const URL_API = "../data/BTC.json";
var ORDENAR = {"MARKET": "", "CIERRE": "", "VOLUMEN": ""}

function peticionApi(me, codigo, moneda = "EUR"){

  var dir_api = `${URL_API}&symbol=${codigo}&market=${moneda}&apikey=${API_KEY}}`
  // var dir_api = `${URL_API}`//`${URL_API}/${codigo}.json`
  var datos = {}

  fetch(dir_api)
    .then(res => res.json() )
    .then(results => {

      if(results.Note === undefined){

        var fecha = getFecha();
        datos[codigo] = {

          "META":results[Object.keys(results)[0]],
          "HISTORICO" :results[Object.keys(results)[1]],
          "ERROR": 0,
          "CODIGO": codigo
        };

        if(datos[codigo]["HISTORICO"][fecha] !== undefined) {

          Object.keys(datos[codigo]["HISTORICO"][fecha]).forEach(function(a){

            if(a.indexOf("market cap") !== -1){

              datos[codigo]["MARKET"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
            }
            else if(a.indexOf("volume") !== -1){

              datos[codigo]["VOLUMEN"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
            }
            else if(a.indexOf("close (" + moneda) !== -1){

              datos[codigo]["CIERRE"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
            }
          })
        }

        if(datos[codigo]["FILTRADO"] !== undefined){

          if(datos[codigo]["FILTRADO"] === 1){

            datos[codigo]["FILTRADO"] = 1
          }
          else{

            datos[codigo]["FILTRADO"] = 0
          }
        }
        else{

          datos[codigo]["FILTRADO"] = 1
        }

        me.setState( datos )
      }
      else if(results.Note !== undefined){

        // Hacemos que la petición fallida
        // se lanze al minuto y un segundo
        // ya que la api solo responde a 5 peticiones en un minuto.

        setTimeout( function(){

          peticionApi(me, codigo)
        }, 61000)
      }
      else{

        alert("Upps! Error con la conexión a la API")
      }
    })
}

function json_local(me, codigo, moneda = "EUR"){

  var results = btc
  var datos = {}
  var fecha = getFecha();
  datos[codigo] = {

    "META":results[Object.keys(results)[0]],
    "HISTORICO" :results[Object.keys(results)[1]],
    "ERROR": 0,
    "CODIGO": codigo
  };

  if(datos[codigo]["HISTORICO"][fecha] !== undefined) {

    Object.keys(datos[codigo]["HISTORICO"][fecha]).forEach(function(a){

      if(a.indexOf("market cap") !== -1){

        datos[codigo]["MARKET"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
      }
      else if(a.indexOf("volume") !== -1){

        datos[codigo]["VOLUMEN"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
      }
      else if(a.indexOf("close (" + moneda) !== -1){

        datos[codigo]["CIERRE"] = parseFloat(datos[codigo]["HISTORICO"][fecha][a])
      }
    })
  }

  if(datos[codigo]["FILTRADO"] !== undefined){

    if(datos[codigo]["FILTRADO"] === 1){

      datos[codigo]["FILTRADO"] = 1
    }
    else{

      datos[codigo]["FILTRADO"] = 0
    }
  }
  else{

    datos[codigo]["FILTRADO"] = 1
  }

  me.setState( datos )
}

export class Home extends Component {

  constructor(){

    super()

    var datos = {};
    criptomonedas.map(function(a){

      return a.codigo;
    }).forEach(function(a){

      datos[a] = {}
      datos[a]["FILTRADO"] = 1
      datos[a]["CODIGO"] = a
      datos[a]["MARKET"] = 0.00
      datos[a]["CIERRE"] = 0.00
      datos[a]["VOLUMEN"] = 0.00
    })

    this.state = datos;
  }

  componentDidMount () {

    var me = this;
    criptomonedas.forEach(function(criptomoneda){

        // peticionApi(me, criptomoneda.codigo);
        json_local(me, criptomoneda.codigo);
    })
  }

  _renderChanges(){

    console.log("hay cambios");
    console.log(this.state);
  }

  _filtrarDatos = (e) => {

    e.preventDefault();
    var me = this;
    console.log("click filtro");
    var valor_filtro = document.getElementById("filtro").value;

    // var indice_ = Object.keys(me.state).findIndex(function(a){ if(a === valor_filtro){ return true; } })
    // if(indice_ !== undefined && indice_ !== -1){

        var obj_ = me.state

         Object.keys(me.state).forEach(function(a){

           if(a !== valor_filtro) {

             obj_[a]["FILTRADO"] = 0;
           }
         })

        obj_[valor_filtro]["FILTRADO"] = 1;

        this.setState(obj_);
    // }
  }

  _quitarFiltro = (e) => {

    e.preventDefault();
    var me = this;
    document.getElementById("filtro").value = ""
    var obj_ = me.state

    Object.keys(me.state).forEach(function(a){

       obj_[a]["FILTRADO"] = 1;
     })

    this.setState(obj_);
  }

  // _getOrdernar(tipo){
  _getOrdernar = (e) => {

    var me = this
    var tipo = e.target.getAttribute("data-orden")
    var arr_ = []
    var cp = me.state;
    Object.keys(cp).forEach(function(a,b) { arr_.push(cp[a]) })

    Object.keys(ORDENAR).forEach(function(a){

      if(a === tipo){

        switch(ORDENAR[a]){

          case "ASC":
            ORDENAR[a] = "DESC"
            arr_.reverse(function(b,c){ return c[a] - b[a]})
          break
          case "DESC":
            ORDENAR[a] = "ASC"
            arr_.sort(function(b,c){ return b[a] - c[a]})
          break
          default:
            ORDENAR[a] = "ASC"
            arr_.sort(function(b,c){ return b[a] - c[a]})
          break
        }
      }
      else{

        ORDENAR[a] = "";
      }
    })

    var obj_new = {};
    arr_.forEach(function(a){

      obj_new[a.CODIGO] = a
    })

console.log(obj_new)

    me.setState(obj_new, function(){

      console.log("estado cambiado")
      console.log(this.state)
    })
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
              <th className="cursor" data-orden="MARKET" onClick={this._getOrdernar}>
                Market Cap
                <img className="boton_orden oculto" src={ASC} alt="asc" />
              </th>
              <th className="cursor" data-orden="CIERRE" onClick={this._getOrdernar}>
                Precio Cierre
                <img className="boton_orden oculto" src={ASC} alt="asc" />
              </th>
              <th className="cursor" data-orden="VOLUMEN" onClick={this._getOrdernar}>
                Volumen
                <img className="boton_orden oculto" src={ASC} alt="asc" />
              </th>
            </tr>
          </thead>
          {
            criptomonedas.map(cmoneda => {

              return <CriptoMonedaItem key={cmoneda.id} criptomoneda={cmoneda} estado={this.state} />
            })
          }

        </table>
      </header>
    )
  }
}
