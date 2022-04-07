import logo from './assets/lendlord.png'
import './App.css';
import UsersTableView from './components/UsersTableView';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={'200px'} alt={'logo'} />
      </header>

      <UsersTableView />
    </div>
  );
}

export default App;
