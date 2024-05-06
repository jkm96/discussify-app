'use client';
import {useEffect, useState} from 'react';
import {checkEmailVerificationStatus} from '@/helpers/authHelper';
import PermissionDeniedMessage from "@/components/shared/auth/PermissionDeniedMessage";
import UnVerifiedEmail from "@/components/shared/auth/UnVerifiedEmail";
import Authorizing from "@/components/shared/auth/Authorizing";

const AuthorizeComponent = (requiredPermissions: any) => (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkPermissions = async () => {
        try {
          const permissionStatus = true;
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
