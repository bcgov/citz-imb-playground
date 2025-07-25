import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, Button } from '@bcgov/design-system-react-components';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import { SentryErrorBoundary } from './config/sentry';
import './App.css';

function App() {
  return (
    <SentryErrorBoundary 
      fallback={({ error, resetError }) => (
        <div style={{ 
          padding: 'var(--layout-margin-large)', 
          textAlign: 'center',
          backgroundColor: 'var(--surface-color-background-danger)',
          color: 'var(--typography-color-danger)',
          borderRadius: 'var(--layout-border-radius-medium)',
          margin: 'var(--layout-margin-large)'
        }}>
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
          <details style={{ 
            whiteSpace: 'pre-wrap', 
            marginTop: 'var(--layout-margin-medium)',
            textAlign: 'left',
            backgroundColor: 'var(--surface-color-background-white)',
            padding: 'var(--layout-margin-medium)',
            borderRadius: 'var(--layout-border-radius-small)'
          }}>
            {error ? String(error) : 'Unknown error'}
          </details>
          <Button 
            onClick={resetError} 
            className="btn btn-primary"
            style={{ marginTop: 'var(--layout-margin-medium)' }}
          >
            Try again
          </Button>
        </div>
      )}
      showDialog
    >
      <Router>
        <div className="App">
          <Header title="CITZ-IMB-TypeRacer" />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:roomCode" element={<GamePage />} />
            </Routes>
          </main>
          <Footer>
            <div style={{ 
              padding: 'var(--layout-margin-large)',
              backgroundColor: 'var(--surface-color-background-white)',
              borderTop: 'var(--layout-border-width-large) solid var(--surface-color-border-light)',
              textAlign: 'center',
              fontSize: 'var(--typography-font-size-small)',
              color: 'var(--typography-color-secondary)'
            }}>
              <p>Copyright © 2025, Province of British Columbia. All rights reserved.</p>
              <p>The B.C. Public Service acknowledges the territories of First Nations around B.C. and is grateful to carry out our work on these lands.</p>
              <div style={{ marginTop: 'var(--layout-margin-medium)' }}>
                <a href="/" style={{ marginRight: 'var(--layout-margin-medium)' }}>Home</a>
                <a href="https://www2.gov.bc.ca/gov/content/home/privacy" style={{ marginRight: 'var(--layout-margin-medium)' }}>Privacy</a>
                <a href="https://www2.gov.bc.ca/gov/content/home/accessibility">Accessibility</a>
              </div>
            </div>
          </Footer>
        </div>
      </Router>
    </SentryErrorBoundary>
  );
}

export default App;
