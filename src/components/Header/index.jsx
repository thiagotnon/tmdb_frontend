import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import './styles.css';

export default () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
          
            <Link className="navbar-brand" to="/">Movies</Link>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
          <LinkContainer to="/generos">
            <Button className="nav-link">Gêneros</Button>
          </LinkContainer>
           
            <NavDropdown title="Filmes">

              <LinkContainer to="/movies/popular">
                <NavDropdown.Item>
                  Populares
                </NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/movies/release">
                <NavDropdown.Item>
                  Lançamentos
                </NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>
            
            <NavDropdown title="Séries">

              <LinkContainer to="/series/popular">
                <NavDropdown.Item>
                  Populares
                </NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/series/release">
              <NavDropdown.Item>
                Lançamentos
              </NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>

            <NavDropdown title="Atores">
              <LinkContainer to="/actors/popular">
                <NavDropdown.Item>
                  Populares
                </NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/actors/new">
                <NavDropdown.Item>
                  Novos
                </NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}