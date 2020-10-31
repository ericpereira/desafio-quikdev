import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faStream} from '@fortawesome/free-solid-svg-icons'

import { MinMovieInterface } from '../../interfaces'

import empty from '../../assets/images/empty-image.jpg'

const MinMovie = (props:MinMovieInterface) => {
  const baseUrl = 'http://image.tmdb.org/t/p/'
  const genres = props.genres_all

  return (
    <>
      <div className='min-movie'>
          <div className='image-movie'>
            {(baseUrl && props.poster_path ?
              <img src={baseUrl+'w500/'+props.poster_path} alt="thumb movie"/>
              :
              <img src={empty} alt="thumb movie"/>
            )}
          </div>
          <div className='info-movie'>
            <h3>{props.title}</h3>
            <h4 className='info-release-date'>
              <FontAwesomeIcon className='icon-info-release-date' icon={faCalendarCheck} />
              Lançamento: {props.release_date && props.release_date.split('-').reverse().join('/')}
            </h4>
            <h4 className='info-genre'>
              <FontAwesomeIcon className='icon-info-genre' icon={faStream} />
              Gênero: {genres && props.genre_ids && props.genre_ids.map((genre, i) => {
                if(i !== props.genre_ids.length - 1){
                  return genres.filter(g => g.id === genre)[0].name+', '
                }else{
                  return genres.filter(g => g.id === genre)[0].name
                }
                
              })}

              {genres && props.genres && props.genres.map((genre, i) => {
                if(props.genres && i !== props.genres.length - 1){
                  return genres.filter(g => g.id === genre.id)[0].name+', '
                }else{
                  return genres.filter(g => g.id === genre.id)[0].name
                }
                
              })}
              
              </h4>
            <p>Resumo: {props.overview} </p>
          </div>              
        </div>
    </>
  )
}

export default MinMovie