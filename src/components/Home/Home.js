import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const movietext = "Harry";
  const showtext = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movietext));
    dispatch(fetchAsyncShows(showtext));
  }, [dispatch]);
  return (
    <div>
      <div className='banner-img'></div>
      <MovieListing />
    </div>
  );
};

export default Home;
