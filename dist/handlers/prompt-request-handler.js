/**
 * Prompt Request Handler
 *
 * Handles MCP prompt-related requests by forwarding them to the child server.
 */
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { logger } from '../mcp-logger.js';
export class PromptRequestHandler {
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
     * Handle list prompts request
     */
    async handleListPrompts(_request) {
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        try {
            const result = await this.childClient.listPrompts();
            logger.debug('Listed prompts', { count: result.prompts.length }, 'PROXY-PROMPT');
            return result;
        }
        catch (error) {
            logger.debug('Failed to list prompts', {
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 'PROXY-PROMPT');
            throw error;
        }
    }
    /**
     * Handle get prompt request
     */
    async handleGetPrompt(request) {
        if (!this.childClient) {
            throw new McpError(ErrorCode.InternalError, 'Child server not available');
        }
        try {
            const result = await this.childClient.getPrompt(request.params);
            logger.debug('Got prompt', { name: request.params.name }, 'PROXY-PROMPT');
            return result;
        }
        catch (error) {
            logger.debug('Failed to get prompt', {
                name: request.params.name,
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 'PROXY-PROMPT');
            throw error;
        }
    }
}
//# sourceMappingURL=prompt-request-handler.js.map