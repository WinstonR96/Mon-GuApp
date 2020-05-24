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
import Loading from "./Global/Loading";

export class DetalleConsultorio extends Component {
  static displayname = DetalleConsultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorio: {},
      loading: false,
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

  //Funciones
  HandleSpinner = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  CargarConsultorio() {
    this.HandleSpinner();
    let token = Util.ObtenerToken();
    Service.get(`api/v1/consultorio/${this.props.location.state.Codigo}`, token)
      .then((consultorio) => {
        this.HandleSpinner();
        this.setState({ consultorio });
      })
      .catch((err) => {
        this.HandleSpinner();
        Util.AlertaGenericaError("Ocurrio un error");
      });
  }

  LlamarPaciente = () => {
    this.HandleSpinner();
    const { consultorio } = this.state;
    let token = Util.ObtenerToken();
    var data = {
      id_consultorio: consultorio.id,
    };
    Service.post("api/v1/atencion", data, token)
      .then((response) => {
        this.HandleSpinner();
        if (response.type === "I") {
          let informacion = `${
            response.message + " con el paciente " + response.data.nombres
          }`;
          Util.AlertaLlamarPaciente(informacion);
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        } else {
          Util.AlertaGenericaError("No se pudo llamar un paciente");
        }
      })
      .catch((err) => {
        this.HandleSpinner();
        Util.AlertaGenericaError("Ocurrio un error");
      });
  };

  Home = () => {
    this.props.history.push({
      pathname: "/consultorio",
    });
  };

  DetallePaciente = () => {
    const { consultorio } = this.state;
    this.props.history.push({
      pathname: "/paciente/detalle",
      state: { consultorio_id: consultorio.id },
    });
  };

  render() {
    const { consultorio } = this.state;
    return (
      <div>
        {this.state.loading ? <Loading /> : null}
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
