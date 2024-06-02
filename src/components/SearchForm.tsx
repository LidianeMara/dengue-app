// src/components/SearchForm.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  max-width: 600px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

interface Municipio {
  id: string;
  nome: string;
}

interface SearchFormProps {
  onSearch: (geocode: string, startWeek: number, startYear: number, endWeek: number, endYear: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [filteredMunicipios, setFilteredMunicipios] = useState<Municipio[]>([]);
  const [geocode, setGeocode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [startWeek, setStartWeek] = useState(18);
  const [startYear, setStartYear] = useState(2024);
  const [endWeek, setEndWeek] = useState(22);
  const [endYear, setEndYear] = useState(2024);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado');
        const data = response.data;
        const municipiosFormatados = data.map((municipio: any) => ({
          id: municipio['municipio-id'],
          nome: municipio['municipio-nome']
        }));
        setMunicipios(municipiosFormatados);
        setFilteredMunicipios(municipiosFormatados);
        if (municipiosFormatados.length > 0) {
          setGeocode(municipiosFormatados[0].id); // Set the default geocode to the first municipio
        }
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
      }
    };

    fetchMunicipios();
  }, []);

  useEffect(() => {
    const results = municipios.filter(municipio =>
      municipio.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMunicipios(results);
    if (results.length > 0) {
      setGeocode(results[0].id); // Update the geocode to the first filtered municipio
    }
  }, [searchTerm, municipios]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(geocode, startWeek, startYear, endWeek, endYear);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="search">Pesquisar Município</Label>
        <Input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do município"
        />

        <Label htmlFor="geocode">Município</Label>
        <Select id="geocode" value={geocode} onChange={(e) => setGeocode(e.target.value)}>
          {filteredMunicipios.map(municipio => (
            <option key={municipio.id} value={municipio.id}>
              {municipio.id} - {municipio.nome}
            </option>
          ))}
        </Select>

        <Label htmlFor="startWeek">Semana de Início</Label>
        <Input
          type="number"
          id="startWeek"
          value={startWeek}
          onChange={(e) => setStartWeek(parseInt(e.target.value))}
        />

        <Label htmlFor="startYear">Ano de Início</Label>
        <Input
          type="number"
          id="startYear"
          value={startYear}
          onChange={(e) => setStartYear(parseInt(e.target.value))}
        />

        <Label htmlFor="endWeek">Semana de Fim</Label>
        <Input
          type="number"
          id="endWeek"
          value={endWeek}
          onChange={(e) => setEndWeek(parseInt(e.target.value))}
        />

        <Label htmlFor="endYear">Ano de Fim</Label>
        <Input
          type="number"
          id="endYear"
          value={endYear}
          onChange={(e) => setEndYear(parseInt(e.target.value))}
        />

        <Button type="submit">Buscar</Button>
      </Form>
    </FormContainer>
  );
};

export default SearchForm;
