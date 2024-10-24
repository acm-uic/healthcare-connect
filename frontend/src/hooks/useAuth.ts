// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/signin');
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { authenticated, loading };
};
