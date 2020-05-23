import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
} from "reactstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { FaDoorClosed, FaBookMedical } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Util from "./../Helper/Util";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let result = this.ComprobarSesion();
    console.log(result);
    if (!result) {
      this.props.history.push({
        pathname: "/",
      });
    }
  }

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  CerrarSesion = () => {
    Util.CerrarSesion();
    this.props.history.push({
      pathname: "/",
    });
  };

  Paciente = () => {
    Util.ObtenerToken();
    this.props.history.push({
      pathname: "/paciente",
    });
  };

  Consultorio = () => {
    this.props.history.push({
      pathname: "/consultorio",
    });
  };

  Medico = () => {
    Util.AlertaPanelDesarrollo();
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Toast>
                <ToastHeader>Medicos</ToastHeader>
                <ToastBody>
                  <center>
                    <Button outline color="secondary" onClick={this.Medico}>
                      <FaBookMedical size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
              <Toast>
                <ToastHeader>Pacientes</ToastHeader>
                <ToastBody>
                  <center>
                    <Button outline color="secondary" onClick={this.Paciente}>
                      <BsFillPersonFill size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
              <Toast>
                <ToastHeader>Consultorios</ToastHeader>
                <ToastBody>
                  <center>
                    <Button
                      outline
                      color="secondary"
                      onClick={this.Consultorio}
                    >
                      <FaDoorClosed size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
              <Toast>
                <ToastHeader>Cerrar Sesion</ToastHeader>
                <ToastBody>
                  <center>
                    <Button
                      outline
                      color="secondary"
                      onClick={this.CerrarSesion}
                    >
                      <FiLogOut size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
