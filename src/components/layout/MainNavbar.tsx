import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MainNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">PixHub</Navbar.Brand>

        {/* Toggle pour mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Liens et dropdown */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Liens principaux à gauche */}
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/gallery">Galerie</Nav.Link>
            <Nav.Link href="/subscription">Abonnement</Nav.Link>
            <Nav.Link href="/account">Compte</Nav.Link>
          </Nav>

          {/* Dropdown utilisateur à droite */}
          <Nav>
            <NavDropdown title="Utilisateur" id="user-dropdown" align="end">
              <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Paramètres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
