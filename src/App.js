import './App.css';
import Pokes from './components/Pokes';
import PokeState from './context/pokemon/PokeState';

const App = () => {
  return (
    <PokeState>
      <div>
        <Pokes />
      </div>
    </PokeState>
  );
};

export default App;
