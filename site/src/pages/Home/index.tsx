import React, { useEffect, useState } from 'react'

import api from '../../services/api';

import './styles.css'

import backHome from '../../assets/images/back-home.jpg'
import logo from '../../assets/images/logo-ericflix.png'
import loadGif from '../../assets/images/load.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import MinMovie from '../../components/MinMovie'

import { Genre, MinMovieInterface } from '../../interfaces'


const Home = () => {

  const [trends, setTrends] = useState<MinMovieInterface[]>()
  const [trendsStatic, setTrendsStatic] = useState<MinMovieInterface[]>()
  const [genres, setGenres] = useState<Genre[]>()
  const [searchQuery, setSearchQuery] = useState('')

  //variaveis que controlam o que aparece na busca
  const [typeSearch, setTypeSearch] = useState('Mais Buscados')
  const [actualPage, setActualPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleSearchQuery = async (event:any) =>{
    setSearchQuery(event.target.value)
    
    if(event.target.value === ''){
      //carrega trends
      setIsLoaded(false)
      await api.get('/api/list')
      .then(response => {
        //console.log(response.data.data.results)
        setTrends(response.data.data.results.sort(function(a:any, b:any){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        }))

        setTrendsStatic(response.data.data.results.sort(function(a:any, b:any){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        }))
        setTypeSearch('Mais Buscados')
        setActualPage(0)
        setTotalPages(0)
        setIsLoaded(true)
      })
    }
  }

  const handleSearch = async (page:number) => {
    if(searchQuery && searchQuery !== ''){
      setIsLoaded(false)
      await api.get('/api/search?query='+searchQuery+'&page='+page)
        .then(response => {
          setTrends(response.data.data.results.sort(function(a:any, b:any){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
          }))

          //lista original sem filtros
          setTrendsStatic(response.data.data.results.sort(function(a:any, b:any){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
          }))
          
          setTypeSearch('Resultados: '+response.data.data.total_results)
          setActualPage(response.data.data.page ? response.data.data.page : 0)
          setTotalPages(response.data.data.total_pages)
          setIsLoaded(true)
        })
    }
  }

  const handleSearchEnter = async (event:any) => {
    if(event.key === 'Enter'){
      handleSearch(1)
    }
  }

  const nextPageSearch = async () => {
    if(actualPage < totalPages){
      handleSearch(actualPage + 1)
    }
  }

  const prevPageSearch = async () => {
    if(actualPage > 1){
      handleSearch(actualPage - 1)
    }
  }

  const filterGenre = async (event:any) => {
    const genre = event.target.value

    if(genre !== 'GENRE'){
      const filteredMovies = trendsStatic?.filter(movie => (movie.genre_ids && movie.genre_ids.includes(parseInt(genre))) || (movie.genres && movie.genres.filter(e => e.id === parseInt(genre)).length > 0))
      setTrends(filteredMovies)
    }else{
      //carrega trends novamente
      setTrends(trendsStatic)
    }
  }

  useEffect(()=>{
    //inicializa estados
    async function init () {
      //carrega os gêneros    
      if(!genres){
        api.get('/api/genres')
              .then(response => {
                //console.log(response.data.data)
                setGenres(response.data.data)
              })
      }
      
      if(!trends){
        //carrega trends
        await api.get('/api/list')
          .then(response => {
            //console.log(response.data.data.results)
            setTrends(response.data.data.results.sort(function(a:any, b:any){
              if(a.title < b.title) { return -1; }
              if(a.title > b.title) { return 1; }
              return 0;
            }))

            setTrendsStatic(response.data.data.results.sort(function(a:any, b:any){
              if(a.title < b.title) { return -1; }
              if(a.title > b.title) { return 1; }
              return 0;
            }))
          })
      }
      if(genres && trends){
        setIsLoaded(true)
      }      
    } 

    init()
    
  },[genres, trends])
  

  return (
    <>
      <div className='container-home'>
        <div className='logo-home'>
          <img src={backHome} className='back-img-home' alt='logo' />
          <img src={logo} className='logo' alt='logo' />
        </div>
        <div className='dynamic-content'>
          <div className='search-input'>
            <input type="text" placeholder='Buscar filme...' value={searchQuery} onChange={handleSearchQuery} onKeyDown={handleSearchEnter} />
            <FontAwesomeIcon className='icon-search' icon={faSearch} onClick={() => handleSearch(1)} />
          </div>
          <div className='search-input order-content'>
            <select name="genre" id="genre" className='order-search' onChange={filterGenre}>
              <option value="GENRE">Filtrar por Gênero</option>
              {genres && genres.map(genre => {
                return <option key={genre.id} value={genre.id} >{genre.name}</option>
              })}
            </select>
          </div>
          {(!isLoaded) ? 
          <div className='content-load'>
            <img src={loadGif} alt="load gif" className='load-gif'/>
          </div>
          :
          <div className='trend'>
            <h2>{typeSearch}</h2>
            {trends && trends.map(movie => {
              const movieLink = 'detail/'+movie.id
              return (
                <Link key={movie.id} to={movieLink}>
                  <MinMovie {...movie} genres_all={genres} />
                </Link>
              )
            })}
            <div className='paginate'>
              <span>
                {actualPage > 1 ? 
                <FontAwesomeIcon className='icon-info-genre' icon={faChevronLeft} onClick={() => prevPageSearch()} />
                : null }
                  {actualPage > 0 && totalPages > 0 ? actualPage : null}
                
                {actualPage < totalPages ? 
                <FontAwesomeIcon className='icon-info-genre' icon={faChevronRight} onClick={() => nextPageSearch()} />
                : null }
              </span>
            
            </div>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Home