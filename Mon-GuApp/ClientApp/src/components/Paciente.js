import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd, AiFillHome } from "react-icons/ai";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";
import { Link } from "react-router-dom";

export class Paciente extends Component {
  static displayname = Paciente.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  static RenderTabla(data) {
    console.log(data);
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
            <th>Consultorio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dato) => (
            <tr key={dato.paciente.id}>
              <td>{dato.paciente.cedula}</td>
              <td>{dato.paciente.nombres}</td>
              <td>{dato.paciente.edad}</td>
              <td>{dato.paciente.sexo}</td>
              <td>{dato.paciente.triage}</td>
              <td>{dato.paciente.sintomas}</td>
              <td>{dato.paciente.estado}</td>
              {dato.paciente.estado === "En Atencion" ? (
                <td>
                  <Link
                    to={{
                      pathname: "consultorio/detalle",
                      state: { Codigo: dato.consultorio.id },
                    }}
                  >
                    {dato.consultorio.codigo}
                  </Link>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  async cargarPaciente() {
    let token = Util.ObtenerToken();
    Service.get("api/v1/paciente", token)
      .then((data) => this.setState({ data, loading: false }))
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
      Paciente.RenderTabla(this.state.data)
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
