/**
 * Type definitions for reloaderoo
 *
 * This file provides comprehensive TypeScript types for reloaderoo,
 * extending the official MCP v2025-03-26 protocol types with proxy-specific functionality.
 */
import { PROXY_TOOLS } from './constants.js';
export { LATEST_PROTOCOL_VERSION, JSONRPC_VERSION } from '@modelcontextprotocol/sdk/types.js';
/**
 * Default configuration values used when not specified.
 */
export const DEFAULT_PROXY_CONFIG = {
    workingDirectory: process.cwd(),
    environment: {},
    restartLimit: 3,
    operationTimeout: 30000,
    logLevel: 'info',
    autoRestart: true,
    restartDelay: 1000
};
/**
 * Current lifecycle state of the child MCP server process.
 */
export var ProcessState;
(function (ProcessState) {
    /** Child process has not been started yet */
    ProcessState["STOPPED"] = "stopped";
    /** Child process is currently starting up */
    ProcessState["STARTING"] = "starting";
    /** Child process is running and ready to receive requests */
    ProcessState["RUNNING"] = "running";
    /** Child process is being restarted */
    ProcessState["RESTARTING"] = "restarting";
    /** Child process has crashed and auto-restart is in progress */
    ProcessState["CRASHED"] = "crashed";
    /** Child process is being shut down */
    ProcessState["STOPPING"] = "stopping";
    /** Child process failed to start or is permanently unavailable */
    ProcessState["UNAVAILABLE"] = "unavailable";
})(ProcessState || (ProcessState = {}));
// =============================================================================
// PROXY-SPECIFIC TOOLS & CAPABILITIES
// =============================================================================
/**
 * JSON Schema for the restart_server tool input parameters.
 */
export const RESTART_SERVER_SCHEMA = {
    type: 'object',
    properties: {
        config: {
            type: 'object',
            description: 'Optional configuration updates to apply during restart',
            properties: {
                environment: {
                    type: 'object',
                    description: 'Environment variables to update (merged with existing)',
                    additionalProperties: {
                        type: 'string'
                    }
                },
                childArgs: {
                    type: 'array',
                    description: 'Updated command-line arguments (replaces existing)',
                    items: {
                        type: 'string'
                    }
                },
                workingDirectory: {
                    type: 'string',
                    description: 'Updated working directory for the child process'
                }
            },
            additionalProperties: false
        },
        force: {
            type: 'boolean',
            description: 'Force restart even if the server appears to be running normally',
            default: false
        }
    },
    additionalProperties: false
};
/**
 * Definition of the restart_server tool that the proxy adds to the child's capabilities.
 * This tool allows clients to trigger a restart of the child MCP server.
 */
export const RESTART_SERVER_TOOL = {
    name: PROXY_TOOLS.RESTART_SERVER,
    description: 'Restart the MCP server process with optional configuration updates. ' +
        'This allows hot-reloading of server code or applying configuration changes ' +
        'without losing the client session.',
    inputSchema: RESTART_SERVER_SCHEMA
};
// =============================================================================
// ERROR HANDLING
// =============================================================================
/**
 * Specific error types that can occur in the proxy.
 */
export var ProxyErrorCode;
(function (ProxyErrorCode) {
    /** Child process failed to start */
    ProxyErrorCode["CHILD_START_FAILED"] = "CHILD_START_FAILED";
    /** Child process crashed unexpectedly */
    ProxyErrorCode["CHILD_CRASHED"] = "CHILD_CRASHED";
    /** Maximum restart attempts exceeded */
    ProxyErrorCode["RESTART_LIMIT_EXCEEDED"] = "RESTART_LIMIT_EXCEEDED";
    /** Operation timed out */
    ProxyErrorCode["OPERATION_TIMEOUT"] = "OPERATION_TIMEOUT";
    /** Child process is not responding */
    ProxyErrorCode["CHILD_UNRESPONSIVE"] = "CHILD_UNRESPONSIVE";
    /** Invalid configuration provided */
    ProxyErrorCode["INVALID_CONFIG"] = "INVALID_CONFIG";
    /** Request made while child is unavailable */
    ProxyErrorCode["CHILD_UNAVAILABLE"] = "CHILD_UNAVAILABLE";
})(ProxyErrorCode || (ProxyErrorCode = {}));
/**
 * JSON-RPC error responses for common proxy error conditions.
 */
export const PROXY_ERROR_RESPONSES = {
    CHILD_UNAVAILABLE: {
        code: -32000,
        message: 'Child server is currently unavailable'
    },
    RESTART_IN_PROGRESS: {
        code: -32001,
        message: 'Server restart is currently in progress'
    },
    RESTART_FAILED: {
        code: -32002,
        message: 'Failed to restart the child server'
    },
    INVALID_RESTART_CONFIG: {
        code: -32003,
        message: 'Invalid configuration provided for restart'
    }
};
/**
 * Environment variable mappings for configuration.
 */
export const ENV_MAPPINGS = {
    MCPDEV_PROXY_LOG_LEVEL: 'logLevel',
    MCPDEV_PROXY_RESTART_LIMIT: 'restartLimit',
    MCPDEV_PROXY_AUTO_RESTART: 'autoRestart',
    MCPDEV_PROXY_TIMEOUT: 'operationTimeout'
};
// =============================================================================
// UTILITY TYPES
// =============================================================================
/**
 * Type guard to check if an error is a ProxyError.
 */
export function isProxyError(error) {
    return error instanceof Error && 'code' in error &&
        Object.values(ProxyErrorCode).includes(error.code);
}
/**
 * Type guard to check if a request is for the restart_server tool.
 */
export function isRestartServerRequest(request) {
    return request.method === 'tools/call' &&
        request.params?.['name'] === PROXY_TOOLS.RESTART_SERVER;
}
//# sourceMappingURL=types.js.map