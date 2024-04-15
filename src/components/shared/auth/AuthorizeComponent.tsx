'use client';
import { useEffect, useState } from 'react';
import { checkEmailVerificationStatus, hasRequiredPermissions } from '@/helpers/authHelper';
import Authorizing from '@/components/common/auth/Authorizing';
import PermissionDeniedMessage from '@/components/common/auth/PermissionDeniedMessage';
import UnVerifiedEmail from '@/components/common/auth/UnVerifiedEmail';

const AuthorizeComponent = (requiredPermissions: any) => (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkPermissions = async () => {
        try {
          const permissionStatus = await hasRequiredPermissions(requiredPermissions);
          setHasPermission(permissionStatus);
          const emailVerificationStatus = await checkEmailVerificationStatus();
          setIsEmailVerified(emailVerificationStatus);
        } catch (error) {
          setHasPermission(false);
          setIsEmailVerified(false);
        } finally {
          setLoading(false);
        }
      };

      checkPermissions();
    }, [requiredPermissions]);

    if (loading) {
      return <Authorizing />;
    }

    if (!loading && !hasPermission) {
      return <PermissionDeniedMessage />;
    }

    if (!loading && !isEmailVerified) {
      return <UnVerifiedEmail />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthorizeComponent;
