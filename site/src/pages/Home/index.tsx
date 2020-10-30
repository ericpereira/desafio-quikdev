import React, { useEffect, useState } from 'react'

import api from '../../services/api';

import './styles.css'

import backHome from '../../assets/images/back-home.jpg'
import logo from '../../assets/images/logo-ericflix.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import MinMovie from '../../components/MinMovie'

interface Trend {
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

const Home = () => {

  const [trends, setTrends] = useState<Trend[]>()
  const [genres, setGenres] = useState<Genre[]>()
  
  
  //inicializa estados
  const init = async () => {
    //carrega os gêneros
    await api.get('http://127.0.0.1:8000/api/genres')
            .then(response => {
              //console.log(response.data.data)
              setGenres(response.data.data)
            })
    
    //carrega trends
    await api.get('http://127.0.0.1:8000/api/list')
            .then(response => {
              //console.log(response.data.data.results)
              setTrends(response.data.data.results)
            })
    
  
  }

  useEffect(()=>{
    init()
  },[])
  

  return (
    <>
      <div className='container-home'>
        <div className='logo-home'>
          <img src={backHome} className='back-img-home' alt='logo' />
          <img src={logo} className='logo' alt='logo' />
        </div>
        <div className='dynamic-content'>
          <div className='search-input'>
            <input type="text" placeholder='Buscar filme...' />
            <select name="genre" id="genre" className='genre-search'>
              <option value="GENRE">Gênero</option>
              {genres && genres.map(genre => {
                return <option key={genre.id} value={genre.id}>{genre.name}</option>
              })}
            </select>
            <FontAwesomeIcon className='icon-search' icon={faSearch} />
          </div>
          <div className='search-input order-content'>
            <select name="order" id="order" className='order-search'>
              <option value="day">Ordernar por</option>
              <option value="day">Dia</option>
              <option value="week">Semana</option>
              <option value="alphabetic">Ordem alfabética</option>
            </select>
          </div>
          <div className='trend'>
            <h2>Mais Buscados</h2>
            {trends && trends.map(movie => {
              const movieLink = 'detail/'+movie.id
              return (
                <Link key={movie.id} to={movieLink}>
                  <MinMovie {...movie} />
                </Link>
              )
            })}
            <div className='paginate'>
              <span>
                <FontAwesomeIcon className='icon-info-genre' icon={faChevronLeft} />
                  1
                <FontAwesomeIcon className='icon-info-genre' icon={faChevronRight} />
              </span>
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home