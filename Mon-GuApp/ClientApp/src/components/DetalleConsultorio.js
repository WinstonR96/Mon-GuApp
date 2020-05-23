import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button,
} from "reactstrap";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";
import { AiFillHome } from "react-icons/ai";

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

  LlamarPaciente = () => {
    const { consultorio } = this.state;
    let token = Util.ObtenerToken();
    var data = {
      id_consultorio: consultorio.id,
    };
    Service.post("api/v1/atencion", data, token)
      .then((response) => {
        window.location.reload(true);
        Util.AlertaLlamarPaciente(response.message);
      })
      .catch((err) => console.log(err));
  };

  Home = () => {
    this.props.history.push({
      pathname: "/home",
    });
  };

  DetallePaciente = () => {
    this.props.history.push({
      pathname: "/paciente/detalle",
    });
  };

  render() {
    const { consultorio } = this.state;
    return (
      <div>
        <Button outline color="secondary" onClick={this.Home}>
          <AiFillHome /> Regresar
        </Button>
        <Card>
          <CardHeader>Consultorio Nro: {consultorio.codigo}</CardHeader>
          <CardBody>
            <CardTitle>Medico a cargo: {consultorio.medico}</CardTitle>
            <CardText>Estado: {consultorio.estado}</CardText>
            {consultorio.estado === "Disponible" ? (
              <Button onClick={this.LlamarPaciente}>Llamar paciente</Button>
            ) : (
              <div>
                <Button onClick={this.DetallePaciente}>
                  Ver Historia paciente
                </Button>
              </div>
            )}
          </CardBody>
          <CardFooter>{consultorio.id}</CardFooter>
        </Card>
      </div>
    );
  }
}
