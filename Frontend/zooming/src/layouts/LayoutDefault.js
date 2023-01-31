import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '../login/AuthContext';

const LayoutDefault = ({ children }) => (
  <div>
  <AuthProvider>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">
    {children}
    </main>
    <Footer />
  </AuthProvider>
  </div>
);

export default LayoutDefault;  