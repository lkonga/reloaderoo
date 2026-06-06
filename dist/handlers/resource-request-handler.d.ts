/**
 * Resource Request Handler
 *
 * Handles MCP resource-related requests by forwarding them to the child server.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ListResourcesRequest, ReadResourceRequest, Resource } from '@modelcontextprotocol/sdk/types.js';
export declare class ResourceRequestHandler {
    private childClient;
    constructor(childClient: Client | null);
    /**
     * Update the child client reference
     */
    updateChildClient(client: Client | null): void;
    /**
     * Handle list resources request
     */
    handleListResources(_request: ListResourcesRequest): Promise<{
        resources: Resource[];
    }>;
    /**
     * Handle read resource request
     */
    handleReadResource(request: ReadResourceRequest): Promise<{
        contents: any[];
    }>;
}
//# sourceMappingURL=resource-request-handler.d.ts.map