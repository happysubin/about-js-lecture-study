import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : data.movie.title}</Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
          </>
        )}
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};

//옵셔널 체이닝
// data && data.movies && data.movies.map() === {data?.movie?.map()} 와 같다. 밖에 걸 검사하고 있으면 그 객체의 내부 프로퍼티를 있는지 검사
//계속 이렇게 파고들어가면서 있는지 없는 지 검사한다.

/*
 query getMovie($id: Int!) { //아폴로를 위한 코드다. 아폴로가 변수의 타입을 검사. 그리고 실제 변수를 넣어줌. 변수형에서 느낌표 주의!!!
    //이 밑에 부터 우리가 작성한 쿼리를 쓰면 된다.  query는 위에 썼으므로 쿼리문에 다시 써줄 필요 없다.
      movie(id: $id) {
        id
        title
        medium_cover_image
        description_intro
      }
  }


*/
