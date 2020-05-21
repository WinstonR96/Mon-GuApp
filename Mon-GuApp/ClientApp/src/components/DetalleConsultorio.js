import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import consultorios from "./consultorio.json";

export class DetalleConsultorio extends Component {
  static displayname = DetalleConsultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorio: {},
    };
  }

  componentDidMount() {
    this.CargarConsultorio();
  }

  CargarConsultorio() {
    let consultorio = consultorios.find(
      (c) => c.codigo === this.props.location.state.codigo
    );
    this.setState({
      consultorio,
    });
  }
  render() {
    const { consultorio } = this.state;
    console.log("consultorio", consultorio);
    console.log("paciente", consultorio.paciente.id);
    return (
      <div>
        <Card>
          <CardBody>
            <h3>Consultorio Nro: {this.state.consultorio.codigo}</h3>
            <h3>Medico a cargo: {this.state.consultorio.medico}</h3>
            {/* {this.state.consultorio.estado === "Disponible" ?
        <Button>Llamar paciente</Button>
        :
        <h3>Paciente: {this.state.consultorio.paciente}</h3>} */}
          </CardBody>
        </Card>
        {this.state.consultorio.estado}
      </div>
    );
  }
}
