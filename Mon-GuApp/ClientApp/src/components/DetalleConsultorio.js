import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import Util from "./../Helper/Util";
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
    let result = this.ComprobarSesion();
    console.log(result);
    if (!result) {
      this.props.history.push({
        pathname: "/",
      });
    } else {
      this.CargarConsultorio();
    }
  }

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  CargarConsultorio() {
    let consultorio = consultorios.find(
      (c) => c.Codigo === this.props.location.state.Codigo
    );
    this.setState({
      consultorio,
    });
  }

  DetallePaciente = () => {
    const { consultorio } = this.state;
    let pacienteId = Util.getProp(consultorio, "Paciente.Id");
    console.log("Detalle consultorio: ", consultorio, pacienteId);
    this.props.history.push({
      pathname: "/paciente/detalle",
      state: { pacienteId },
    });
  };

  render() {
    const { consultorio } = this.state;
    let pacienteNombre = Util.getProp(consultorio, "Paciente.Nombres");
    let pacienteId = Util.getProp(consultorio, "Paciente.Id");
    console.log("consultorio", consultorio);
    console.log("Id", pacienteId);
    return (
      <div>
        <Card>
          <CardBody>
            <h3>Consultorio Nro: {this.state.consultorio.Codigo}</h3>
            <h3>Medico a cargo: {this.state.consultorio.Medico}</h3>
            {consultorio.Estado === "Disponible" ? (
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
