import './App.css';
import { Route } from 'react-router-dom';

import Landing from './Components/landing/Landing';
import Home from './Components/home/Home';
import PokeCreate from './Components/pokeCreate/PokeCreate';
import PokeDetail from './Components/pokeDetail/PokeDetail';



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/create' component={PokeCreate} />
      <Route exact path='/details/:id' render={({ match }) => <PokeDetail id={match.params.id} />} /> {/*VER QUE HACE*/}
    </div>
  );
}

export default App;
