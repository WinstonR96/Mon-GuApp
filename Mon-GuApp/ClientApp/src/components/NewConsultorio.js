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
export class NewConsultorio extends Component {
  static displayname = NewConsultorio.name;

  constructor(props) {
    super(props);

    this.state = {
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
  }

  render() {
    return (
      <div>
        <Container className="App">
          <h2>Datos del consultorio</h2>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label for="Codigo">Codigo</Label>
                <Input
                  type="number"
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
                  type="text"
                  name="Medico"
                  id="Medico"
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
