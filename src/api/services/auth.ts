import coreApi from "../coreApi";

interface GoogleUserInfo {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
    sub: string;
  }
const getProfile = async (token: string) => {
    try {
        const response = await coreApi.get<GoogleUserInfo>(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;
          return data
    } catch (error) {
        throw error;
    }
  

};

export { getProfile };
