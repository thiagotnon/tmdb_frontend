import React, { useState, useEffect } from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageComponent from '../../components/PageComponent';
import apiMovies from '../../services/apiMovies.js';
import './styles.css'

export default () => {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    apiMovies.get('tv/on_the_air?language=pt-BR').then(results => {
      setSeries(results.data.results);
    });
  }, [])

  return (
    <>
      <PageComponent title="Series Lançamento">        
      <Row>
       {series.map((item) => (
            <Col md={2} key={item.id}>
           <Link to={`/series/${item.id}`}>
           <Card className="mb-4">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.name}</Tooltip>}>
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