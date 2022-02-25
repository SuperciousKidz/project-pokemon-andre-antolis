import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail'
import MyPokemon from './pages/MyPokemon'

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' component={PokemonList}></Route>
        <Route path='/pokemon/:id' component={PokemonDetail}></Route>
        <Route path='/mypokemon' component={MyPokemon}></Route>
      </Router>
    </div>
  );
}

export default App;
