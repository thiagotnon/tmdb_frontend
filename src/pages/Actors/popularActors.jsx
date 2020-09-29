import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Star } from 'react-feather';
import PageComponent from '../../components/PageComponent';
import apiMovies from '../../services/apiMovies';

import './styles.css'

export default () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    apiMovies.get('person/popular?language=pt-BR').then(results => {
      setActors(results.data.results)
      console.log(results.data.results)
      
    });
  }, []);

  return (
    <>
      <PageComponent title="Atores Populares" icone={<Star />}>
        <Row>
          {actors.map(item => (
            <Col key={item.id} xs={6} md={3}>
              <Card className="mb-5 actor-card">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} />
                <Card.Body>
                  <Card.Title><strong>{item.name}</strong></Card.Title>
                  <Card.Text>
                  </Card.Text>
                  <Link to={`/actors/${item.name}/${item.id}`} className="btn btn-sm btn-api" style={{backgroundColor: 'var(--color-movie-purple)', color: 'var(--white)'}}>Detalhes</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </PageComponent>
            
    </>
  );
}