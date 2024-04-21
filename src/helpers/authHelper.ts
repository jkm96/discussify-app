import { getAccessToken } from '@/lib/services/token/tokenService';
import { AccessTokenModel } from '@/boundary/interfaces/token';


export async function checkEmailVerificationStatus() {
  const response = await getAccessToken();
  if (response.statusCode === 200) {
    const tokenResponse: AccessTokenModel = JSON.parse(response.data);
    if (tokenResponse.user.isEmailVerified) {
      return true;
    }

    if (tokenResponse.user.isGracePeriodExpired && !tokenResponse.user.isEmailVerified){
      return false;
    }else{
      return true;
    }
  }

  return false;
}
