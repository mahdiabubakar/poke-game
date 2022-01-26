import './App.css';
import Pokes from './components/Pokes';
import PokeState from './context/pokemon/PokeState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <PokeState>
      <AlertState>
        <Pokes />
      </AlertState>
    </PokeState>
  );
};

export default App;
