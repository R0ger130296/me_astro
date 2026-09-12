import Keycloak from 'keycloak-js';

export function createAdminSession() {
  const url = import.meta.env.PUBLIC_KEYCLOAK_URL;
  const realm = import.meta.env.PUBLIC_KEYCLOAK_REALM;
  const clientId = import.meta.env.PUBLIC_KEYCLOAK_CLIENT_ID;
  const api = import.meta.env.PUBLIC_API_URL;
  if (!url || !realm || !clientId || !api) throw new Error('Configura las variables PUBLIC_KEYCLOAK_* y PUBLIC_API_URL para habilitar la administración.');
  const keycloak = new Keycloak({ url, realm, clientId });
  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    try { await keycloak.updateToken(30); }
    catch { keycloak.clearToken(); throw new Error('Tu sesión venció. Vuelve a iniciar sesión.'); }
    if (!keycloak.token) throw new Error('Inicia sesión para continuar.');
    const response = await fetch(`${api.replace(/\/$/, '')}/admin${path}`, {
      ...init, cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: { ...init.headers, Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 401) keycloak.clearToken();
      const error = await response.json().catch(() => null);
      throw new Error(Array.isArray(error?.message) ? error.message.join('. ') : error?.message ?? `No se pudo completar la operación (${response.status}).`);
    }
    return response.status === 204 ? undefined as T : response.json();
  }
  return { keycloak, request };
}
