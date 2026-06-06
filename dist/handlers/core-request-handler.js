/**
 * Core Request Handler
 *
 * Handles core MCP requests like ping operations.
 */
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { logger } from '../mcp-logger.js';
export class CoreRequestHandler {
    childClient = null;
    constructor(childClient) {
        this.childClient = childClient;
    }
    /**
     * Update the child client reference
     */
    updateChildClient(client) {
        this.childClient = client;
    }
    /**
     * Handle ping request
     */
    async handlePing(_request) {
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        try {
            const result = await this.childClient.ping();
            logger.debug('Ping successful', {}, 'PROXY-CORE');
            return result;
        }
        catch (error) {
            logger.debug('Ping failed', {
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 'PROXY-CORE');
            throw error;
        }
    }
}
//# sourceMappingURL=core-request-handler.js.map