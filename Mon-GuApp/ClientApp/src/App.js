import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Paciente } from "./components/Paciente";
import { NewPaciente } from "./components/NewPaciente";
import { HistoriaPaciente } from "./components/HistoriaPaciente";
import { Consultorio } from "./components/Consultorio";
import { DetalleConsultorio } from "./components/DetalleConsultorio";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/paciente" component={Paciente} />
        <Route exact path="/paciente/nuevo" component={NewPaciente} />
        <Route exact path="/paciente/detalle" component={HistoriaPaciente} />
        <Route exact path="/consultorio" component={Consultorio} />
        <Route
          exact
          path="/consultorio/detalle"
          component={DetalleConsultorio}
        />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
      </Layout>
    );
  }
}
