/**
 * CapabilityAugmenter for modifying InitializeResult to add proxy capabilities
 *
 * This module handles the interception and modification of the initialize handshake
 * between the MCP client and child server. It augments the child server's capabilities
 * with proxy-specific functionality while preserving all original features.
 *
 * Key responsibilities:
 * - Add restart_server tool to the child's tool capabilities
 * - Append "-dev" suffix to server name and version for clear identification
 * - Preserve all existing tools, resources, and prompts from the child
 * - Enable tool list change notifications for restart events
 * - Maintain protocol version compatibility
 */
import { type InitializeResult, type ServerCapabilities, type Implementation, type Tool, type ChildServerInfo, type ProxyCapabilities } from './types.js';
/**
 * CapabilityAugmenter handles the modification of InitializeResult responses
 * from child MCP servers to add proxy-specific capabilities and naming.
 *
 * This class ensures that the proxy appears as a transparent wrapper that
 * enhances the child server's capabilities rather than replacing them.
 */
export declare class CapabilityAugmenter {
    private readonly logger;
    /**
     * Main entry point for augmenting an InitializeResult from a child server.
     * This method orchestrates all the individual augmentation steps.
     *
     * @param childResult - The original InitializeResult from the child server
     * @returns Augmented InitializeResult with proxy capabilities added
     * @throws Error if the childResult is malformed or missing required fields
     */
    augmentInitializeResult(childResult: InitializeResult): InitializeResult;
    /**
     * Adds the restart_server tool to the child server's capabilities.
     * Ensures tools capability exists and includes the restart functionality.
     *
     * @param childCapabilities - Original capabilities from child server
     * @returns Enhanced capabilities with restart_server tool
     */
    addRestartTool(childCapabilities: ServerCapabilities): ProxyCapabilities;
    /**
     * Modifies server information to append "-dev" suffix to name and version.
     * This clearly identifies the server as running through the development proxy.
     *
     * @param originalServerInfo - Original Implementation from child server
     * @returns Modified Implementation with -dev suffixes
     */
    modifyServerInfo(originalServerInfo: Implementation): Implementation;
    /**
     * Preserves all child server capabilities while ensuring proxy capabilities are included.
     * This method ensures no functionality is lost from the original server.
     *
     * @param originalCapabilities - Original capabilities from child
     * @param proxyCapabilities - Enhanced capabilities with proxy additions
     * @returns Final capabilities preserving all child features
     */
    preserveChildCapabilities(originalCapabilities: ServerCapabilities, proxyCapabilities: ProxyCapabilities): ProxyCapabilities;
    /**
     * Extracts child server information for internal state management.
     * This information is used by other proxy components for lifecycle management.
     *
     * @param initializeResult - The child's InitializeResult
     * @returns Structured child server information
     */
    extractChildServerInfo(initializeResult: InitializeResult): ChildServerInfo;
    /**
     * Gets the restart_server tool definition.
     * Provides access to the tool definition for other components.
     *
     * @returns The restart_server Tool definition
     */
    getRestartServerTool(): Tool;
    /**
     * Validates that the InitializeResult contains required fields.
     * Throws descriptive errors for missing or invalid data.
     *
     * @param result - InitializeResult to validate
     * @throws Error if validation fails
     */
    private validateInitializeResult;
    /**
     * Appends "-dev" suffix to a string if not already present.
     * Handles edge cases like empty strings and already-suffixed values.
     *
     * @param value - String to append suffix to
     * @returns String with -dev suffix
     */
    private appendDevSuffix;
    /**
     * Combines child server instructions with proxy-specific guidance.
     * Creates comprehensive instructions for the enhanced server.
     *
     * @param childInstructions - Original instructions from child server
     * @returns Combined instructions including proxy information
     */
    private combineInstructions;
}
/**
 * Convenience function to create and use a CapabilityAugmenter instance.
 * Provides a simple interface for one-time augmentation operations.
 *
 * @param childResult - InitializeResult from child server
 * @returns Augmented InitializeResult
 */
export declare function augmentCapabilities(childResult: InitializeResult): InitializeResult;
/**
 * Type guard to check if capabilities include proxy enhancements.
 * Useful for validation and testing scenarios.
 *
 * @param capabilities - ServerCapabilities to check
 * @returns True if capabilities appear to be proxy-enhanced
 */
export declare function hasProxyCapabilities(capabilities: ServerCapabilities): capabilities is ProxyCapabilities;
//# sourceMappingURL=capability-augmenter.d.ts.map