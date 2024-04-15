import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import { getAccessToken } from '@/lib/services/token/tokenService';
import { AccessTokenModel } from '@/boundary/interfaces/token';

export async function hasRequiredPermissions(requiredPermissions: string[]): Promise<boolean> {
  const response = await getAccessToken();
  if (response.statusCode === 200) {
    const tokenResponse: AccessTokenModel = JSON.parse(response.data);
    const userPermissions = getEnumNamesFromValues(tokenResponse.user.permissions);
    const alwaysTruePermission = MapPermission(PetJournalPermission.PermissionsAccessAll);
    if (requiredPermissions.includes(alwaysTruePermission)) {
      return true;
    }

    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission.trim()),
    );
  }

  return false;
}

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

function getEnumNamesFromValues(values: number[]): string[] {
  return values.map((value) => PetJournalPermission[value]);
}
