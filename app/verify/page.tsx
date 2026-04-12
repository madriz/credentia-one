'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';
import { getSupabase } from '@/lib/supabase';

interface TokenRow {
  token_hash: string;
  country_code: string | null;
  created_at: string | null;
}

type Status = 'idle' | 'loading' | 'found' | 'missing' | 'error';

export default function VerifyPage() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [record, setRecord] = useState<TokenRow | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Verify a Credentia One File | Credentia One';
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setToken(t);
      void runVerify(t);
    }
  }, []);

  async function runVerify(t: string) {
    if (!t.trim()) return;
    setStatus('loading');
    setRecord(null);
    setErrorMsg(null);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('tokens')
        .select('token_hash, country_code, created_at')
        .eq('token_hash', t.trim())
        .maybeSingle();
      if (error) {
        setStatus('error');
        setErrorMsg(error.message);
        return;
      }
      if (data) {
        setRecord(data as TokenRow);
        setStatus('found');
      } else {
        setStatus('missing');
      }
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Verification failed.');
    }
  }

  return (
    <>
      <Nav />
      <main className="container-content py-12 max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
          Verify a Credentia One file
        </h1>
        <p className="text-text-body mb-8">
          Paste a Credentia token below to check whether it was generated using the
          Credentia One standard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            className="input-base"
            placeholder="Paste token here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            type="button"
            className="btn-primary whitespace-nowrap"
            onClick={() => runVerify(token)}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Checking, please wait.' : 'Verify'}
          </button>
        </div>

        {status === 'found' && record && (
          <div
            className="border-l-4 p-5 rounded"
            style={{ background: '#E6F8EE', borderColor: '#16A34A' }}
          >
            <div className="font-serif text-xl text-text-primary mb-2">Verified.</div>
            <p className="text-text-body mb-3">
              This file was generated using the Credentia One standard.
            </p>
            <dl className="text-sm grid grid-cols-2 gap-2">
              <dt className="text-text-muted">Country</dt>
              <dd>{record.country_code ?? 'Not provided'}</dd>
              <dt className="text-text-muted">Registered</dt>
              <dd>
                {record.created_at
                  ? new Date(record.created_at).toLocaleDateString()
                  : 'Not provided'}
              </dd>
            </dl>
          </div>
        )}

        {status === 'missing' && (
          <div
            className="border-l-4 p-5 rounded"
            style={{ background: '#F3F4F6', borderColor: '#9CA3AF' }}
          >
            <div className="font-serif text-xl text-text-primary mb-2">Not found.</div>
            <p className="text-text-body">
              This token was not found in the Credentia One registry.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div
            className="border-l-4 p-5 rounded"
            style={{ background: '#FDECEC', borderColor: '#DC2626' }}
            role="alert"
          >
            <div className="font-serif text-xl text-error mb-2">Error.</div>
            <p className="text-sm text-error">{errorMsg}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
