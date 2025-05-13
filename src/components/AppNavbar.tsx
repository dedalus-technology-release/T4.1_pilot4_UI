import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import dedalusIcon from "../assets/DEDALUS-Icon-White.png";

import useAuth from "../hooks/useAuth";

const AppNavbar = () => {
  const {isAuthenticated, logUserOut} = useAuth()

  const handleLogout = () => {
    logUserOut()
  };

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="p-0 bg-primary">
      <Container>
        <Navbar.Brand className="pe-4">
          <img src={dedalusIcon} alt="Logo" width="50" height="50"></img>
          <span style={{ fontSize: "16px", textAlign: "right"}}>
            Digital Twin ITALY
          </span>
        </Navbar.Brand>

        {isAuthenticated && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link as={NavLink} to="/tito-garzoni-house">
                  Tito Garzoni House
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/maddalena-house">
                  Maddalena House
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={handleLogout}>
                  <TbLogout className="logout-icon" size={20} />
                  <span className="logout-text">Log Out</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
