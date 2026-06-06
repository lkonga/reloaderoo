/**
 * Application-wide constants for Reloaderoo
 *
 * This file contains constants for strings that are repeated across multiple files
 * or are critical for protocol compliance and configuration consistency.
 */
/**
 * MCP (Model Context Protocol) related constants
 */
export declare const MCP_PROTOCOL: {
    readonly VERSION: "2024-11-05";
    readonly JSONRPC_VERSION: "2.0";
    readonly METHODS: {
        readonly INITIALIZE: "initialize";
        readonly TOOLS_LIST: "tools/list";
        readonly TOOLS_CALL: "tools/call";
        readonly RESOURCES_LIST: "resources/list";
        readonly RESOURCES_READ: "resources/read";
        readonly PROMPTS_LIST: "prompts/list";
        readonly PROMPTS_GET: "prompts/get";
    };
    readonly NOTIFICATIONS: {
        readonly TOOLS_LIST_CHANGED: "notifications/tools/list_changed";
        readonly RESOURCES_LIST_CHANGED: "notifications/resources/list_changed";
        readonly PROMPTS_LIST_CHANGED: "notifications/prompts/list_changed";
    };
};
/**
 * Proxy-specific tool names
 */
export declare const PROXY_TOOLS: {
    readonly RESTART_SERVER: "restart_server";
};
/**
 * Environment variable names for configuration
 */
export declare const ENV_VARS: {
    readonly LOG_LEVEL: "MCPDEV_PROXY_LOG_LEVEL";
    readonly LOG_FILE: "MCPDEV_PROXY_LOG_FILE";
    readonly RESTART_LIMIT: "MCPDEV_PROXY_RESTART_LIMIT";
    readonly AUTO_RESTART: "MCPDEV_PROXY_AUTO_RESTART";
    readonly TIMEOUT: "MCPDEV_PROXY_TIMEOUT";
    readonly RESTART_DELAY: "MCPDEV_PROXY_RESTART_DELAY";
    readonly CHILD_CMD: "MCPDEV_PROXY_CHILD_CMD";
    readonly CHILD_ARGS: "MCPDEV_PROXY_CHILD_ARGS";
    readonly CWD: "MCPDEV_PROXY_CWD";
    readonly DEBUG_MODE: "MCPDEV_PROXY_DEBUG_MODE";
};
/**
 * Standard error messages
 */
export declare const ERROR_MESSAGES: {
    readonly METHOD_NOT_FOUND: "Method not found";
};
//# sourceMappingURL=constants.d.ts.map