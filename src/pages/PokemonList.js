import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Col,Row, Container, Navbar} from 'react-bootstrap'
import Pokemon from '../components/Pokemon';
import Loading from '../components/Loading';
import '../pages/css/PokemonList.css'

const PokemonList = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllPokemon = async () => {
        let listArrayPokemon = [];
        let i = 1;
        while(i <= 200) {
            listArrayPokemon.push(await getPokemonById(i)); //menampung seluruh data pokemon dari api yang dituju dari getPokemonById
            i++;
        }
        setPokemon(listArrayPokemon);
        setLoading(false); //buat loadingnya berhenti ketika semua setPokemon telah terisi ke dalam listArrayPokemon berdasarkan arraynya
    }

    const getPokemonById = async (id) => {
        const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); //mengambil data api dari link yang dituju
        return response; //memberikan data apinya dan dikirim ke getAllPokemon
    }

    useEffect(() => {
        getAllPokemon();
    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : (
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
                        <Row>
                            {pokemon.map(p => (
                                <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mt-5">
                                    <Pokemon pokemon={p.data}/>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )}
        </>
    );
}

export default PokemonList