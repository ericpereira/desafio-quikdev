import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCalendarCheck, faStream, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import thumb from '../../assets/images/movie-thumb.jpg'
import api from '../../services/api'


interface MinMovie {
  id: number
  poster_path: string
  title: string
  release_date: string
  genre_ids: number[]
  overview: string
}

interface Genre{
  id: number
  name: string
}

const MinMovie = (props:MinMovie) => {
  const [baseUrl, setBaseUrl] = useState('http://image.tmdb.org/t/p/')
  const [genres, setGenres] = useState<Genre[]>()

  //inicializa estados
  const init = async () => {
    //carrega os gêneros
    await api.get('http://127.0.0.1:8000/api/genres')
            .then(response => {
              //console.log(response.data.data)
              setGenres(response.data.data)
            })

    
    // //carrega a base url das imagens
    // await api.get('http://127.0.0.1:8000/api/baseurl')
    //         .then(response => {
    //           //console.log(response.data.data.images.base_url)
    //           setBaseUrl(response.data.data.images.base_url)
    //         })

    
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <>
      <div className='min-movie'>
          <div className='image-movie'>
            {baseUrl && props.poster_path && 
              <img src={baseUrl+'w500/'+props.poster_path} alt="thumb movie"/>
            }
          </div>
          <div className='info-movie'>
            <h3>{props.title}</h3>
            <h4 className='info-release-date'>
              <FontAwesomeIcon className='icon-info-release-date' icon={faCalendarCheck} />
              Lançamento: {props.release_date.split('-').reverse().join('/')}
            </h4>
            <h4 className='info-genre'>
              <FontAwesomeIcon className='icon-info-genre' icon={faStream} />
              Gênero: {genres && props.genre_ids.map((genre, i) => {
                if(i !== props.genre_ids.length - 1){
                  return genres.filter(g => g.id === genre)[0].name+', '
                }else{
                  return genres.filter(g => g.id === genre)[0].name
                }
                
              })}</h4>
            <p>Resumo: {props.overview} </p>
          </div>              
        </div>
    </>
  )
}

export default MinMovie