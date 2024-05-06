'use client';
import React, {useEffect, useState} from 'react';
import AdminLoginForm from '@/components/auth/admin/AdminLoginForm';
import Loader from "@/components/shared/dashboard/Loader";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); //1 second

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return <AdminLoginForm />;
  }
};
