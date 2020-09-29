import React, { useState, useEffect } from 'react'
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PageSingleActor from '../../components/PageSingleActor';
import apiMovies from '../../services/apiMovies.js';
import Slider from "react-slick";
//import Cover from '../../img/cover.png'


export default (props) => {
  const [singleActor, setSingleActor] = useState({});  
  const [movieCredit, setMovieCredit] = useState([]);  
  const [serieCredit, setSerieCredit] = useState([]);  
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };
  useEffect(() => {
    const id = props.match.params.id;
    apiMovies.get(`person/${id}?language=pt-BR`).then(results => {
      setSingleActor(results.data);
    });

    apiMovies.get(`person/${id}/movie_credits?language=pt-BR`).then(results => {
      setMovieCredit(results.data.cast);
    });
    
    apiMovies.get(`/person/${id}/tv_credits?language=pt-BR`).then(results => {
      setSerieCredit(results.data.cast);
    });
  },[props]);
  
  const date = new Date(`${singleActor.birthday} 03:00`).toLocaleDateString('pt-BR')
  return (
    <>
      <PageSingleActor
        name={singleActor?.name}
        image={singleActor.profile_path} 
        biography={singleActor.biography} 
        birthday={date}
        deathday={singleActor.deathday}
        place_of_birth={singleActor.place_of_birth}
        known_for_department={singleActor.known_for_department}
      >
      <h3 className="font-weight-bold">Filmes em que atuou</h3>
      <hr />
      <Slider {...settings} className="mb-5">
        {movieCredit.map(item => (
          <div key={item.id} className="px-2">
            {item.poster_path && 
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.title}</Tooltip>}>
                <Card.Img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} title={item.title}/>
              </OverlayTrigger>
            }
          </div>
        ))}
      </Slider>

      <h3 className="font-weight-bold">Séries de TV em que atuou</h3>
      <hr />
        <Slider {...settings}>
          {serieCredit.map(item => (
            <div className="px-2" key={item.id}> 
             {item.poster_path && 
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.name}</Tooltip>}>
                <Card.Img src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} alt={item.name} title={item.name}/>
              </OverlayTrigger>
              }
           </div>
          ))}
        </Slider>
      </PageSingleActor>

    </>
    
    
  );
}