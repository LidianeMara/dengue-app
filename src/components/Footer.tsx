// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>© 2024 Informações sobre a Dengue</p>
        </FooterContainer>
    );
};

export default Footer;
