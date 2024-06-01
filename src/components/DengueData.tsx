// src/components/DengueData.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DataContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DataItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface DengueData {
    id: number;
    municipio: string;
    casos: number;
    data: string;
}

const DengueDataComponent: React.FC = () => {
    const [data, setData] = useState<DengueData[]>([]);

    useEffect(() => {
        axios
            .get('https://info.dengue.mat.br/api/alerts/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados da API", error);
            });
    }, []);

    return (
        <DataContainer>
            {data.map(item => (
                <DataItem key={item.id}>
                    <h2>{item.municipio}</h2>
                    <p>Casos: {item.casos}</p>
                    <p>Data: {new Date(item.data).toLocaleDateString()}</p>
                </DataItem>
            ))}
        </DataContainer>
    );
};

export default DengueDataComponent;
