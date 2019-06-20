import React, { Component } from 'react';
import { Chart } from "react-charts";

export class DetalleCriptoMoneda extends Component {

  _getTitulo(estado, moneda = "EUR", cripto = "BTC"){

      if(estado[cripto]["META"] !== undefined){

      var indice_cripto = Object.keys(estado[cripto]["META"]).find(function(a) {
        if(a.indexOf("Digital Currency Name") !== -1) {
           return true;
         }
       })

       var cripto_moneda = estado[cripto]["META"][indice_cripto]

       var indice_fecha = Object.keys(estado[cripto]["META"]).find(function(a) {
         if(a.indexOf("Last Refreshed") !== -1) {
            return true;
          }
        })

        var ultima_actu = estado[cripto]["META"][indice_fecha]

       return(

         <div className="titulo_modal">
            <div>
              <p>Nombre: {cripto_moneda}</p>
              <p>Moneda: {moneda}</p>
            </div>
            <div>
              <p>Última actualización:</p>
              <p> {ultima_actu}</p>
            </div>
         </div>
       )

    }
  }

  render(){

    // const { codigo } = this.props.codigo;
    const { estado } = this.props.estado
    const el = this.props

    var datos = [];

    if(el.estado[el.codigo]["HISTORICO"] !== undefined){

        Object.keys(el.estado[el.codigo]["HISTORICO"]).forEach(function(a){

            var f_ = a.split("-").pop();
            var indice_f = Object.keys(el.estado[el.codigo]["HISTORICO"][a]).find(function(b) {

                if(b.indexOf("close (EUR)") !== -1){

                    return true;
                }
            })

            var valor_f = el.estado[el.codigo]["HISTORICO"][a][indice_f]
            datos.push({x: f_, y: valor_f})
        })
    }

    if(datos.length === 0){

      datos.push({x:0,y:0})
    }

      const data = [
        {
          label: "JUNIO",
          data: datos
        }
      ];

    return(

      <div className="modal" id='modal_detalle'>
        <div className="modal-background"></div>
          <div className="modal-content">
            <article className="message">
              <div className="message-header">
                {this._getTitulo(this.props.estado)}
                <button className="delete" aria-label="delete" onClick={_cerrarModal}></button>
              </div>
              <div className="message-body">
                <div
                    style={{
                      width: "100%",
                      height: "220px"
                    }}
                >
                  <Chart
                    data={data}
                    axes={[
                      { primary: true, type: "linear", position: "bottom" },
                      { type: "linear", position: "left" }
                    ]}
                    />
                </div>
              </div>
            </article>
          </div>
        </div>
    )
  }
}

function _cerrarModal(){

  var elemento = document.getElementById("modal_detalle")
  elemento.classList.remove("is-active")
}
