import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo-ericflix.png'

import MinMovie from '../../components/MinMovie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const MovieDetail = () => {

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
          {/* <MinMovie /> */}
        </div>     
      </div>
    </>
  )
}

export default MovieDetail