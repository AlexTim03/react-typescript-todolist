import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Navbar } from "./components/Navbar"
import { AboutPages } from './pages/AboutPages';
import { TodosPage } from './pages/TodosPage';

const App: React.FC = () => {


  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route component={TodosPage} path='/' exact />
          <Route component={AboutPages} path='/about' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
