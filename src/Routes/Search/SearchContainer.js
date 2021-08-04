import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class SearchContainer extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    //tv와 movie 검색결과를 보여준다
    searchTerm: "",
    loading: false,
    error: null,
  };
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
      />
    );
  }
}
