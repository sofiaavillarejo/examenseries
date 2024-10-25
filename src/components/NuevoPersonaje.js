import React, { Component } from 'react';
import Global from './Global';
import axios from 'axios';

class NuevoPersonaje extends Component {
    cajanombre = React.createRef();
    cajaimagen = React.createRef();
    cajaserie = React.createRef();

    state = {
        series: []
    }

    loadSeries = () =>{
        let request = "api/Series";
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                series: response.data,
            })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }

    crearPersonaje = (e) =>{
        e.preventDefault();
        var request = "api/Personajes";
        var url = Global.urlApi + request;
        let nombre = this.cajanombre.current.value;
        let imagen = this.cajaimagen.current.value;
        let serie = parseInt(this.cajaserie.current.value);
    
        let personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie,
        }
    
        axios.post(url, personaje).then(response => {
            console.log(response.data);
            console.log("personaje creado");
            window.location.href = "/personajes/" + serie;
        })
    }


    render() {
        return (
            <div>
                <div id="container" className="m-4">
                    <h1>Crear personaje</h1>
                    <hr className="border border-primary opacity-100 text-center" />
                    <form>
                        <label>Nombre</label>
                        <input ref={this.cajanombre} className="form-control" type="text" id="cajanombre"/>
                        <label id="cajaimagen">Imagen</label>
                        <input ref={this.cajaimagen} className="form-control" type="text" id="cajaimagen"/>
                        <label >Serie</label>
                        <select ref={this.cajaserie} className="form-control" id="selectSerie">
                            {
                                this.state.series.map((serie, index)=>{
                                    return(
                                        <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                    )
                                })
                            }
                        </select>
                        <button id="btnCrear" onClick={this.crearPersonaje} className="btn btn-success w-100 mt-3">Crear personaje</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NuevoPersonaje;