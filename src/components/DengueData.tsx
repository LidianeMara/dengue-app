// src/components/DengueData.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import ChartComponent from './ChartComponent';

const DataContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`
const IntroText = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`



interface DengueData {
    geocode: string;
    disease: string;
    ew: number;
    ey: number;
    SE: number;
    casos: number;
    value: number;
}

const DengueDataComponent: React.FC = () => {
    const [data, setData] = useState<DengueData[]>([]);

    const handleSearch = (geocode: string, startWeek: number, startYear: number, endWeek: number, endYear: number) => {
        axios
            .get('http://localhost:8000/api/dengue-data', {
                params: {
                    geocode,
                    disease: 'dengue',
                    format: 'json',
                    ew_start: startWeek,
                    ey_start: startYear,
                    ew_end: endWeek,
                    ey_end: endYear,
                },
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados da API", error);
            });
    };
    return (
        <DataContainer>
            <IntroText>
                <p>
                    Esta aplicação fornece dados atualizados sobre os casos de dengue em diferentes municípios.
                    Você pode selecionar um município, definir um período específico e visualizar os dados de
                    casos de dengue ao longo do tempo. Utilize o formulário abaixo para realizar a busca e obter
                    os dados necessários.
                </p>
            </IntroText>
            <SearchForm onSearch={handleSearch} />
            {data?.length > 0 ? (
                <div style={{ marginBottom: '2rem', width: '100%', display: 'flex' }}>
                    <ChartComponent data={data} />
                </div>
            ) : (
                <p>Nenhum dado encontrado.</p>
            )}
        </DataContainer>
    );
};

export default DengueDataComponent;
