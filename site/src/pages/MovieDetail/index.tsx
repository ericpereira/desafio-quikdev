import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import logo from '../../assets/images/logo-ericflix.png'

import MinMovie from '../../components/MinMovie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './styles.css'
import api from '../../services/api'

import { Genre, MinMovieInterface } from '../../interfaces'



const MovieDetail = () => {
  const [movie, setMovie] = useState<MinMovieInterface>()
  const [genres, setGenres] = useState<Genre[]>()

  const { movie_id } = useParams<{movie_id: string}>()
  
  useEffect(()=>{
    //inicializa estados
    async function init (){
      //carrega os gêneros    
      if(!genres){
        api.get('/api/genres')
              .then(response => {
                //console.log(response.data.data)
                setGenres(response.data.data)
              })
      }
      
      //carrega a base url das imagens
      await api.get('/api/detail/'+movie_id)
              .then(response => {
                //console.log(response.data.data)
                setMovie(response.data.data)
              })
    }
    
    init()
  },[genres, movie_id])



  return (
    <>
      <div className='container-detail'>
        <nav>
          <Link to='/'>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </Link>
          <img src={logo} alt="logo"/>
        </nav>
        <div className='content-movie'>
          {movie && <MinMovie {...movie} genres_all={genres} />}
        </div>     
      </div>
    </>
  )
}

export default MovieDetail