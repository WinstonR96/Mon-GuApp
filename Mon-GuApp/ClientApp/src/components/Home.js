import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
} from "reactstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { FaDoorClosed } from "react-icons/fa";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
  }

  Paciente = () => {
    this.props.history.push({
      pathname: "/paciente",
    });
  };

  Consultorio = () => {
    this.props.history.push({
      pathname: "/consultorio",
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <Toast>
                <ToastHeader>Pacientes</ToastHeader>
                <ToastBody>
                  <center>
                    <Button outline color="secondary" onClick={this.Paciente}>
                      <BsFillPersonFill size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
              <Toast>
                <ToastHeader>Consultorios</ToastHeader>
                <ToastBody>
                  <center>
                    <Button
                      outline
                      color="secondary"
                      onClick={this.Consultorio}
                    >
                      <FaDoorClosed size={"3em"} />
                    </Button>
                  </center>
                </ToastBody>
              </Toast>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
