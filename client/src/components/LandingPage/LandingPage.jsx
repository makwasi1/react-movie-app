import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../config";
import { Typography, Row, Button } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [Current, setCurrent] = useState(0);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...movies, ...response.results]);
        setCurrent(response.page);
      });
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      Current + 1
    }`;
    fetchMovies(endpoint);
  };
  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/* main image */}
      {movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${
            movies[0].backdrop_path && movies[0].backdrop_path
          }`}
          title={movies[0].original_title}
          text={movies[0].overview}
        />
      )}

      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}>Movies by latest</Title>
        <hr />
        {/* grid cards */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>Load more</Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
