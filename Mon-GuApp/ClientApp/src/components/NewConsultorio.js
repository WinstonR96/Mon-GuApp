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
import Service from "./../Services/Service";

export class NewConsultorio extends Component {
  static displayname = NewConsultorio.name;

  constructor(props) {
    super(props);

    this.state = {
      medicos: [],
      Codigo: "",
      Medico: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let result = this.ComprobarSesion();
    if (!result) {
      this.props.history.push({
        pathname: "/",
      });
    } else {
      this.cargarMedicos();
    }
  }

  cargarMedicos() {
    let token = Util.ObtenerToken();
    Service.get("/api/v1/medico", token)
      .then((medicos) => this.setState({ medicos }))
      .catch((err) => {
        Util.AlertaGenericaError("Ocurrio un error");
      });
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
    const { Codigo, Medico } = this.state;
    var data = {
      cod_Consultorio: Codigo,
      id_medico: Medico,
    };
    if (Codigo && Medico) {
      let token = Util.ObtenerToken();
      Service.post("api/v1/consultorio", data, token)
        .then((response) => {
          if (response.type === "I") {
            Util.AlertaConsultorioRegistrado();
            this.IrConsultorio();
          } else {
            Util.AlertaGenericaInfo("No se pudo registrar");
          }
        })
        .catch((err) => {
          Util.AlertaGenericaError("Ocurrio un error");
        });
    } else {
      Util.AlertaDatosIncompletos();
    }
  }

  IrConsultorio() {
    this.props.history.push({
      pathname: "/consultorio",
    });
  }

  render() {
    const options = [];
    options.push(<option value={"s"}>{"Seleccione"}</option>);
    this.state.medicos.forEach((entry, index) =>
      options.push(
        <option key={index} value={entry.id}>
          {entry.nombres}
        </option>
      )
    );
    return (
      <div>
        <Container className="App">
          <h2>Datos del consultorio</h2>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label for="Codigo">Codigo</Label>
                <Input
                  type="text"
                  name="Codigo"
                  id="Codigo"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Medico">Medico</Label>
                <Input
                  type="select"
                  name="Medico"
                  id="Medico"
                  onChange={(e) => this.handleChange(e)}
                >
                  {options}
                </Input>
              </FormGroup>
            </Col>
            <Button>Registrar</Button>
            {"  "}
            <Button onClick={this.IrConsultorio.bind(this)}>Cancelar</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
