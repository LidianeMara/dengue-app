// src/components/SearchForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

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

interface SearchFormProps {
    onSearch: (geocode: string, startWeek: number, startYear: number, endWeek: number, endYear: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [geocode, setGeocode] = useState('3304557');
    const [startWeek, setStartWeek] = useState(1);
    const [startYear, setStartYear] = useState(2021);
    const [endWeek, setEndWeek] = useState(53);
    const [endYear, setEndYear] = useState(2021);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(geocode, startWeek, startYear, endWeek, endYear);
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="geocode">Município</Label>
                <Select id="geocode" value={geocode} onChange={(e) => setGeocode(e.target.value)}>
                    <option value="3100104">Município 1</option>
                    <option value="3100203">Município 2</option>
                    {/* Adicione outros municípios conforme necessário */}
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
