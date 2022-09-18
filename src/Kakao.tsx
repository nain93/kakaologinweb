import { NativeModules, Platform } from 'react-native';

const { RNKakaoLogins } = NativeModules;

export type KakaoOAuthToken = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

export type KakaoAccessTokenInfo = {
  accessToken: string;
  expiresIn: string;
};

export type KakaoProfile = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  phoneNumber: string;
  ageRange: string;
  birthday: string;
  birthdayType: string;
  birthyear: string;
  gender: string;
  isEmailValid: boolean;
  isEmailVerified: boolean;
  isKorean: boolean;
  ageRangeNeedsAgreement?: boolean;
  birthdayNeedsAgreement?: boolean;
  birthyearNeedsAgreement?: boolean;
  emailNeedsAgreement?: boolean;
  genderNeedsAgreement?: boolean;
  isKoreanNeedsAgreement?: boolean;
  phoneNumberNeedsAgreement?: boolean;
  profileNeedsAgreement?: boolean;
};

export type KakaoProfileNoneAgreement = {
  id: string;
};

export type DataType = {
  grant_type: "authorization_code",
  client_id: string,
  redirect_uri: string,
  code: string
}

export type KakaoOAuthWebToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

export const login = async ({ restApiKeyWeb, redirectUrlWeb, codeWeb }: { restApiKeyWeb: string, redirectUrlWeb: string, codeWeb: string }):
  Promise<KakaoOAuthWebToken> => {
  if (Platform.OS === 'web') {
    if (!restApiKeyWeb || !redirectUrlWeb || !codeWeb) throw new Error('Web parameters are not provided');
  }
  const data: any = {
    grant_type: "authorization_code",
    client_id: restApiKeyWeb,
    redirect_uri: redirectUrlWeb,
    code: codeWeb
  };

  const queryString = Object.keys(data)
    .map((k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');


  try {
    const result = await fetch('https://kauth.kakao.com/oauth/token', {
      method: "post",
      body: queryString,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
    });

    return result.json();
  }
  catch (err) {
    throw err;
  }
};

export const loginWithKakaoAccount = async (): Promise<KakaoOAuthToken> => {
  try {
    const result: KakaoOAuthToken = await RNKakaoLogins.loginWithKakaoAccount();

    return result;
  } catch (err) {
    throw err;
  }
};

export const logout = async (tokenWeb: string): Promise<string> => {
  try {
    const result = await fetch('https://kapi.kakao.com/v1/user/logout', {
      method: "post",
      headers: {
        Authorization: `Bearer ${tokenWeb}`,
      },
    });

    return result.json();
  }
  catch (err) {
    throw err;
  }
};

export const unlink = async (tokenWeb: string): Promise<string> => {
  try {
    const result = await fetch('https://kapi.kakao.com/v1/user/unlink', {
      method: "post",
      headers: {
        Authorization: `Bearer ${tokenWeb}`,
      },
    });

    return result.json();
  }
  catch (err) {
    throw err;
  }
};

export type kakaoProfileWebType = {
  properties: {
    ninkname: string,
    profile_image: string,
    thumbnail_image: string
  }
}

export const getProfile = async (tokenWeb: string): Promise<
  kakaoProfileWebType
> => {

  try {
    const result = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenWeb}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });

    return result.json();
  } catch (err) {
    throw err;
  }
};

export const getAccessToken = async (): Promise<KakaoAccessTokenInfo> => {
  try {
    const result: KakaoAccessTokenInfo = await RNKakaoLogins.getAccessToken();

    return result;
  } catch (err) {
    throw err;
  }
};