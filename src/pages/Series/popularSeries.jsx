import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageComponent from '../../components/PageComponent';
import apiMovies from '../../services/apiMovies.js';
import './styles.css'

export default () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    apiMovies.get('tv/popular?language=pt-BR').then(results => {
      setMovies(results.data.results);
    });
  }, [])

  return (
    <>
      <PageComponent title="Series Populares">        
      <Row>
      {movies.map(item => (
          <Col key={item.id}  md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} />
              <Card.ImgOverlay className="d-flex box-card-overlay">
                <Card.Text  className="mt-auto text-white">
                <Card.Title>{item.name}</Card.Title>
                 <strong>Pontuação:</strong> {item.vote_average}<br />
                 <Link to={`/series/${item.id}`} className="btn btn-sm btn-api mt-2" style={{backgroundColor: 'var(--color-movie-purple)', color: 'var(--white)'}}>Details</Link>
                </Card.Text>
              </Card.ImgOverlay>
              </Card>
          </Col>
        ))}
      </Row>
      </PageComponent>
    </>
  );
}