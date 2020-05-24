import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Loading from "./Global/Loading";
import {
  AiFillAlert,
  AiFillAliwangwang,
  AiFillPushpin,
  AiFillHome,
  AiOutlineInfo,
} from "react-icons/ai";
import Util from "./../Helper/Util";
import Service from "./../Services/Service";

export class HistoriaPaciente extends Component {
  static displayname = HistoriaPaciente.name;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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
      this.setState({ File: file });
    };
  };

  //Funciones
  HandleSpinner = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  submitForm(e) {
    e.preventDefault();
    let token = Util.ObtenerToken();
    const { paciente, File } = this.state;
    if (File) {
      this.HandleSpinner();
      var data = {
        cedula: paciente.cedula,
        file: File,
      };
      Service.post("api/v1/prueba", data, token)
        .then((response) => {
          this.HandleSpinner();
          console.log(response);
        })
        .catch((error) => {
          this.HandleSpinner();
          console.log(error);
        });
    } else {
      Util.AlertaGenericaError("Suba una prueba de adn");
    }
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
    let token = Util.ObtenerToken();
    const { consultorio_id } = this.props.location.state;
    Service.get(`api/v1/atencion/${consultorio_id}`, token)
      .then((paciente) => this.setState({ paciente }))
      .catch((error) => console.log(error));
  }

  DarAlta = () => {
    this.HandleSpinner();
    let token = Util.ObtenerToken();
    const { paciente } = this.state;
    var data = {
      id: paciente.id,
    };
    Service.put("api/v1/atencion", data, token)
      .then((response) => {
        this.HandleSpinner();
        Util.AlertaGenericaInfo(response.message);
        setTimeout(() => {
          this.props.history.push({
            pathname: "/consultorio",
          });
        }, 1000);
      })
      .catch((err) => {
        this.HandleSpinner();
        console.log(err);
      });
  };

  Home = () => {
    this.props.history.push({
      pathname: "/consultorio",
    });
  };

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
        {this.state.loading ? <Loading /> : null}
        <Button outline color="secondary" onClick={this.Home}>
          <AiFillHome /> Regresar
        </Button>
        {this.state.ocultar ? (
          <Card>
            <CardHeader>Detalles del Paciente: {paciente.nombres}</CardHeader>
            <CardBody>
              <CardTitle>
                <AiFillAlert size={"2em"} />
                {paciente.triage}
              </CardTitle>
              <br />
              <CardSubtitle>
                <AiOutlineInfo size={"2em"} /> {paciente.edad}
              </CardSubtitle>
              <br />
              <CardText>
                <AiFillAliwangwang size={"2em"} /> {paciente.sintomas}
              </CardText>
              <br />
              <CardText>
                <AiFillPushpin size={"2em"} /> {paciente.estado}
              </CardText>
            </CardBody>
            <CardFooter>
              <Button onClick={this.MostrarPanel.bind(this)}>
                {this.state.ValueButton}
              </Button>{" "}
              <Button onClick={this.DarAlta.bind(this)}>Dar de alta</Button>
            </CardFooter>
          </Card>
        ) : (
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
                    {"   "}
                    <Button onClick={this.MostrarPanel.bind(this)}>
                      {this.state.ValueButton}
                    </Button>
                  </Form>
                </Container>
              </CardText>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
