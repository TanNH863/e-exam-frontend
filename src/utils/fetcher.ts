const getCsrfToken = (): string => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(^| )csrf_token=([^;]+)"));
  if (match) return match[2];
  return "";
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  // 1. Prepend the base URL automatically
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const url = `${baseUrl}${endpoint}`;

  // 2. Normalize headers (handles both Headers objects and plain objects)
  const headers = new Headers(options.headers);

  // 3. Attach CSRF token for state-changing requests
  const method = options.method?.toUpperCase() || "GET";
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }

    // Automatically set Content-Type to JSON if not uploading a file (FormData)
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
  }

  // 4. Merge everything into the final config
  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include", // ALWAYS include cookies for Auth and CSRF
  };

  // 5. Execute the fetch
  const response = await fetch(url, config);

  // Global 401 Unauthorized handling
  // trigger a global event to clear the Zustand store
  if (response.status === 401 && endpoint !== "/login") {
     window.dispatchEvent(new Event("unauthorized"));
  }

  return response;
};