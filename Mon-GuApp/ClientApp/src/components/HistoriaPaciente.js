import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import pacientes from "./paciente.json";

export class HistoriaPaciente extends Component {
  static displayname = HistoriaPaciente.name;

  constructor(props) {
    super(props);

    this.state = {
      paciente: {},
    };
  }

  componentDidMount() {
    this.CargarPaciente();
  }

  CargarPaciente() {
    let paciente = pacientes.find(
      (c) => c.Id === this.props.location.state.pacienteId
    );
    this.setState({
      paciente,
    });
  }

  render() {
    const { paciente } = this.state;
    console.log("Paciente", paciente);
    return <div>Historia del paciente: {paciente.Nombres}</div>;
  }
}
