import React from "react";
import HomePresenter from "./HomePresenter.js";
import { moviesApi } from "../../Components/api";

export default class HomeContainer extends React.Component {
  state = {
    //상태값은 api에서 확인 가능한 3가지가 베이스이다.
    nowPlaying: null,
    upcoming: null,
    popular: null,
    //위 세가지는 모두 함수!
    error: null,
    loading: true,
  };
  //api를 통해 데이터를 가져오기 때문에 값이 변하므로 state!
  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
        //results 값을 nowPlaying에 할당
      } = await moviesApi.nowPlaying();
      console.log(nowPlaying);
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      console.log(upcoming);
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      console.log(popular);
      this.setState({
        upcoming,
        popular,
        nowPlaying,
      });
      console.log(popular, upcoming, nowPlaying, "awesome");
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  //컴포넌트가 만들어지고 첫 rendering 을 다 마친 후 실행되는 메소드. 메소드 안에서 다른 js 프레임워크를 연동하거나, setTimeout, AJAX 처리 등을 넣는다.

  //클래스 컴포넌트는 렌더 메소드가 필수
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
        //props로 전달
      />
    );
  }
}
