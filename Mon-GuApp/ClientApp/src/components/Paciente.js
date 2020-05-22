import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import pacientes from "./paciente.json";
import Util from "./../Helper/Util";

export class Paciente extends Component {
  static displayname = Paciente.name;

  constructor(props) {
    super(props);
    this.state = {
      pacientes: [],
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
      this.setState({
        pacientes,
      });
    }
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
        <Table>
          <thead>
            <tr>
              <th>Identificacion</th>
              <th>Nombres</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Triage</th>
              <th>Sintomas</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pacientes.map((paciente) => (
              <tr>
                <td>{paciente.Cedula}</td>
                <td>{paciente.Nombres}</td>
                <td>{paciente.Edad}</td>
                <td>{paciente.Sexo}</td>
                <td>{paciente.Triage}</td>
                <td>{paciente.Sintomas}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
