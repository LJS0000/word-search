import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import Layout from './components/Layout';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Layout>
          <Router />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
