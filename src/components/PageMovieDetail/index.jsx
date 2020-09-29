import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'


export default ({title, children, background}) => {
  return (
    <>
    <Jumbotron className="mb-0" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: '0', backgroundPosition: 'top'}}>
      <Container fluid style={{backgroundColor: 'var(--color-movie-dark-op)', paddingTop: '50px', paddingBottom: '50px'}}>
        <Container>
          <h1>{title}</h1>
          {children}
        </Container>
      </Container>
    </Jumbotron>
    </>
  );
}