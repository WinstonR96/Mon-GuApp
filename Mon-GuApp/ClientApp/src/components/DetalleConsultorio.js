import React, { Component } from "react";
import consultorios from "./consultorio.json";

export class DetalleConsultorio extends Component {
  static displayname = DetalleConsultorio.name;

  constructor(props) {
    super(props);
    this.state = {
      consultorio: {},
    };
  }

  componentDidMount() {
    this.CargarConsultorio();
  }

  CargarConsultorio() {
    let consultorio = consultorios.find(
      (c) => c.codigo === this.props.location.state.codigo
    );
    this.setState({
      consultorio,
    });
  }
  render() {
    return <div>{this.state.consultorio.estado}</div>;
  }
}
