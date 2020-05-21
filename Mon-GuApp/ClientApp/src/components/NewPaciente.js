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

export class NewPaciente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nombre: "",
      edad: "",
      sexo: "",
      triage: "",
      sintomas: "",
    };

    this.handleChange = this.handleChange.bind(this);
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
    console.log(this.state.triage);
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
                  name="id"
                  id="id"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="nombre">Nombres</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="edad">Edad</Label>
                <Input
                  type="number"
                  name="edad"
                  id="edad"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="sexo">Genero</Label>
                <Input
                  type="select"
                  name="sexo"
                  id="sexo"
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
                <Label for="triage">Triage</Label>
                <Input
                  type="select"
                  name="triage"
                  id="triage"
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
                <Label for="sintomas">Sintomas</Label>
                <Input
                  type="text"
                  name="sintomas"
                  id="sintomas"
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
