import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import consultorios from "./consultorio.json";

export class Consultorio extends Component {
  static displayname = Consultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorios: [],
    };
  }

  componentDidMount() {
    this.setState({
      consultorios,
    });
  }

  NuevoConsultorio = () => {
    this.props.history.push({
      pathname: "/consultorio/nuevo",
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button outline color="secondary" onClick={this.NuevoConsultorio}>
                <AiOutlineUserAdd /> Registrar Consultorio
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
        <Table>
          <thead>
            <tr>
              <th>codigo</th>
              <th>Medico</th>
              <th>Estado</th>
              <th>Paciente</th>
            </tr>
          </thead>
          <tbody>
            {this.state.consultorios.map((consultorio) => (
              <tr>
                <td>
                  <Link
                    to={{
                      pathname: "consultorio/detalle",
                      state: { codigo: consultorio.codigo },
                    }}
                  >
                    {consultorio.codigo}
                  </Link>
                </td>
                <td>{consultorio.medico}</td>
                <td>{consultorio.estado}</td>
                {consultorio.paciente ? (
                  <td>{consultorio.paciente.nombre}</td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
