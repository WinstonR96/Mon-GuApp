import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Util from "./../Helper/Util";

export class NewPaciente extends Component {
  static displayname = NewPaciente.name;
  constructor(props) {
    super(props);

    this.state = {
      Cedula: "",
      Nombres: "",
      Edad: "",
      Sexo: "",
      Triage: "",
      Sintomas: "",
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(this.state.Triage);
  }

  render() {
    return (
      <div>
        <Container className="App">
          <h2>Datos del paciente</h2>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Cedúla</Label>
                <Input
                  type="number"
                  name="Cedula"
                  id="Cedula"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Nombres">Nombres</Label>
                <Input
                  type="text"
                  name="Nombres"
                  id="Nombres"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Edad">Edad</Label>
                <Input
                  type="number"
                  name="Edad"
                  id="Edad"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Sexo">Genero</Label>
                <Input
                  type="select"
                  name="Sexo"
                  id="Sexo"
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value="0">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="S">Sin Especificar</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Triage">Triage</Label>
                <Input
                  type="select"
                  name="Triage"
                  id="Triage"
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value="0">Seleccione...</option>
                  <option value="1">Atención Inmediata</option>
                  <option value="2">Riesgo Vital</option>
                  <option value="3">Urgencia Menor</option>
                  <option value="4">No Urgencia</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Sintomas">Sintomas</Label>
                <Input
                  type="text"
                  name="Sintomas"
                  id="Sintomas"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Button>Registrar</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
