import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd, AiFillHome } from "react-icons/ai";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";

export class Paciente extends Component {
  static displayname = Paciente.name;

  constructor(props) {
    super(props);
    this.state = {
      pacientes: [],
      loading: true,
    };
  }

  componentDidMount() {
    let result = this.ComprobarSesion();
    if (!result) {
      this.props.history.push({
        pathname: "/",
      });
    } else {
      this.cargarPaciente();
    }
  }

  static RenderTabla(pacientes) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Identificacion</th>
            <th>Nombres</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Triage</th>
            <th>Sintomas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.cedula}</td>
              <td>{paciente.nombres}</td>
              <td>{paciente.edad}</td>
              <td>{paciente.sexo}</td>
              <td>{paciente.triage}</td>
              <td>{paciente.sintomas}</td>
              <td>{paciente.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  async cargarPaciente() {
    let token = Util.ObtenerToken();
    Service.get("api/v1/paciente", token)
      .then((pacientes) => this.setState({ pacientes, loading: false }))
      .catch((err) => console.log("error", err));
  }

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  NuevoPaciente = () => {
    this.props.history.push({
      pathname: "/paciente/nuevo",
    });
  };

  Home = () => {
    this.props.history.push({
      pathname: "/home",
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      Paciente.RenderTabla(this.state.pacientes)
    );
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button outline color="secondary" onClick={this.NuevoPaciente}>
                <AiOutlineUserAdd /> Registrar Paciente
              </Button>
              {"  "}
              <Button outline color="secondary" onClick={this.Home}>
                <AiFillHome /> Regresar
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
        {contents}
      </div>
    );
  }
}
