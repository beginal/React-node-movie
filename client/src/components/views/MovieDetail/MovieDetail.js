import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MoveInfo from './Sections/MoveInfo'
import GridCards from '../common/GridCards'
import Favorite from '../MovieDetail/Sections/Favorite'
import { Row } from 'antd';
function MovieDetail(props) {
  let movieId = props.match.params.movieId
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)

  const toggleActorView = () => {
    setActorToggle(!ActorToggle)
  }

  useEffect(() => {
    let endpointCrew = `${API_URL}${movieId}/credits?api_key=${API_KEY}&language=ko-KR`

    let endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}&language=ko-KR`

    fetch(endpointInfo)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setMovie(response)
    })

    fetch(endpointCrew)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setCasts(response.cast)
    })
  }, [])

  return (
    <div>

      {/* Herder */}

      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}      
      />

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto'}}>

        <div style= {{ display: 'flex', justifyContent:'flex-end'}}>
          <Favorite moveInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>
        {/* Movie Info */}
        <MoveInfo 
        movie={Movie}
        />
        <br />
        {/* Actors Grid */}
        <div style={{ display:'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={toggleActorView}> Toggle Action View </button>
        </div>
        {ActorToggle && 
        <Row gutter={[16,16]}>
                {Casts && Casts.map((cast, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            image={cast.profile_path ? 
                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                            ActorName={cast.name}
                        />
                    </React.Fragment>
                ))}

            </Row>
        }
        
      </div>
    </div>
  )
}

export default MovieDetail
