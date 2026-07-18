import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
