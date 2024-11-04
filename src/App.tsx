import { Profiler } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { WordProvider } from './context/wordContext'
import { onRender } from './profiler/onRender'
import Router from './router/Router'
import Layout from './components/Layout'
import './styles/globals.css'

function App() {
  return (
    <Profiler id='App' onRender={onRender}>
      <WordProvider>
        <BrowserRouter>
          <div className='App'>
            <Layout>
              <Router />
            </Layout>
          </div>
        </BrowserRouter>
      </WordProvider>
    </Profiler>
  )
}

export default App
