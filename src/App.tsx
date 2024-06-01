// src/App.tsx
import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import DengueData from './components/DengueData';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <DengueData />
      <Footer />
    </div>
  );
};

export default App;
