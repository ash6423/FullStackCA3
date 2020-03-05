import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'

class NavMenu extends React.Component {

    render() {
        return (
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="../../">Netflix Shows</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="../../">Shows</Nav.Link>
              <Nav.Link href= "/genres"> Genres</Nav.Link> 
              <Nav.Link href="/add-show">Add a new Show</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar>
        );
    }

}

export default NavMenu;
