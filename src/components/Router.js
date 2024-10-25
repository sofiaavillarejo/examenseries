import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MenuRutas from './MenuRutas';
import { useParams } from 'react-router-dom';
import DetalleSerie from './DetalleSerie';
import DetallesPersonajesSerie from './DetallesPersonajesSerie';
import NuevoPersonaje from './NuevoPersonaje';
import UpdatePersonaje from './UpdatePersonaje';

class Router extends Component {
    render() {
        function DetalleSerieElement() {
            let {idserie} = useParams();
            return( <DetalleSerie id={idserie}/>)
        }

        function DetallePersonajesSerieElement() {
            let {idserie} = useParams();
            return( <DetallesPersonajesSerie id={idserie}/>)
        }
        return (
            <div>
                <BrowserRouter>
                <MenuRutas/>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/serie/:idserie' element={<DetalleSerieElement/>}/>
                    <Route path='/personajes/:idserie' element={<DetallePersonajesSerieElement/>}/>
                    <Route path='/create/' element={<NuevoPersonaje/>}/>
                    <Route path='/update/' element={<UpdatePersonaje/>}/>

                </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default Router;