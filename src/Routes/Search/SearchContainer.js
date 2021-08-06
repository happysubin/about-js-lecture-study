import { moviesApi, tvApi } from "Components/api";
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

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      //빈문자열이 아니라면
      this.searchByTerm(searchTerm);
    }
  };

  searchByTerm = async (term) => {
    //const { searchTerm } = this.state; 이 구문을 가져오고 매개변수에 term을 안넣어도 된다! 똑같이 동작.
    this.setState({ loading: true }); //loading의 default 값이 false 라서 true 로 변경! 검색하면 로딩중.
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(term);

      const {
        data: { results: tvResults },
      } = await tvApi.search(term);

      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({
        error: "Can't find results.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
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
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
