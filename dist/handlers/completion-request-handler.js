/**
 * Completion and Sampling Request Handler
 *
 * Handles MCP completion and sampling requests by forwarding them to the child server.
 */
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { logger } from '../mcp-logger.js';
export class CompletionRequestHandler {
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
     * Handle completion request
     */
    async handleComplete(request) {
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        try {
            const result = await this.childClient.complete(request.params);
            logger.debug('Completion request processed', {
                ref: request.params.ref
            }, 'PROXY-COMPLETION');
            return result;
        }
        catch (error) {
            logger.debug('Failed to process completion', {
                ref: request.params.ref,
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 'PROXY-COMPLETION');
            throw error;
        }
    }
    /**
     * Handle sampling request (create message)
     */
    async handleCreateMessage(_request) {
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        // Note: Simplified forwarding - in a full implementation, 
        // this would use proper MCP client sampling methods
        const error = new McpError(ErrorCode.MethodNotFound, 'Sampling not yet supported');
        logger.debug('Failed to process sampling request', {
            error: error.message
        }, 'PROXY-SAMPLING');
        throw error;
    }
}
//# sourceMappingURL=completion-request-handler.js.map