import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from './Global';
import axios from 'axios';
import logo from './../assets/images/stranger.png';
class MenuRutas extends Component {
    state = {
        series: []
    }

    loadSeries = () => {
        var request = "api/Series";
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/"><img alt='imagen' style={{ width: "100px" }} src={logo} /></NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link inactive" to="/create">Nuevo personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link inactive" to="/update">Modificar personaje</NavLink>
                                </li>
                                <li className="nav-item dropdown inactive" id="dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Series</NavLink>
                                    <ul id="navseries" className="dropdown-menu">
                                        {
                                            this.state.series.map((serie,index)=>{
                                                return(
                                                    <li key={index}><NavLink className="dropdown-item" to={"/serie/" + serie.idSerie}>{serie.nombre}</NavLink></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default MenuRutas;