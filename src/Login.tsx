import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';

const RestApiKey = "aa0293e157b3b865a943deade9a3c1a8";
const redirectUrl = "http://localhost:3000";
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

function Login() {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();
  console.log(location, 'location');
  const getKakaoTokenHandler = async (code: string) => {
    const data: any = {
      grant_type: "authorization_code",
      client_id: RestApiKey,
      redirect_uri: redirectUrl,
      code: code
    };
    const queryString = Object.keys(data)
      .map((k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    // * 토큰 발급 REST API
    try {
      const token = await axios.post('https://kauth.kakao.com/oauth/token', queryString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      });
      if (token) {
        // * 토큰으로 유저정보 가져오기
        const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${token.data.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        });
        if (data.properties) {
          navigate("/main", {
            state:
            {
              userInfo: data.properties,
              token: token.data.access_token
            }
          });
        }
      }
    }
    catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);

  return (
    <View style={{
      width: 786,
      height: "100vh",
      justifyContent: "center", alignItems: "center",
      alignSelf: "center",
      backgroundColor: "black"
    }}>
      {/* eslint-disable-next-line react-native/no-raw-text */}
      <a href={kakaoUrl}
        style={{
          padding: "10px 20px",
          borderRadius: 5,
          backgroundColor: "#F1DC11",
          fontSize: 20,
          textDecoration: "none"
          // eslint-disable-next-line react-native/no-raw-text
        }}>
        KAKAO LOGIN
      </a>
    </View>
  );
}

export default Login;