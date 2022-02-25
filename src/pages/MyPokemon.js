import React from 'react'
import {Container, Card, Col, Row, Navbar, Button} from 'react-bootstrap'
import '../variables/globalVariable'
import {Link} from 'react-router-dom'
import '../pages/css/MyPokemon.css'
import images from '../pages/pikachu.jpg';
const MyPokemon = () => {
  const removeItem = (event) => {
    const nickname = event.target.value;
    global.initialPokemon = global.initialPokemon.filter(data => data.nickname !== nickname);
    // const index = global.initialPokemon.indexOf(nickname);
    // if (index === -1) {
    //   global.initialPokemon.splice(index, 1);
    // }
    // console.log(index+1)
    // global.initialPokemon.splice(index+1, 1);
  }

  return (
    <div className='body'>
      <Navbar style={{width: '100%', zIndex: 5}} bg="dark" variant="dark">
        <Container>
            <Link to='/' style={{textDecoration: 'none'}}>
              <Navbar.Brand  className='navbar'>
                  Pokemon
              </Navbar.Brand>
            </Link>
            <Link to='/mypokemon' style={{textDecoration: 'none'}}>
              <Navbar.Brand  className='navbar'>
                  My Pokemon
              </Navbar.Brand>
            </Link>
        </Container>
      </Navbar>
      <Container>
        {global.initialPokemon.length > 0 ?
          (
            <div>
              <p className='descriptions text-center mt-5'>Owned Pokemon</p>
              <Row>
                  {global.initialPokemon.map(p => (
                      <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mt-5">
                          <Card className={`${p.data.types[0].type.name} text-center my-5 cardMyPokemon`}>
                              <p className='text-center mt-2 descriptions text-white'>{p.data.name}</p>
                              <Card.Img className='image text-center justify-content-center' variant="top" src={p.data.sprites.front_default} />
                              <Card.Body>
                                  <Card.Title className='name text-white'>{p.nickname}</Card.Title>
                              </Card.Body>
                              <Link to='/' style={{textDecoration: 'none'}}>
                                <Button className='button' variant="danger" onClick={removeItem} value={p.nickname}>Remove</Button>
                              </Link>
                          </Card>
                      </Col>
                  ))}
              </Row>
            </div>
          ) :
          (
            <div>
              <div className='imagePikachu text-center'>
                <img src={images} alt="Logo" width={300} height={300} />
              </div>
              <p className='text-center mt-5 description'>you don't have pokemon right now</p>
            </div>
          )

          }
      </Container>
  </div>
  )
}

export default MyPokemon