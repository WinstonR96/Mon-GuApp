import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { AiFillAlert, AiFillAliwangwang, AiFillPushpin } from "react-icons/ai";
import pacientes from "./paciente.json";
import Util from "./../Helper/Util";

export class HistoriaPaciente extends Component {
  static displayname = HistoriaPaciente.name;

  constructor(props) {
    super(props);

    this.state = {
      paciente: {},
      ocultar: true,
      ValueButton: "Subir Muestra",
      File: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (event) => {
    const { target } = event;
    let files = target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      let file = e.target.result;
    };
  };

  submitForm(e) {
    e.preventDefault();
  }

  componentDidMount() {
    let result = this.ComprobarSesion();
    if (!result) {
      this.props.history.push({
        pathname: "/",
      });
    } else {
      this.CargarPaciente();
    }
  }

  ComprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  CargarPaciente() {
    let paciente = pacientes.find(
      (c) => c.Id === this.props.location.state.pacienteId
    );
    this.setState({
      paciente,
    });
  }

  MostrarPanel() {
    let valorButton = !this.state.ocultar ? "Subir Muestra" : "Cancelar";
    this.setState((prevState) => ({
      ocultar: !prevState.ocultar,
      ValueButton: valorButton,
    }));
  }

  render() {
    const { paciente } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <AiFillPushpin size={"2em"} />
              {paciente.Nombres}
            </CardTitle>
            <CardSubtitle>
              <AiFillAlert size={"2em"} /> {paciente.Triage}
            </CardSubtitle>
            <CardText>
              <AiFillAliwangwang size={"2em"} /> {paciente.Sintomas}
            </CardText>
            <Button onClick={this.MostrarPanel.bind(this)}>
              {this.state.ValueButton}
            </Button>{" "}
            <Button>Dar de alta</Button>
          </CardBody>
        </Card>
        <br />
        {this.state.ocultar ? null : (
          <Container>
            <Card>
              <CardBody>
                <CardTitle>
                  Anexe la prueba de ADN para validarla en el sistema.
                </CardTitle>
                <CardText>
                  <Container className="App">
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                      <Col>
                        <FormGroup>
                          <Label>ADN</Label>
                          <Input
                            type="file"
                            name="File"
                            id="File"
                            onChange={(e) => this.handleChange(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Button>Comprobar</Button>
                    </Form>
                  </Container>
                </CardText>
              </CardBody>
            </Card>
          </Container>
        )}
      </div>
    );
  }
}
