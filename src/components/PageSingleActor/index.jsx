import React from 'react'
import { Jumbotron, Container, Row, Col, Card } from 'react-bootstrap';


export default ({name, image, biography, birthday, deathday, place_of_birth, known_for_department, children}) => {
  return (
    <>
    <Jumbotron>
      <Container>
        <Row>
          <Col md={3}>
          <Card className="bg-dark text-white">
            <Card.Img src={`https://image.tmdb.org/t/p/original/${image}`} alt={name}/>
          </Card>

            <p><strong>Nascimento</strong><br /> <span className="text-white">{birthday}</span></p>
            {deathday &&
              <p><strong>Data de falecimento</strong><br />  <span className="text-white">{deathday}</span></p>
            }
            <p><strong>Cidade Natal</strong><br /> <span className="text-white">{place_of_birth}</span></p>
            <p><strong>Conhecido(a) por</strong><br /> <span className="text-white">{known_for_department}</span></p>
          </Col>  
          <Col md={9} >
            <h1>{name}</h1>  
            <p className="text-justify text-white"><small>{biography}</small></p>
          </Col>  
        </Row>     
      </Container>
    </Jumbotron>
    <Container>
      {children}
    </Container>
    </>
  );
}