import React, { Component } from 'react';
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class DetalleSerie extends Component {
    state = {
        serie: null,
        status: false
    }

    detalleSerie = () => {
        let request = "api/Series/" + this.props.id;
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                serie: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.detalleSerie();
    }

    componentDidUpdate = (oldProps) =>{
        if (oldProps.id != this.props.id){
            this.detalleSerie();
        }
    }
    
    render() {
        return (
            <div>
                {
                    this.state.serie &&
                    <div>
                        <hr className="border border-primary opacity-100 text-center" />
                        <div className="card" style={{width: "98%"}}>
                            <div className="card-body">
                                <img alt='imagen serie' style={{width:"270px", height:"270px"}} src={this.state.serie.imagen}/>
                                <h5 className="card-title">{this.state.serie.nombre}</h5>
                                <p className="card-text ">IMDB: {this.state.serie.puntuacion}</p>
                                <button className="btn btn-primary m-2" style={{width:"100%"}}><NavLink style={{color:"white", textDecoration:"none"}} to={"/personajes/" + this.state.serie.idSerie} >Personajes</NavLink> </button>
                            </div>
                        </div>
                    </div>

                }
            </div>
        );
    }
}

export default DetalleSerie;

