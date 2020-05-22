import React, { Component } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
} from "reactstrap";
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
            {/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              {this.state.active ? (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/home">
                      Home
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-dark"
                      to="/"
                      onClick={this.CerrarSesion}
                    >
                      Cerrar Sesion
                    </NavLink>
                  </NavItem>
                </ul>
              ) : null}
            </Collapse> */}
          </Container>
        </Navbar>
      </header>
    );
  }
}
