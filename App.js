import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./weather";

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp, condition: weather[0].main });
  };

  getLocation = async () => {
    try {
      const per = await Location.requestBackgroundPermissionsAsync(); //이 메소드를 통해 유저의 동의를 구한다.
      //여기서 에러나면 바로 catch 문으로
      console.log("permission", per);
      // 여기 이후부터 작동이 안된다 대박 사건?!?!?!!? option accuracy를 주니까 해결됨 이게 무슨일이람!!!
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 4 });
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
    } catch (error) {
      console.log(error);
      Alert.alert("Can't find you..", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

//ctrl + m 은 개발자 모드로 직행한다!
