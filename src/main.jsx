import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MTG App Caught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0b0f19',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '440px',
            backgroundColor: '#111827',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '42px', marginBottom: '16px' }}>🎧</div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 12px 0', color: '#00C1F0' }}>
              Music Tech Guru
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              We encountered an issue loading the app. Please tap below to reload and refresh your session.
            </p>
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              style={{
                backgroundColor: '#00C1F0',
                color: '#0b0f19',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 4px 14px rgba(0,193,240,0.3)'
              }}
            >
              Reload Revision App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
