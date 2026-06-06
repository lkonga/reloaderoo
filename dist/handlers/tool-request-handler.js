/**
 * Tool Request Handler
 *
 * Handles MCP tool-related requests including list tools and call tool operations.
 * Manages the restart_server tool locally and forwards other tool calls to the child server.
 */
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { logger } from '../mcp-logger.js';
import { PROXY_TOOLS } from '../constants.js';
export class ToolRequestHandler {
    childTools = [];
    childClient = null;
    handleRestartServer;
    constructor(childClient, childTools, handleRestartServer) {
        this.childClient = childClient;
        this.childTools = childTools;
        this.handleRestartServer = handleRestartServer;
    }
    /**
     * Update the child client reference
     */
    updateChildClient(client) {
        this.childClient = client;
    }
    /**
     * Update the child tools list
     */
    updateChildTools(tools) {
        this.childTools = tools;
    }
    /**
     * Handle list tools request
     */
    async handleListTools(_request) {
        const allTools = [
            ...this.childTools,
            this.getRestartServerTool()
        ];
        return { tools: allTools };
    }
    /**
     * Handle call tool request
     */
    async handleCallTool(request) {
        const { name, arguments: args } = request.params;
        const startTime = Date.now();
        logger.debug(`Proxying tool call: ${name}`, { arguments: args }, 'PROXY-TOOL');
        if (name === PROXY_TOOLS.RESTART_SERVER) {
            const result = await this.handleRestartServer(args);
            logger.debug(`Tool call completed: ${name}`, {
                duration_ms: Date.now() - startTime,
                success: !result.isError
            }, 'PROXY-TOOL');
            return result;
        }
        // Forward to child
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        try {
            const result = await this.childClient.callTool(request.params);
            logger.debug(`Tool call completed: ${name}`, {
                duration_ms: Date.now() - startTime,
                success: true
            }, 'PROXY-TOOL');
            return result;
        }
        catch (error) {
            logger.debug(`Tool call failed: ${name}`, {
                duration_ms: Date.now() - startTime,
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 'PROXY-TOOL');
            throw error;
        }
    }
    /**
     * Get the restart_server tool definition
     */
    getRestartServerTool() {
        return {
            name: PROXY_TOOLS.RESTART_SERVER,
            description: 'Restart the MCP server with optional configuration updates',
            inputSchema: {
                type: 'object',
                properties: {
                    force: {
                        type: 'boolean',
                        description: 'Force restart even if one is already in progress',
                        default: false
                    },
                    childCommand: {
                        type: 'string',
                        description: 'New command to run (optional)'
                    },
                    childArgs: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'New command arguments (optional)'
                    }
                },
                additionalProperties: false
            }
        };
    }
}
//# sourceMappingURL=tool-request-handler.js.map