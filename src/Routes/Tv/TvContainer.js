import { tvApi } from "Components/api";
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
  async componentDidMount() {
    try {
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      this.setState({
        airingToday,
        topRated,
        popular,
      });
      console.log(airingToday, topRated, popular);
    } catch {
      this.setState({ error: "Can't find Tv information." });
    } finally {
      this.setState({ loading: false });
    }
  }
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
