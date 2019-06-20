import React, {Component} from 'react';
var CanvasJSReact = require('../lib/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DetalleCriptoMoneda extends Component {

  render(){

    // const { codigo } = this.props.codigo;
    const { estado } = this.props.estado;
    debugger;
    const options = {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Apple",  y: 10  },
                { label: "Orange", y: 15  },
                { label: "Banana", y: 25  },
                { label: "Mango",  y: 30  },
                { label: "Grape",  y: 28  }
            ]
         }]
     }

    // return(
    //
    //   <div className="modal" id='modal_detalle'>
    //     <div className="modal-background"></div>
    //       <div className="modal-content">
    //         <article className="message is-danger">
    //           <div className="message-header">
    //             <p>Danger</p>
    //             <button className="delete" aria-label="delete"></button>
    //           </div>
    //           <div className="message-body">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //             <strong>Pellentesque risus mi</strong>,
    //             tempus quis placerat ut, porta nec nulla.
    //             Vestibulum rhoncus ac ex sit amet fringilla.
    //             Nullam gravida purus diam, et dictum
    //             efficitur. Aenean ac <em>eleifend lacus</em>,
    //             in mollis lectus. Donec sodales, arcu et sollicitudin porttitor,
    //             tortor urna tempor ligula, id porttitor mi magna a neque.
    //             Donec dui urna, vehicula et sem eget, facilisis sodales sem.
    //           </div>
    //         </article>
    //         <div>
    //           <CanvasJSChart options = {options} />
    //         </div>
    //       </div>
    //       <button className="modal-close is-large" aria-label="close" onClick={_cerrarModal()}></button>
    //       {_mostrarModal()}
    //     </div>
    // )
    return(

      <div className="modal" id='modal_detalle'>
        <div className="modal-background"></div>
          <div className="modal-content">
            
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
  }
}

function _mostrarModal(){

  // var elemento = document.getElementById("modal_detalle")
  // elemento.classList.add("is-active")
}

function _cerrarModal(){

  // var elemento = document.getElementById("modal_detalle")
  // elemento.classList.remove("is-active")
}
