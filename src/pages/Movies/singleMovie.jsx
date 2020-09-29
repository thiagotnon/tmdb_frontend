import React, { useState, useEffect, Fragment } from 'react'
import {  Badge, Card, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import PageMovieDetail from '../../components/PageMovieDetail';
import apiMovies from '../../services/apiMovies.js';
import './styles.css'

export default (props) => {
  const [singleMovie, setSingleMovie] = useState({genres: []});  
  const [actors, setActors] = useState([]);  
  const [credits, setCredits] = useState([]);  
  useEffect(() => {
    const id = props.match.params.id;
    apiMovies.get(`movie/${id}?language=pt-BR`).then(results => {
      setSingleMovie(results.data);
    });

    apiMovies.get(`movie/${id}/credits?language=pt-BR`).then(results => {
      setActors(results.data.cast);
      setCredits(results.data.crew);
    });

  },[props]);
  //let genresArray = singleMovie.genres ? singleMovie.genres.map(item => item.name) : [];
  //let companiesArray = singleMovie.production_companies ? singleMovie.production_companies.map(item => item.name) : [];
  //let productionCountriesArray = singleMovie.production_countries ? singleMovie.production_countries.map(item => item.name) : [];
  const year = new Date(`${singleMovie.release_date} 03:00`).getFullYear()
  const date = new Date(`${singleMovie.release_date} 03:00`).toLocaleDateString('pt-BR')
  const time = singleMovie.runtime;
  const hour = Math.floor(time / 60);
  const min = time % 60;
  return (
    <>
      <PageMovieDetail background={`https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path}`}>
       {singleMovie.id && 
        <Row>
        <Col md={4}>
          <Card className="border-0 bg-dark">
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`} />
            {singleMovie.homepage && 
              <Card.Body className="p-0">
                <Card.Link className="btn btn-sm btn-block btn-api text-white" href={singleMovie.homepage} target="_blank">Site Oficial</Card.Link>
              </Card.Body>}
          </Card>
        </Col>
        <Col md={8} sm={12} className="text-white my-auto">
          <small>{singleMovie.original_title}</small>
          <h1>{singleMovie.title} <span>({year})</span></h1>

          <p>{date} 🞄 {singleMovie.genres.map((item, i) =>(
             <span key={item.id}>{item.name}{i < singleMovie.genres.length - 1 ? ',' : ''} </span>
           ))} 🞄 {`${hour}h ${min}m`} 🞄 <span className="text-uppercase">{singleMovie.original_language}</span></p>
           <h5 className="font-weight-bold mt-5">Sinópse:</h5>
           <p>{singleMovie.overview}</p>
           <p><strong>Avaliações: </strong> {singleMovie.vote_average}</p>
           <p><strong>Produtoras: </strong></p>{singleMovie.production_companies.map(item => (
             <Badge variant="light p-1 mr-1" key={item.id}>{item.logo_path &&
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.name}</Tooltip>}>
                <img style={{width: '50px'}} alt={item.name} src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}/>
              </OverlayTrigger>
              }</Badge>
           ))}            
        </Col>
        <Col md={12} className="mt-5">
        <h1 className="mb-5 text-white">Ficha Técnica</h1>
        <Row>
           {credits.map(item => (
              <Col md={3} className="mb-2" key={item.credit_id}>
                <small><strong>{item.job}</strong></small><br />
                <p className="text-white">{item.name}</p>
              </Col>
           ))}
           </Row>
          <hr />
        <h1 className="mb-5 text-white">Elenco</h1>
        <Row>
         {actors.map(item => (
           <Fragment key={item.imdb_id}>
              {item.profile_path && 
              <Col md={2} >
                  <Card className="actor-card border-0 mb-4">
                  <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}/>
                    <Card.Body>
                    <Card.Title><strong>{item.name}</strong></Card.Title>
                    </Card.Body>
                  </Card>
              </Col>
           }
           </Fragment>
         ))}
        </Row>
        </Col>
        </Row>
       }
      </PageMovieDetail>
    </>
    
  );
}