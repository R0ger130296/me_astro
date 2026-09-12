export function configuration(env: NodeJS.ProcessEnv = process.env) {
  const required = (name: string) => {
    const value = env[name]?.trim();
    if (!value) throw new Error(`Missing configuration: ${name}`);
    return value;
  };
  const issuer = required('KEYCLOAK_ISSUER').replace(/\/$/, '');
  const origins = required('CORS_ORIGINS').split(',').map((value) => value.trim());
  for (const value of [issuer, ...origins]) {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid HTTP URL');
    if (env.NODE_ENV === 'production' && url.protocol !== 'https:') throw new Error('Production requires HTTPS');
  }
  if (origins.some((value) => new URL(value).origin !== value)) throw new Error('CORS entries must be exact origins');
  const port = Number(env.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  return { issuer, origins, port, audience: required('KEYCLOAK_AUDIENCE'), databaseUrl: required('DATABASE_URL') };
}
