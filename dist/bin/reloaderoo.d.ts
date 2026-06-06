#!/usr/bin/env node
/**
 * reloaderoo CLI entry point
 *
 * A transparent MCP development wrapper that enables hot-reloading of MCP servers
 * without losing client session state. Acts as a proxy between MCP clients and servers.
 *
 * Usage:
 *   reloaderoo [options] -- <command> [args...]
 *   reloaderoo info
 *
 * Example:
 *   reloaderoo -- node /path/to/my-mcp-server.js
 *   reloaderoo --log-level debug -- python server.py --port 8080
 */
/**
 * Main CLI function - exported for use by index.ts
 */
export declare function runCLI(): Promise<void>;
//# sourceMappingURL=reloaderoo.d.ts.map