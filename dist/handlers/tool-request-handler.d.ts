/**
 * Tool Request Handler
 *
 * Handles MCP tool-related requests including list tools and call tool operations.
 * Manages the restart_server tool locally and forwards other tool calls to the child server.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { Tool, CallToolResult, ListToolsRequest, CallToolRequest } from '@modelcontextprotocol/sdk/types.js';
export declare class ToolRequestHandler {
    private childTools;
    private childClient;
    private handleRestartServer;
    constructor(childClient: Client | null, childTools: Tool[], handleRestartServer: (args: unknown) => Promise<CallToolResult>);
    /**
     * Update the child client reference
     */
    updateChildClient(client: Client | null): void;
    /**
     * Update the child tools list
     */
    updateChildTools(tools: Tool[]): void;
    /**
     * Handle list tools request
     */
    handleListTools(_request: ListToolsRequest): Promise<{
        tools: Tool[];
    }>;
    /**
     * Handle call tool request
     */
    handleCallTool(request: CallToolRequest): Promise<CallToolResult>;
    /**
     * Get the restart_server tool definition
     */
    private getRestartServerTool;
}
//# sourceMappingURL=tool-request-handler.d.ts.map