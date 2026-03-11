import Header from './components/Header'
import Hero from './components/Hero'
import Workspace from './components/Workspace'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <ToastProvider>
      <Header />
      <Hero />
      <main className="main-content">
        <Workspace />
      </main>
    </ToastProvider>
  )
}

export default App
