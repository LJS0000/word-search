import { BrowserRouter } from 'react-router-dom'
import { WordProvider } from './context/wordContext'
import Router from './router/Router'
import Layout from './components/Layout'
import './styles/globals.css'

function App() {
  return (
    <WordProvider>
      <BrowserRouter>
        <div className='App'>
          <Layout>
            <Router />
          </Layout>
        </div>
      </BrowserRouter>
    </WordProvider>
  )
}

export default App
