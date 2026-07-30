# Agent Rules

- Do *NOT* store/log the raw user IP address. For dedup/abuse-prevention use a hash-derived version of it.
- Whenever in doubt, use the `context7` MCP to query the latest docs for the required libraries.
- Push down the client-side logic/components far down the DOM tree to avoid unnecessary heavy re-renders, and to optimize the performance.
- SSR/SSG (wherever applicable) is the default approach to ensure SEO. Only use client components when necessary & for client-side interactions.
