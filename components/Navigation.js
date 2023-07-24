import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar className="bg-body-secondary">
      <Container>
        <Navbar.Brand href="#home">Absa Bank</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Ismael Hussein</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;