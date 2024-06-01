// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <h1>Informações sobre a Dengue</h1>
        </HeaderContainer>
    );
};

export default Header;
