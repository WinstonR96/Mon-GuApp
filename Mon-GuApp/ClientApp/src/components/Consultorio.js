import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import consultorios from "./consultorio.json";
import Util from "./../Helper/Util";

export class Consultorio extends Component {
  static displayname = Consultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorios: [],
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
        consultorios,
      });
    }
  }

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  NuevoConsultorio = () => {
    this.props.history.push({
      pathname: "/consultorio/nuevo",
    });
  };

  EliminarConsultorio = (codigo) => {
    console.log("Eliminando", codigo);
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
              <th>Codigo</th>
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
                      state: { Codigo: consultorio.Codigo },
                    }}
                  >
                    {consultorio.Codigo}
                  </Link>
                </td>
                <td>{consultorio.Medico}</td>
                <td>{consultorio.Estado}</td>
                {consultorio.Paciente ? (
                  <td>{consultorio.Paciente.Nombres}</td>
                ) : (
                  <td></td>
                )}
                <td>
                  <Button
                    outline
                    color="secondary"
                    onClick={this.EliminarConsultorio.bind(
                      this,
                      consultorio.Codigo
                    )}
                  >
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
