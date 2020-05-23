import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AiOutlineUserAdd, AiFillDelete, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";

export class Consultorio extends Component {
  static displayname = Consultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorios: [],
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
      this.cargarConsultorio();
    }
  }

  Home = () => {
    this.props.history.push({
      pathname: "/home",
    });
  };

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  cargarConsultorio() {
    let token = Util.ObtenerToken();
    Service.get("api/v1/consultorio", token)
      .then((consultorios) => this.setState({ consultorios, loading: false }))
      .catch((err) => console.log("error", err));
  }

  NuevoConsultorio = () => {
    this.props.history.push({
      pathname: "/consultorio/nuevo",
    });
  };

  EliminarConsultorio = (codigo) => {
    let token = Util.ObtenerToken();
    Service.delete(`api/v1/consultorio/${codigo}`, token)
      .then((response) => {
        window.location.reload(true);
        Util.AlertaConsultorioEliminado();
      })
      .catch((err) => console.log("error", err));
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
              {"  "}
              <Button outline color="secondary" onClick={this.Home}>
                <AiFillHome /> Regresar
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
        {this.state.loading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Codigo</th>
                <th>Medico</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.consultorios.map((consultorio) => (
                <tr key={consultorio.id}>
                  <td>
                    <Link
                      to={{
                        pathname: "consultorio/detalle",
                        state: { Codigo: consultorio.id },
                      }}
                    >
                      {consultorio.id}
                    </Link>
                  </td>
                  <td>{consultorio.codigo}</td>
                  <td>{consultorio.medico}</td>
                  <td>{consultorio.estado}</td>
                  <td>
                    <Button
                      outline
                      color="secondary"
                      onClick={this.EliminarConsultorio.bind(
                        this,
                        consultorio.id
                      )}
                    >
                      <AiFillDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}
