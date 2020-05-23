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
import "./Login.css";
import Service from "./../Services/Service";
import Util from "./../Helper/Util";

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      password: "",
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.ComprobarSesion()) {
      this.Home();
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
    const { cedula, password } = this.state;
    if (cedula && password) {
      var data = {
        user: {
          cedula,
          password,
        },
      };
      Service.post("api/v1/auth/login", data)
        .then((response) => {
          if (response.data.token) {
            Util.GuardarSesion(response.data);
            this.Home();
          }
        })
        .catch((err) => {
          Util.AlertaDatosIncorrectos();
        });
    } else {
      Util.AlertaDatosIncompletos();
    }
  }

  Home = () => {
    this.props.history.push({
      pathname: "/home",
    });
  };

  render() {
    return (
      <div>
        <Container className="App">
          <h2>Iniciar Sesion</h2>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Cedúla</Label>
                <Input
                  type="number"
                  name="cedula"
                  id="cedula"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  onChange={(e) => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Button>Iniciar</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
