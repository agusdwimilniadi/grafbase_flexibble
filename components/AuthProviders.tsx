'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Kalau pake useState useEffect pake use-client

type Provider = {
  id: string;
  name: string;
  type: string;
  signUrl: string;
  callbackUrl: string;
  signUrlParams?: Record<string, string> | null;
  // Record adalah ntuk type object {}
};
type Providers = Record<string, Provider>;
const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    };
    fetchProviders();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => {
          return (
            <button key={i} onClick={() => signIn(provider?.id)}>
              {provider.id}
            </button>
          );
        })}
      </div>
    );
  }
};

export default AuthProviders;
