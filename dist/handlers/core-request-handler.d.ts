/**
 * Core Request Handler
 *
 * Handles core MCP requests like ping operations.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { PingRequest } from '@modelcontextprotocol/sdk/types.js';
export declare class CoreRequestHandler {
    private childClient;
    constructor(childClient: Client | null);
    /**
     * Update the child client reference
     */
    updateChildClient(client: Client | null): void;
    /**
     * Handle ping request
     */
    handlePing(_request: PingRequest): Promise<{}>;
}
//# sourceMappingURL=core-request-handler.d.ts.map