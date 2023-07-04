import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages';
import { AdminRoutes, ClientRoutes } from './components/router';
import { AuthContext } from './context/auth';
import { useContext, useEffect } from 'react';
import './styles/styles.css'

function App() {
  const context = useContext(AuthContext);
  const sessionValidation = async () => {
    await context.validateToken();
  }
  useEffect(() => {
    sessionValidation()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
      </Routes>
      {
        context.authState.logged && (
          <>
            <ClientRoutes />
            <AdminRoutes />
          </>
        )
      }
    </BrowserRouter>
  );
}
export default App;
