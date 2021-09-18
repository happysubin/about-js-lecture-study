import client from "../client";

export default {
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),

    //리졸버와 스키마의 프로퍼티 순서도 아예 같아야한다!
    //createMovie:(root,args,info,context)=>{},
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year }) =>
      client.movie.update({ where: { id }, data: { year } }), //아이디로 찾고 내용은 year를 바꾼다
  },
};
