import React, { Component } from 'react';
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

class UpdatePersonaje extends Component {
    cajaserie = React.createRef();
    cajaPersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
        status: false,
        personajeSelect: null,
        serieSelect: null
    }

    loadPersonajes = () =>{
        let request = "api/Personajes";
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                personajes: response.data,
            })
        })
    }

    loadSeries = () => {
        var request = "api/Series";
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                series: response.data,
                
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }

    modificarPersonaje = (e) => {
        e.preventDefault();
        let idSerie = parseInt(this.cajaserie.current.value);
        let idPersonaje = parseInt(this.cajaPersonaje.current.value);
        let request = "api/Personajes/"+idPersonaje+ "/" + idSerie;
        let url = Global.urlApi + request;

        let personaje = {
            idPersonaje: idPersonaje,
            idSerie: idSerie,
        }
        console.log(personaje);

        axios.put(url, personaje).then(response => {
            console.log(personaje);
            this.setState({
                status: true
            })
        })
    }

    componentDidUpdate = (oldProps) =>{
        if (oldProps.id != this.props.id){
            this.loadPersonajes();
            this.loadSeries();
        }
    }

    loadPersonajePorId = () =>{
        let idPersonaje = this.cajaPersonaje.current.value;
        console.log(idPersonaje)
        let request = "api/Personajes/" + idPersonaje;
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log("Aquiiii"+response.data);
            this.setState({
                personajeSelect: response.data,
            })
        })
    }

    loadSeriePorId = () =>{
        let idSerie = this.cajaserie.current.value;
        console.log(idSerie)
        let request = "api/Series/" + idSerie;
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log("Aquiiii"+response.data);
            this.setState({
                serieSelect: response.data,
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.status == true && <Navigate to={"/personajes/" +this.state.serieSelect.idSerie}/>
                }
                <div id="container" className="m-4">
                    <h1>Modificar personaje</h1>
                    <hr className="border border-primary opacity-100 text-center" />
                    <form>
                        <label >Serie</label>
                        <select onChange={this.loadSeriePorId} ref={this.cajaserie} className="form-control" id="selectSerie">
                        {
                            this.state.series.map((serie,index)=>{
                                return(
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                )
                            })
                        }
                        </select>
                        <label >Personaje</label>
                        <select onChange={this.loadPersonajePorId} ref={this.cajaPersonaje} className="form-control" id="selectPersonaje">
                        {
                            this.state.personajes.map((personaje,index)=>{
                                return(
                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                )
                            })
                        }
                        </select>
                        <button onClick={this.modificarPersonaje} id="btnModificar" className="btn btn-success w-100 mt-3">Modificar personaje</button>
                    </form>
                </div>
                <div className="container">
                    <div className="row">
                        {this.state.personajeSelect && (
                            <div id="colizq" className="col-6">
                                <table className="table">
                                    <thead>
                                        <tr className="border-primary">
                                            <th><h1>{this.state.personajeSelect.nombre}</h1></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><img alt='imagen' style={{ width: "600px" }} src={this.state.personajeSelect.imagen} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {this.state.serieSelect && (
                            <div id="coldrch" className="col-6">
                                <table className="table">
                                    <thead>
                                        <tr className="border-primary">
                                            <th><h1>{this.state.serieSelect.nombre}</h1></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><img alt='imagen' style={{ width: "600px" }} src={this.state.serieSelect.imagen} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatePersonaje;