// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password', '/activate'];

    // Check if the route is public
    if (!token && !publicRoutes.includes(router.pathname)) {
      router.push('/signin');
    } else if (token) {
      setAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  return { authenticated, loading };
};
