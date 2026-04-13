export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try serving the static asset first
    let response = await env.ASSETS.fetch(request);

    // If not found, serve index.html for SPA routing
    if (response.status === 404) {
      response = await env.ASSETS.fetch(new URL('/', url.origin));
      return new Response(response.body, {
        status: 200,
        headers: response.headers
      });
    }

    return response;
  }
};
