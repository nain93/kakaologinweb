import axios from 'axios';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useLocation, useNavigate } from 'react-router-dom';

interface UserDataType {
  userInfo: {
    nickname: string,
    profile_image: string,
    thumbnail_image: string
  },
  token: string
}

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as UserDataType;

  const handleLogout = async () => {
    try {
      const data = await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      if (data) {
        navigate("/");
      }
    }
    catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <View
      style={{
        width: 786,
        height: "100vh",
        flexDirection: "column",
        alignSelf: "center",
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Image source={{ uri: state.userInfo.profile_image }} style={{ width: 100, height: 100 }} />
      <Text style={{ color: "white", marginTop: 10 }}>{state.userInfo.nickname}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>
          로그아웃
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Main;