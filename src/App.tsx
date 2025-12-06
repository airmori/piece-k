import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { MembersLogin } from './pages/MembersLogin';
import { MembersDashboard } from './pages/MembersDashboard';

// Layout wrapper to show/hide Header/Footer based on route if needed
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, isAuthenticated }: { children: JSX.Element, isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  // In a real effect we would scroll to top here, 
  // but for simple CSR we can just let it be or use a library.
  // For now we assume standard browser behavior.
  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Layout><Home /></Layout>
        } />

        <Route path="/login" element={
          <Layout><MembersLogin onLogin={() => setIsAuthenticated(true)} /></Layout>
        } />

        <Route path="/members" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout><MembersDashboard /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
