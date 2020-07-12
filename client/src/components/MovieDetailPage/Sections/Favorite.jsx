import React, { useEffect, useState,useContext } from "react";
import { Button } from "antd";
import {useHistory} from "react-router-dom"
import axios from "axios";
import userContext from "../../../context/userContext"

function Favorite(props) {
  const history = useHistory();

  const variables = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };
  const {userData , setUserData} = useContext(userContext)
  const [favoriteNumber, setfavoriteNumber] = useState(0);
  const [favorited, setfavorited] = useState(false);


  const onClickFavorite = () => {
    
   let token = localStorage.getItem("auth-token")
     setUserData({
       token: token,
     });
    //  localStorage.setItem("auth-token",""
    //  history.push()"/login");

    if(!userData.token){
      // alert("Please login")
      history.push("/login")
    } else {
      //alert("clicked")
      handleOnClick();
    // if (favorited) {
    //   axios
    //     .post(
    //       "https://movie-crispy.herokuapp.com/api/favorite/removeFromFavorites",
    //       variables
    //     )
    //     .then((response) => {
    //       if (response.data.success) {
    //         console.log(response);
    //         setfavoriteNumber(favoriteNumber + 1);
    //         setfavorited(!favorited);
    //         alert("clicked")
    //       } else {
    //         alert("failed to remove favorites ");
    //       }
    //     });
    // } 
    // else {
    //   axios
    //     .post(
    //       "https://movie-crispy.herokuapp.com/api/favorite/AddToFavorites",
    //       variables
    //     )
    //     .then((response) => {
    //       if (response.data.success) {
    //         alert("thanks");
    //         setfavoriteNumber(favoriteNumber + 1);
    //         setfavorited(!favorited);
    //       } else {
    //         alert("failed to add to favorites ");
    //       }
    //     });
    // }
  }};
const handleOnClick = () => {
  setfavoriteNumber(favoriteNumber + 1)
}
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/favorite/favoriteNumber", variables)
      .then((response) => {
        if (response.data.success) {
          setfavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("failed to get favoriteNumber");
        }
      });

    axios
      .post("http://localhost:5000/api/favorite/favorited", variables)
      .then((response) => {
        if (response.data.success) {
          setfavorited(response.data.favorited);
        } else {
          alert("failed to get favorite info");
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {!favorited ? "Add favorite" : "Not favorated"} {favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
