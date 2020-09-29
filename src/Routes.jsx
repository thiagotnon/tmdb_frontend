import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header';
import Genders from './pages/Genders';
import PopularMovies from './pages/Movies/popularMovies';
import ReleaseMovies from './pages/Movies/releaseMovies';
import SingleMovie from './pages/Movies/singleMovie';
import PopularSeries from './pages/Series/popularSeries';
import ReleaseSeries from './pages/Series/releaseSeries';
import SingleSeries from './pages/Series/singleSeries';
import PopularActors from './pages/Actors/popularActors';
import SingleActor from './pages/Actors/singleActor';
import newActors from './pages/Actors/newActors';

export default () => {
  return (
    <>
      <BrowserRouter>
        <Header />
       <Switch>
       <Route exact path="/generos" component={Genders}/>
        <Route exact path="/movies/popular" component={PopularMovies}/>
        <Route exact path="/movies/release" component={ReleaseMovies}/>
        <Route exact path="/movies/:id" component={SingleMovie}/>
        <Route exact path="/series/popular" component={PopularSeries}/>
        <Route exact path="/series/release" component={ReleaseSeries}/>
        <Route exact path="/series/:id" component={SingleSeries}/>
        <Route exact path="/actors/popular" component={PopularActors}/>
        <Route exact path="/actors/new" component={newActors}/>
        <Route exact path="/actors/:name/:id" component={SingleActor}/>
       </Switch>
      </BrowserRouter>
    </>
  );

}