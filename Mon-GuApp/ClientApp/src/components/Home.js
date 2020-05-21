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
                    <Button outline color="secondary">
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
                    <Button outline color="secondary">
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
