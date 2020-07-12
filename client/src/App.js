import React,{useEffect,useState,Suspense} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Register/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/Layout/NavBar/NavBar"
import LandingPage from "./components/LandingPage/LandingPage"
import axios from "axios"
import MovieDetailPage from "./components/MovieDetailPage/MovieDetailPage"
import "./App.css"
import userContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    userId: undefined
  })

  useEffect(()=>{
    const checkLoggedIn = async () =>{
      let token = localStorage.getItem("auth-token");
      //let userId = localStorage.getItem("userId")
      if(token===null){
        localStorage.setItem("auth-token","")
        //localStorage.setItem("userId", "")
        token= "";
        // userId = "";
      }
      const tokenRes = await axios.post(
        "https://movie-crispy.herokuapp.com/api/user/tokenIsvalid",
        null,
        {
          headers: { "x-access-token": token },
        }
      );
      if(tokenRes.data){
        // eslint-disable-next-line
        const userRes = await axios.get(
          "https://movie-crispy.herokuapp.com/api/user/users",
          {
            headers: { "x-access-token": token },
          }
        );
        setUserData({
          token: token,
         //  userId: userRes.data.userId
        })
      }
    }
    checkLoggedIn()
  },[])
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <userContext.Provider value={{ userData, setUserData }}>
            <NavBar />
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/login"} component={Login} />
              <Route path={"/register"} component={Register} />
              <Route exact path={"/movie/:movieId"} component={MovieDetailPage} />
            </Switch>
          </userContext.Provider>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
