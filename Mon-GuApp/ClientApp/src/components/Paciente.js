import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";
// import pacientes from "./paciente.json";

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
    this.cargarPaciente();
    // let result = this.ComprobarSesion();
    // console.log(result);
    // if (!result) {
    //   this.props.history.push({
    //     pathname: "/",
    //   });
    // } else {
    //   this.cargarPaciente();
    //   console.log("Pacientes", this.state.pacientes);
    // }
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
    Service.get("api/v1/paciente")
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
            </Col>
          </Row>
        </Container>
        <br />
        {contents}
      </div>
    );
  }
}
