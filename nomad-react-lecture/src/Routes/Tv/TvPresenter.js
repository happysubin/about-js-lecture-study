import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0px 20px;
`;

const TVPresenter = ({ topRated, airingToday, popular, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section>
          {topRated.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={
                show.first_air_date ? show.first_air_date.substring(0, 4) : ""
              }
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section>
          {airingToday.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={
                show.first_air_date ? show.first_air_date.substring(0, 4) : ""
              }
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section>
          {popular.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={
                show.first_air_date ? show.first_air_date.substring(0, 4) : ""
              }
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
