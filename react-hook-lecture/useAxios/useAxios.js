import defaultAxios from "axios";
import { useEffect, useState } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  if (!opts.url) {
    return;
  }
  const refetch = () => {
    setState({ ...state, loading: true });
    setTrigger(new Date()); //랜덤숫자를 준다
  };
  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({ ...state, loading: false, data });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};
//만약 axios를 보내지 않으면 패키지에서 axios를 얻는다는 의미!

export default useAxios;
