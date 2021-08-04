import React from "react";
import TvPresenter from "./TvPresenter";

export default class TvContainer extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  };
  render() {
    const { topRated, airingToday, popular, error, loading } = this.state;
    return (
      //tv api 메소드를 가져온다
      <TvPresenter
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
