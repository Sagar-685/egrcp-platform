import ErrorBoundary from './components/common/ErrorBoundary'
import AppRouter from './routes/AppRouter'

const App = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
)

export default App