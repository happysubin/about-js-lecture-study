import client from "../client";

export default {
  User: {
    totalFollowing: (root) =>
      client.user.count({ where: { followers: { some: { id: root.id } } } }),
    //root는 리퀘스트된 유저. (실제 데이터 모델)
    //우리가 설계한건 내가 팔로잉했으면 그사람에게나는 팔로워
    totalFollowers: (root) =>
      client.user.count({ where: { following: { some: { id: root.id } } } }),
    isMe: (root, _, context) => {
      if (!context.loggedInUser) {
        return false;
      }
      return root?.id === context?.loggedInUser?.id; //리퀘스트된 유저와 로그인한 내가 같다면 그것은 나다!즉 프로필을 수정할 권한을 줄거야 미래에
    },
  },
};

//await 할 이유가 없다???
//선생님 해설 If you return a prisma query there is no need to await. 놀랍다!!!!
