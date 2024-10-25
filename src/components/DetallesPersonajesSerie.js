import React, { Component } from 'react';
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class DetallesPersonajesSerie extends Component {
    state = {
        personajes: []
    }

    loadPersonajes = () =>{
        let request = "api/Series/PersonajesSerie/"+this.props.id;
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                personajes: response.data,
            })
        })
    }

    componentDidMount= ()=>{
        this.loadPersonajes();
    }

    componentDidUpdate = (oldProps) =>{
        if (oldProps.id != this.props.id){
            this.loadPersonajes();
        }
    }
    render() {
        return (
            <div>
                <div id="container" className="m-4">
                    <h1> Personajes de {this.props.id}</h1>
                    <hr className="border border-primary opacity-100 text-center" /><br/>
                        <NavLink className="btn btn-danger w-100" to={"/serie/" + this.props.id}>Volver a serie</NavLink>
                        <table className="table">
                            <thead>
                                <tr className="border-primary">
                                    <th>Personaje</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.personajes.map((personaje,index)=>{
                                        return(
                                            <tr key={index}>
                                                <th>{personaje.nombre}</th>
                                                <td><img alt='imagen personaje' style={{width:"150px", height:"150px" }} src={personaje.imagen}/></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> 
                </div>

            </div>
        );
    }
}

export default DetallesPersonajesSerie;