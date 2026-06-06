/**
 * Completion and Sampling Request Handler
 *
 * Handles MCP completion and sampling requests by forwarding them to the child server.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { CompleteRequest, CreateMessageRequest, CompleteResult, CreateMessageResult } from '@modelcontextprotocol/sdk/types.js';
export declare class CompletionRequestHandler {
    private childClient;
    constructor(childClient: Client | null);
    /**
     * Update the child client reference
     */
    updateChildClient(client: Client | null): void;
    /**
     * Handle completion request
     */
    handleComplete(request: CompleteRequest): Promise<CompleteResult>;
    /**
     * Handle sampling request (create message)
     */
    handleCreateMessage(_request: CreateMessageRequest): Promise<CreateMessageResult>;
}
//# sourceMappingURL=completion-request-handler.d.ts.map