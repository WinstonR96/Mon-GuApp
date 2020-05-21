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

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      password: "",
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
    console.log(`password: ${this.state.password}`);
    const { cedula, password } = this.state;
    if (cedula === "1" && password === "1") {
      this.Home(cedula);
    }
  }

  Home = (cedula) => {
    this.props.history.push({
      pathname: "/home",
      state: { cedula },
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
                  placeholder="1045987456"
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
                  placeholder="********"
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
