import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'


export default ({title, children, icone}) => {
  return (
    <>
    <Jumbotron className="p-3">
      <Container>
        <h1>{icone} {title}</h1>
      </Container>
    </Jumbotron>

      <Container>
          {children}
      </Container>
    </>
  );
}