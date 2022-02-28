import './App.css';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import Restaurant from './Restaurant';
import Restaurants from './Restaurants';
import About from './About';
import Notfound from './NotFound';
import { useState } from 'react';

function App() {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    let url = `/restaurants?borough=${searchString}`;
    navigate(url);
    setSearchString("");
  }
    return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
        <Container>
        <Row>
          <Col>
          <Routes>
            <Route path="/" element={<Navigate to="/restaurants"/>} />
            <Route path="/about" element={<About />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="*" element={<Notfound/>}/>
          </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default App;
