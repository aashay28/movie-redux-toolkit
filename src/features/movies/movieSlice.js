import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKEY } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await MovieApi.get(
      `?apikey=${APIKEY}&s=${"Harry"}&type=movie`
    );

    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const response = await MovieApi.get(
      `?apikey=${APIKEY}&s=${"Friends"}&type=series`
    );

    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apikey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);
const intialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};
const movieSlice = createSlice({
  name: "movies",
  intialState: intialState,
  reducers: {
    addMovies: (state = intialState, { payload }) => {
      state.movies = payload;
      return state;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      return (state = "loading");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: (state, action) => {
      state = action.error.message;
      return state;
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      return { ...state, selectMovieOrShow: payload };
    },
  },
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;

export default movieSlice.reducer;
