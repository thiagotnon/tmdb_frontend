import React, { useState, useEffect, Fragment } from 'react'
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageSerieDetail from '../../components/PageSerieDetail';
import apiMovies from '../../services/apiMovies.js';
import './styles.css'

export default (props) => {
  const [singleTV, setSingleTV] = useState({});  
  const [actors, setActors] = useState([]);  
  const [credits, setCredits] = useState([]);  

  useEffect(() => {
    const id = props.match.params.id;
    apiMovies.get(`tv/${id}?language=pt-BR`).then(results => {
      setSingleTV(results.data);
    });

    apiMovies.get(`tv/${id}/credits?language=pt-BR`).then(results => {
      setActors(results.data.cast);
      setCredits(results.data.crew);
    });

  },[props]);

  const year = new Date(`${singleTV.first_air_date} 03:00`).getFullYear()
  const date = new Date(`${singleTV.first_air_date} 03:00`).toLocaleDateString('pt-BR')
  const time = singleTV.runtime;
  const hour = Math.floor(time / 60);
  const min = time % 60;
  return (
    <>
      <PageSerieDetail background={`https://image.tmdb.org/t/p/original/${singleTV.backdrop_path}`}>
      {singleTV.id && 
      <Row>
        <Col md={4}>
          <Card className="border-0 bg-dark">
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${singleTV.poster_path}`} />
            {singleTV.homepage && 
              <Card.Body className="p-0">
                <Card.Link className="btn btn-sm btn-block btn-api text-white" href={singleTV.homepage} target="_blank">Site Oficial</Card.Link>
              </Card.Body>}
          </Card>
        </Col>
        <Col md={8} sm={12} className="text-white my-auto">
          <small>{singleTV.name}</small>
          <h1>{singleTV.name} <span>({year})</span></h1>

          <p>{date} 🞄 {singleTV.genres.map((item, i) =>(
             <span key={item.id}>{item.name}{i < singleTV.genres.length - 1 ? ',' : ''} </span>
           ))} 🞄 {`${hour}h ${min}m`} 🞄 <span className="text-uppercase">{singleTV.original_language}</span></p>
           <p>{}</p>
           <h5 className="font-weight-bold mt-5">Sinópse:</h5>
           <p>{singleTV.overview}</p>
           <p><strong>Avaliações: </strong> {singleTV.vote_average}</p>
           <p><strong>Produtoras: </strong></p>{singleTV.production_companies.map(item => (
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
                  <Link to={`/actors/${item.name}/${item.id}`}>
                  <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}/>
                    <Card.Body>
                    <Card.Title><strong>{item.name}</strong></Card.Title>
                    </Card.Body></Link>
                  </Card>
              </Col>
           }
           </Fragment>
         ))}
        </Row>
        </Col>
        </Row>
       }
      </PageSerieDetail>
    </>
    
  );
}