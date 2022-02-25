import React from 'react'
import {Navbar} from 'react-bootstrap'
const Navbar = () => {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Pokemon
                </Navbar.Brand>
            </Container>
        </Navbar>
    </div>
  )
}

export default Navbar