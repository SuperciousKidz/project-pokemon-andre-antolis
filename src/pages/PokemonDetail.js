import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Card, Button, Navbar} from 'react-bootstrap'
// import {Link} from 'react-router-bootstrap'
import Loading from '../components/Loading'
import '../pages/css/PokemonDetail.css'
import '../variables/globalVariable'
import Modal from 'react-modal'
import { MdCatchingPokemon } from 'react-icons/md';
import { VscChromeClose } from "react-icons/vsc";
import {Link} from 'react-router-dom'

const PokemonDetail = ({ match }) => {

    const id = match.params.id
    const [pokemon, setPokemon] = useState();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buttonIsEnable, setButtonIsEnable] = useState(true);
    const [name, setName] = useState("");
    const [inputIsDisable, setInputIsDisable] = useState(true);
    const [showButtonMyPokemon, setShowButtonMyPokemon] = useState(false);
    const [showFailCatch, setShowFailCatch] = useState(false);
    const [showInputSame, setShowInputSame] = useState(false);

    const getCurrentPokemon = async (id) => {
        const pokemon = await getPokemonById(id);
        setPokemon(pokemon);
        setLoading(false);
    }
    const getPokemonById = async (id) => {
        const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response
    }

    const resetClick = () => {
        setSuccess(false);
        setModalIsOpen(false);
        setButtonIsEnable(true);
        setName('');
        setInputIsDisable(true);
        setShowButtonMyPokemon(false);
        setShowFailCatch(false);
    }

    const handleClick = () => {
        if (Math.random() >= 0.5) { //50% chance
            setSuccess(true)
            setButtonIsEnable(false);
        }else {
            setSuccess(false)
            setButtonIsEnable(true);
            setShowFailCatch(true)
        }
    }

    let exist = 0;
    // console.info(performance.navigation.type);
    // if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    // console.info( "This page is reloaded" );
    // } else {
    // console.info( "This page is not reloaded");
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        exist = 0;

        for(let i = 0; i < global.initialPokemon.length; i++) {
            if(name === global.initialPokemon[i].nickname) {
                exist = 1;
                break;
            }
        }
        // let valid = 0;
        if(exist === 0) {
            global.initialPokemon.push({
                nickname: name,
                data: pokemon.data
            })
            setShowButtonMyPokemon(true)
            setInputIsDisable(false);
            setShowInputSame(false);
            // if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            //     var storage = JSON.parse(localStorage.getItem('storage'))
            //     var merge = storage.concat(global.initialPokemon);

            //     var outputArray = [];
            //     var count = 0;
            //     var start = false;

            //     for(let i = 0; i < storage.length; i++) {
            //         if(global.initialPokemon[global.initialPokemon.length-1].nickname === storage[i].nickname) {
            //             valid = 1;
            //             break;
            //         }
            //     }
            //     if(valid === 0) {
            //         for (let j = 0; j < merge.length; j++) {
            //             for (let k = 0; k < outputArray.length; k++) {
            //                 if ( merge[j].nickname === outputArray[k].nickname ) {
            //                     start = true;
            //                 }
            //             }
            //             count++;
            //             if (count === 1 && start === false) {
            //                 outputArray.push(merge[j]);
            //             }
            //             start = false;
            //             count = 0;
            //         }

            //         localStorage.setItem('storage', JSON.stringify(outputArray));
            //         console.log(JSON.parse(JSON.stringify(outputArray)))
            //         setShowButtonMyPokemon(true)
            //         setInputIsDisable(false);
            //         setShowInputSame(false);
            //     }
            // }else {
            //     localStorage.setItem('storage', JSON.stringify(global.initialPokemon));
            //     setShowButtonMyPokemon(true)
            //     setInputIsDisable(false);
            //     setShowInputSame(false);
            // }
        }else{
            exist = 0;
            setShowInputSame(true);
        }
    
    }
    useEffect(() => {
        getCurrentPokemon(id);
    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : (
                <div>
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
                    <Button style={{zIndex: 0}} variant="danger" className='buttonPokemon' onClick={() => setModalIsOpen(true)}><MdCatchingPokemon /></Button>
                    <Modal isOpen={modalIsOpen} className='modals'>
                        <div style={{zIndex: 1, width:300}} >
                            <Button variant="danger" onClick={() => setModalIsOpen(false)}><VscChromeClose/></Button>
                            <Card className={`cardsModal`}>
                                <Card.Img className="image" variant="top" src={pokemon.data.sprites.front_default} />
                                <Card.Body className="text-center">
                                    <Card.Title className="titles">{pokemon.data.name}</Card.Title>
                                </Card.Body>
                            </Card>
                            <div>
                                {success ? (
                                    <div className='text-center mt-3 descriptions'>
                                        You caught the {pokemon.data.name}
                                        <div className='forms'>
                                            <form onSubmit={handleSubmit}>
                                                <label>
                                                    <input className='m-2' disabled={!inputIsDisable}
                                                    type="text" 
                                                    value={name}
                                                    placeholder="input nickname..."
                                                    onChange={(e) => setName(e.target.value)}
                                                    />
                                                </label>
                                                <Button disabled={!inputIsDisable} type="submit">Submit</Button>
                                            </form>
                                            {
                                                showInputSame ? (
                                                    <div>The nickname pokemon is already exists</div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                            {
                                                showButtonMyPokemon ? (
                                                    <div>
                                                        <div>The pokemon is now on your my pokemon</div>
                                                        <Button variant="danger" onClick={resetClick} className='mt-5' style={{marginRight: 10}}>Reset catch</Button>
                                                        <Link to={`/mypokemon`}>
                                                            <Button className='mt-5'>Go to my pokemon</Button>
                                                        </Link>
                                                    </div>    
                                                    
                                                ) : (
                                                    <div />
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                {
                                    showFailCatch ? (
                                        <div className='text-center mt-3 descriptions' style={success ? { display: 'none' } : null}>failed to caught the {pokemon.data.name}. Try and click again...</div>
                                    ) : (
                                        <div className='text-center mt-3 descriptions' style={success ? { display: 'none' } : null}>Prepare to caught {pokemon.data.name}</div>
                                    )
                                }
                            </div>
                            <Button variant="danger" style={success ? { display: 'none' } : null} disabled={!buttonIsEnable} onClick={handleClick} className='buttonCatch'><MdCatchingPokemon /></Button> 
                        </div>
                    </Modal>
                    <Container>
                        <Card className={`${pokemon.data.types[0].type.name} cards`} style={{zIndex: -1}}>
                            <Card.Img className="image" variant="top" src={pokemon.data.sprites.front_default} />
                            <Card.Body className="text-center">
                                <Card.Title className="titles">{pokemon.data.name}</Card.Title>
                            </Card.Body>
                        </Card>

                        <Card className="cards" style={{zIndex: -1}}>
                            <Card.Body className="text-center">
                                <Card.Title className="title">Types</Card.Title>
                                <div>
                                    {pokemon.data.types.map(p => (
                                        <div className={`${p.type.name} borders mb-3 justify-content-center text-center`}>
                                            {p.type.name}
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="cards" style={{zIndex: -1}}>
                            <Card.Body className="text-center">
                                <Card.Title className="title">Moves</Card.Title>
                                <div>
                                    {pokemon.data.moves.map(p => (
                                        <div className={`borders mb-3 justify-content-center text-center text-black`}>
                                            {p.move.name}
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            )}
        </>
    )
}

export default PokemonDetail