import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../common/GridCards'
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page + 1)
            })
    }
    useEffect(() => {
        const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=ko-KR&page=1`
        fetchMovies(endpoint)

    }, [])
    
    const loadMoreItems = () => {
        const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage}`
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Moives by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
            </div>
            <Row gutter={[16,16]}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                        landingPage
                            image={movie.poster_path ? 
                            `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}

            </Row>



            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage
