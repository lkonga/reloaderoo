/**
 * Prompt Request Handler
 *
 * Handles MCP prompt-related requests by forwarding them to the child server.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ListPromptsRequest, GetPromptRequest, Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
export declare class PromptRequestHandler {
    private childClient;
    constructor(childClient: Client | null);
    /**
     * Update the child client reference
     */
    updateChildClient(client: Client | null): void;
    /**
     * Handle list prompts request
     */
    handleListPrompts(_request: ListPromptsRequest): Promise<{
        prompts: Prompt[];
    }>;
    /**
     * Handle get prompt request
     */
    handleGetPrompt(request: GetPromptRequest): Promise<GetPromptResult>;
}
//# sourceMappingURL=prompt-request-handler.d.ts.map