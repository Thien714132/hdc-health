import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLoading } from '@/context/loadingContext';

const RouterLoadingHandler = () => {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, setIsLoading]);

  return null; // nothing to render
};

export default RouterLoadingHandler;
