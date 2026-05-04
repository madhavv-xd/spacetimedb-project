import { handlers } from '@/auth';

// Expose the NextAuth GET/POST handlers at /api/auth/*
export const { GET, POST } = handlers;
