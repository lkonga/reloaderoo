/**
 * Type definitions for reloaderoo
 *
 * This file provides comprehensive TypeScript types for reloaderoo,
 * extending the official MCP v2025-03-26 protocol types with proxy-specific functionality.
 */
export type { JSONRPCMessage, JSONRPCRequest, JSONRPCResponse, JSONRPCError, JSONRPCNotification, RequestId, InitializeRequest, InitializeResult, ServerCapabilities, ClientCapabilities, Implementation, Tool, CallToolRequest, CallToolResult, ListToolsRequest, ListToolsResult, ToolListChangedNotification, LoggingLevel, Request, Notification, Result } from '@modelcontextprotocol/sdk/types.js';
export { LATEST_PROTOCOL_VERSION, JSONRPC_VERSION } from '@modelcontextprotocol/sdk/types.js';
import type { Tool as MCPTool, ServerCapabilities, Implementation, JSONRPCRequest, JSONRPCResponse, JSONRPCError, JSONRPCNotification, LoggingLevel } from '@modelcontextprotocol/sdk/types.js';
/**
 * Main configuration interface for reloaderoo.
 * Defines how the proxy should launch and manage the child MCP server.
 */
export interface ProxyConfig {
    /** Command to execute for the child MCP server */
    childCommand: string;
    /** Command-line arguments to pass to the child server */
    childArgs: string[];
    /** Working directory for the child server process */
    workingDirectory: string;
    /** Environment variables to set for the child process */
    environment: Record<string, string>;
    /** Maximum number of restart attempts before giving up (default: 3) */
    restartLimit: number;
    /** Timeout in milliseconds for child process operations (default: 30000) */
    operationTimeout: number;
    /** Logging level for the proxy itself */
    logLevel: LoggingLevel;
    /** Whether to enable auto-restart on child process crashes (default: true) */
    autoRestart: boolean;
    /** Delay in milliseconds between restart attempts (default: 1000) */
    restartDelay: number;
    /** Whether to run in debug mode (MCP inspection server) */
    debugMode?: boolean;
    /** Optional log file path for writing logs to disk */
    logFile?: string;
}
/**
 * Partial configuration for updates during runtime.
 * Used by the restart_server tool to modify child server parameters.
 */
export interface ProxyConfigUpdate {
    /** Updated environment variables (merged with existing) */
    environment?: Record<string, string>;
    /** Updated command-line arguments (replaces existing) */
    childArgs?: string[];
    /** Updated working directory */
    workingDirectory?: string;
}
/**
 * Default configuration values used when not specified.
 */
export declare const DEFAULT_PROXY_CONFIG: Partial<ProxyConfig>;
/**
 * Information about the child MCP server extracted during initialization.
 * Used for dynamic naming and capability forwarding.
 */
export interface ChildServerInfo {
    /** Original server name from InitializeResult */
    name: string;
    /** Original server version from InitializeResult */
    version: string;
    /** Server capabilities reported by the child */
    capabilities: ServerCapabilities;
    /** Optional instructions from the child server */
    instructions?: string | undefined;
    /** Protocol version supported by the child */
    protocolVersion: string;
}
/**
 * Current lifecycle state of the child MCP server process.
 */
export declare enum ProcessState {
    /** Child process has not been started yet */
    STOPPED = "stopped",
    /** Child process is currently starting up */
    STARTING = "starting",
    /** Child process is running and ready to receive requests */
    RUNNING = "running",
    /** Child process is being restarted */
    RESTARTING = "restarting",
    /** Child process has crashed and auto-restart is in progress */
    CRASHED = "crashed",
    /** Child process is being shut down */
    STOPPING = "stopping",
    /** Child process failed to start or is permanently unavailable */
    UNAVAILABLE = "unavailable"
}
/**
 * Internal state management for the proxy.
 */
export interface ProxyState {
    /** Current child process instance (null if not running) */
    childProcess: import('child_process').ChildProcess | null;
    /** Current lifecycle state */
    processState: ProcessState;
    /** Number of restart attempts made */
    restartCount: number;
    /** Information about the child server (populated after initialization) */
    serverInfo: ChildServerInfo | null;
    /** Whether the proxy is currently shutting down */
    isShuttingDown: boolean;
    /** Timestamp of last restart attempt */
    lastRestartTime: number | null;
    /** Queue of pending requests during restart */
    pendingRequests: PendingRequest[];
}
/**
 * Represents a request that is pending while the child server is restarting.
 */
export interface PendingRequest {
    /** Original JSON-RPC request */
    request: JSONRPCRequest;
    /** Callback to resolve the request */
    resolve: (response: JSONRPCResponse) => void;
    /** Callback to reject the request */
    reject: (error: JSONRPCError) => void;
    /** Timestamp when the request was queued */
    timestamp: number;
}
/**
 * JSON Schema for the restart_server tool input parameters.
 */
export declare const RESTART_SERVER_SCHEMA: {
    readonly type: "object";
    readonly properties: {
        readonly config: {
            readonly type: "object";
            readonly description: "Optional configuration updates to apply during restart";
            readonly properties: {
                readonly environment: {
                    readonly type: "object";
                    readonly description: "Environment variables to update (merged with existing)";
                    readonly additionalProperties: {
                        readonly type: "string";
                    };
                };
                readonly childArgs: {
                    readonly type: "array";
                    readonly description: "Updated command-line arguments (replaces existing)";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly workingDirectory: {
                    readonly type: "string";
                    readonly description: "Updated working directory for the child process";
                };
            };
            readonly additionalProperties: false;
        };
        readonly force: {
            readonly type: "boolean";
            readonly description: "Force restart even if the server appears to be running normally";
            readonly default: false;
        };
    };
    readonly additionalProperties: false;
};
/**
 * Definition of the restart_server tool that the proxy adds to the child's capabilities.
 * This tool allows clients to trigger a restart of the child MCP server.
 */
export declare const RESTART_SERVER_TOOL: MCPTool;
/**
 * Request parameters for the restart_server tool.
 */
export interface RestartServerRequest {
    /** Optional configuration updates to apply */
    config?: ProxyConfigUpdate;
    /** Force restart even if server is running normally */
    force?: boolean;
}
/**
 * Result returned by the restart_server tool.
 */
export interface RestartServerResult {
    /** Whether the restart was successful */
    success: boolean;
    /** Descriptive message about the restart operation */
    message: string;
    /** Time taken for the restart operation in milliseconds */
    restartTime: number;
    /** New server information after restart */
    serverInfo: ChildServerInfo;
    /** Number of restart attempts made */
    restartCount: number;
}
/**
 * Enhanced server capabilities that include the proxy's restart tool.
 */
export interface ProxyCapabilities extends ServerCapabilities {
    /** Tools capability is always present since we add restart_server */
    tools: {
        /** Whether the server supports tool list change notifications */
        listChanged?: boolean;
    };
}
/**
 * Interface for components that can intercept and handle specific MCP messages.
 */
export interface MessageInterceptor {
    /**
     * Check if this interceptor should handle the given request.
     * @param request The incoming JSON-RPC request
     * @returns true if this interceptor should handle the request
     */
    shouldIntercept(request: JSONRPCRequest): boolean;
    /**
     * Handle an intercepted request.
     * @param request The JSON-RPC request to handle
     * @returns Promise resolving to the response or error, or null to forward to child
     */
    handleRequest(request: JSONRPCRequest): Promise<JSONRPCResponse | JSONRPCError | null>;
}
/**
 * Types of messages that the proxy may need to intercept.
 */
export type InterceptableMethod = 'initialize' | 'tools/call' | 'tools/list' | 'ping';
/**
 * Augmented InitializeResult that includes proxy modifications.
 */
export interface InitializeAugmentation {
    /** Modified server info with -dev suffix */
    serverInfo: Implementation;
    /** Enhanced capabilities including restart tool */
    capabilities: ProxyCapabilities;
    /** Original protocol version from child */
    protocolVersion: string;
    /** Combined instructions from child and proxy */
    instructions?: string;
}
/**
 * Specific error types that can occur in the proxy.
 */
export declare enum ProxyErrorCode {
    /** Child process failed to start */
    CHILD_START_FAILED = "CHILD_START_FAILED",
    /** Child process crashed unexpectedly */
    CHILD_CRASHED = "CHILD_CRASHED",
    /** Maximum restart attempts exceeded */
    RESTART_LIMIT_EXCEEDED = "RESTART_LIMIT_EXCEEDED",
    /** Operation timed out */
    OPERATION_TIMEOUT = "OPERATION_TIMEOUT",
    /** Child process is not responding */
    CHILD_UNRESPONSIVE = "CHILD_UNRESPONSIVE",
    /** Invalid configuration provided */
    INVALID_CONFIG = "INVALID_CONFIG",
    /** Request made while child is unavailable */
    CHILD_UNAVAILABLE = "CHILD_UNAVAILABLE"
}
/**
 * Enhanced error type for proxy-specific errors.
 */
export interface ProxyError extends Error {
    /** Specific error code */
    code: ProxyErrorCode;
    /** Additional error context */
    context?: Record<string, unknown>;
    /** Original error if this wraps another error */
    cause?: Error;
}
/**
 * JSON-RPC error responses for common proxy error conditions.
 */
export declare const PROXY_ERROR_RESPONSES: {
    readonly CHILD_UNAVAILABLE: {
        readonly code: -32000;
        readonly message: "Child server is currently unavailable";
    };
    readonly RESTART_IN_PROGRESS: {
        readonly code: -32001;
        readonly message: "Server restart is currently in progress";
    };
    readonly RESTART_FAILED: {
        readonly code: -32002;
        readonly message: "Failed to restart the child server";
    };
    readonly INVALID_RESTART_CONFIG: {
        readonly code: -32003;
        readonly message: "Invalid configuration provided for restart";
    };
};
/**
 * Command-line argument structure for the proxy.
 */
export interface CLIArguments {
    /** Child server command and arguments */
    childCmd: string;
    /** Configuration file path */
    config?: string;
    /** Override working directory */
    cwd?: string;
    /** Override log level */
    logLevel?: LoggingLevel;
    /** Disable auto-restart */
    noAutoRestart?: boolean;
    /** Override restart limit */
    restartLimit?: number;
    /** Show version information */
    version?: boolean;
    /** Show help */
    help?: boolean;
}
/**
 * Environment variable mappings for configuration.
 */
export declare const ENV_MAPPINGS: {
    readonly MCPDEV_PROXY_LOG_LEVEL: "logLevel";
    readonly MCPDEV_PROXY_RESTART_LIMIT: "restartLimit";
    readonly MCPDEV_PROXY_AUTO_RESTART: "autoRestart";
    readonly MCPDEV_PROXY_TIMEOUT: "operationTimeout";
};
/**
 * Configuration validation result.
 */
export interface ConfigValidationResult {
    /** Whether the configuration is valid */
    valid: boolean;
    /** Validation error messages */
    errors: string[];
    /** Non-fatal warnings */
    warnings: string[];
    /** Validated and normalized configuration */
    config?: ProxyConfig;
}
/**
 * Type guard to check if an error is a ProxyError.
 */
export declare function isProxyError(error: unknown): error is ProxyError;
/**
 * Type guard to check if a request is for the restart_server tool.
 */
export declare function isRestartServerRequest(request: JSONRPCRequest): boolean;
/**
 * Extract just the types we need for message handling.
 */
export type MCPRequest = JSONRPCRequest;
export type MCPResponse = JSONRPCResponse;
export type MCPNotification = JSONRPCNotification;
export type MCPError = JSONRPCError;
//# sourceMappingURL=types.d.ts.map