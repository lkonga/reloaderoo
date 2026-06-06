/**
 * Reloaderoo - Production Implementation
 *
 * A transparent proxy that enables hot-reloading of MCP servers during development
 * while maintaining client session state. Supports the full MCP protocol including
 * tools, resources, prompts, completion, sampling, and ping.
 */
import type { ProxyConfig } from './types.js';
/**
 * Production-ready Reloaderoo with full protocol support
 */
export declare class MCPProxy {
    private readonly config;
    private readonly server;
    private childClient;
    private childTransport;
    private isShuttingDown;
    private restartInProgress;
    private childTools;
    private toolHandler;
    private resourceHandler;
    private promptHandler;
    private completionHandler;
    private coreHandler;
    constructor(config: ProxyConfig);
    /**
     * Start the proxy and connect to child server
     */
    start(): Promise<void>;
    /**
     * Stop the proxy and cleanup resources
     */
    stop(): Promise<void>;
    /**
     * Start or restart the child MCP server
     */
    private startChildServer;
    /**
     * Stop the child MCP server
     */
    private stopChildServer;
    /**
     * Mirror tools and other capabilities from child server
     */
    private mirrorChildCapabilities;
    /**
     * Send notifications about capability changes after restart
     */
    private notifyCapabilityChanges;
    /**
     * Setup all MCP request handlers using dedicated handler classes
     */
    private setupRequestHandlers;
    /**
     * Setup tool-related request handlers
     */
    private updateHandlersWithChildClient;
    /**
     * Handle restart_server tool call
     */
    private handleRestartServer;
    /**
     * Setup error handling for the proxy
     */
    private setupErrorHandling;
    /**
     * Handle process shutdown signals
     */
    private handleShutdown;
    /**
     * Extract server name from child command for proxy naming
     */
    private extractServerName;
}
//# sourceMappingURL=mcp-proxy.d.ts.map