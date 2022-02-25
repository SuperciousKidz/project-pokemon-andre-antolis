import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../components/css/Pokemon.css'
import '../variables/globalVariable'

const Pokemon = ({pokemon}) => {
  return (
    <Card className={`${pokemon.types[0].type.name} cards my-5 text-center`}>
        <p className='owned'>
          Owned Pokemon: {global.initialPokemon.filter((obj) => obj.data.id === pokemon.id).length}
          {/* {JSON.parse(JSON.stringify(localStorage.getItem('storage'))).length} */}
        </p>
        <Card.Img className='image text-center justify-content-center' variant="top" src={pokemon.sprites.front_default} />
        <Card.Body>
            <div className='id'>#{pokemon.id}</div>
            <Card.Title className='name'>{pokemon.name}</Card.Title>
            <Link to={`/pokemon/${pokemon.id}`}>
                <Button className='button' variant="secondary">View Detail</Button>
            </Link>
        </Card.Body>
    </Card>
  )
}

export default Pokemon