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

  DetallePaciente = () => {
    const { consultorio } = this.state;
    let pacienteId = this.getProp(consultorio, "paciente.id");
    console.log("Detalle consultorio: ", consultorio, pacienteId);
    this.props.history.push({
      pathname: "/paciente/detalle",
      state: { pacienteId },
    });
  };

  getProp = (obj, key) =>
    key
      .split(".")
      .reduce(
        (o, x) => (typeof o == "undefined" || o === null ? o : o[x]),
        obj
      );

  render() {
    const { consultorio } = this.state;
    let pacienteNombre = this.getProp(consultorio, "paciente.nombre");
    let pacienteId = this.getProp(consultorio, "paciente.id");
    console.log("consultorio", consultorio);
    console.log("Id", pacienteId);
    return (
      <div>
        <Card>
          <CardBody>
            <h3>Consultorio Nro: {this.state.consultorio.codigo}</h3>
            <h3>Medico a cargo: {this.state.consultorio.medico}</h3>
            {consultorio.estado === "Disponible" ? (
              <Button>Llamar paciente</Button>
            ) : (
              <div>
                <h3>Paciente: {pacienteNombre}</h3>
                <Button onClick={this.DetallePaciente}>
                  Ver Historia paciente
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}
