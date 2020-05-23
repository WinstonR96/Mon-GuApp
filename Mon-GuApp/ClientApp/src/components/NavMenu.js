import React, { Component } from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Util from "./../Helper/Util";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      active: false,
    };
  }

  componentDidMount() {
    let result = this.comprobarSesion();
    if (result) {
      this.setState({
        active: true,
      });
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  comprobarSesion() {
    return Util.ComprobarSesionActiva();
  }

  CerrarSesion() {
    Util.CerrarSesion();
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              MonGuApp
            </NavbarBrand>
          </Container>
        </Navbar>
      </header>
    );
  }
}
