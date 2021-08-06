import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id); //id type이 string이라 number로 캐스팅한다.
    if (isNaN(parsedId)) {
      //ex id에 문자열이 들어와서 number로 캐스팅되다 실패하면 NAN이 된다. not a number라는 뜻이다
      return push("/"); // home으로 돌려보낸다
      //history.push 는 path를 이용해 원하는 컴포넌트로 이동한다.
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
