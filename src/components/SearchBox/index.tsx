import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    navigate(query ? `search?query=${query}` : '/search');
  }
  
  return (
    <Form className="d-flex me-auto" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(() => e.target.value)}
          placeholder="Procurar produtos..."
          aria-label='Procurar produtos'
          aria-describedby='button-search'
        />
        <Button 
          variant="outline-primary" 
          type="submit" 
          id="button-search"
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox