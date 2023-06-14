import { moviesApi, tvApi } from "Components/api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
  constructor(props) {
    //생성자
    super(props); //mdn : super 키워드는 부모 오브젝트의 함수를 호출할 때 사용됩니다. this 키워드가 사용되기 전에 호출되어야 합니다. ex(super.method())
    // super() 부모 클래스의 생성자
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"), //includes 메소드는 "/movie" 문자열이 pathname 문자열에 속해 있는지 없는지 검사한다. boolean값으로 리턴
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id); //id type이 string이라 number로 캐스팅한다.
    if (isNaN(parsedId)) {
      //ex id에 문자열이 들어와서 number로 캐스팅되다 실패하면 NAN이 된다. not a number라는 뜻이다
      return push("/"); // home으로 돌려보낸다
      //history.push 는 path를 이용해 원하는 컴포넌트로 이동한다.
    }
    let result = null;
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
      } else {
        const request = await tvApi.showDetail(parsedId);
        result = request.data;
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      console.log(result);
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
