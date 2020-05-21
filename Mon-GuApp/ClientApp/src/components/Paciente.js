import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import pacientes from "./paciente.json";

export class Paciente extends Component {
  static displayname = Paciente.name;

  constructor(props) {
    super(props);
    this.state = {
      pacientes: [],
    };
  }

  componentDidMount() {
    this.setState({
      pacientes,
    });
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
              <th>nombre</th>
              <th>edad</th>
              <th>sexo</th>
              <th>triage</th>
              <th>sintomas</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pacientes.map((paciente) => (
              <tr>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.sexo}</td>
                <td>{paciente.triage}</td>
                <td>{paciente.sintomas}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
