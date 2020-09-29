import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageComponent from '../../components/PageComponent';
import apiMovies from '../../services/apiMovies';


export default () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  useEffect(() => {
    apiMovies.get('genre/movie/list?language=pt-BR').then(results =>{
      setMovieGenres(results.data.genres)
    })
    apiMovies.get('genre/tv/list?language=pt-BR').then(results =>{
      setTvGenres(results.data.genres)
    })
  }, [])
  return (
    <>
      <PageComponent title="Gêneros">
        <Row>
        <Col md={12} className="mb-3">
          <h2>Gêneros de Filmes</h2>
        </Col>
        {movieGenres.map(item=> (
                    <Col className="mb-4" xs={6} md={2} key={item.id}>
                      <Link className="btn btn-light w-100" to="/">
                            {item.name}
                      </Link>
                    </Col>
                  ))}
        </Row>
<hr/>
                <Row>
                <Col md={12} className="my-3">
                  <h2>Gêneros de Séries</h2>
                </Col>
                {tvGenres.map(item=> (
                    <Col className="mb-4 text-center" xs={6} md={2} key={item.id}>
                      <Link className="btn btn-light w-100" to="/">
                        {item.name}
                      </Link>
                    </Col>
                  ))}
                </Row>

        
      </PageComponent>
    </>
  );
}