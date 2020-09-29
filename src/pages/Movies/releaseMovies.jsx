import React, { useState, useEffect } from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageComponent from '../../components/PageComponent';
import apiMovies from '../../services/apiMovies.js';

export default () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    apiMovies.get('movie/now_playing?language=pt-BR').then(results => {
      setMovies(results.data.results);
    });

  }, [])
 
  return (
    <>
      <PageComponent title="Filmes Lançamentos">
       <Row>
       {movies.map((item) => (
            <Col md={2} key={item.id}>
           <Link to={`/movies/${item.id}`}>
           <Card className="mb-4">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.title}</Tooltip>}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
            </OverlayTrigger>
            </Card>
           </Link>
          </Col>
        ))}
       </Row>
      </PageComponent>
    </>
  );
}