import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";
// import consultorios from "./consultorio.json";

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
    let token = Util.ObtenerToken();
    Service.get(`api/v1/consultorio/${this.props.location.state.Codigo}`, token)
      .then((consultorio) => this.setState({ consultorio }))
      .catch((err) => console.log("error", err));
  }

  DetallePaciente = () => {
    const { consultorio } = this.state;
    let pacienteId = Util.getProp(consultorio, "Paciente.Id");
    this.props.history.push({
      pathname: "/paciente/detalle",
      state: { pacienteId },
    });
  };

  render() {
    const { consultorio } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <h3>Consultorio Nro: {this.state.consultorio.codigo}</h3>
            <h3>Medico a cargo: {this.state.consultorio.medico}</h3>
            {consultorio.estado === "Disponible" ? (
              <Button>Llamar paciente</Button>
            ) : // <div>
            //   <h3>Paciente: {pacienteNombre}</h3>
            //   <Button onClick={this.DetallePaciente}>
            //     Ver Historia paciente
            //   </Button>
            // </div>
            null}
          </CardBody>
        </Card>
      </div>
    );
  }
}
