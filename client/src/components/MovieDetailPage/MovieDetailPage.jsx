import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";
//import userContext from "../../context/userContext"

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=em-US`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setCrews(response.cast);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* main image */}
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${
            Movie.backdrop_path && Movie.backdrop_path
          }`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      <br />
      <div styles={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        {/* table for movie details */}
        <Descriptions title="Movie Info" bordered>
          <Descriptions.item label="Title">
            {Movie.original_title}
          </Descriptions.item>
          <Descriptions.item label="release_date">
            {Movie.release_date}
          </Descriptions.item>
          <Descriptions.item label="revenue">{Movie.revenue}</Descriptions.item>
          <Descriptions.item label="runtime">{Movie.runtime}</Descriptions.item>
          <Descriptions.item label="vote_average" span={2}>
            {Movie.vote_average}
          </Descriptions.item>
          <Descriptions.item label="vote_count">
            {Movie.vote_count}
          </Descriptions.item>
          <Descriptions.item label="status">{Movie.status}</Descriptions.item>
          <Descriptions.item label="popularity">
            {Movie.popularity}
          </Descriptions.item>
        </Descriptions>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> View Actors </Button>
        </div>
        <br />
        {/* grid cards */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  {crew.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${crew.profile_path}`}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
