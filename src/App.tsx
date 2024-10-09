import Router from './router/Router';
import Layout from './components/Layout';
import './styles/globals.css';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
