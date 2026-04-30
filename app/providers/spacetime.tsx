'use client';

import { SpacetimeDBProvider } from 'spacetimedb/react';
import { DbConnection } from '../../src/module_bindings';

const connectionBuilder = DbConnection.builder()
  .withUri(process.env.NEXT_PUBLIC_SPACETIMEDB_HOST!)
  .withDatabaseName(process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME!)
  .withToken(typeof window !== 'undefined' ? localStorage.getItem('stdb_token') || undefined : undefined)
  .onConnect((conn, identity, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stdb_token', token);
    }
    conn.subscriptionBuilder().subscribeToAllTables();
  });

export function SpacetimeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      {children}
    </SpacetimeDBProvider>
  );
}