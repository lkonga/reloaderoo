/**
 * RestartHandler for processing restart_server tool calls with validation,
 * config updates, notifications, and ProcessManager integration.
 */
import { EventEmitter } from 'events';
import { type JSONRPCRequest, type JSONRPCResponse, type ProxyConfigUpdate, type ChildServerInfo, type RestartServerRequest, type RestartServerResult, type RequestId } from './types.js';
import { ProcessManager } from './process-manager.js';
/** Events emitted by RestartHandler for monitoring restart operations */
export interface RestartHandlerEvents {
    'restart-initiated': [configUpdate?: ProxyConfigUpdate];
    'restart-completed': [result: RestartServerResult];
    'restart-failed': [error: Error, attempt: number];
    'config-validated': [update: ProxyConfigUpdate];
    'notifications-sent': [methods: string[]];
}
/** Internal state for tracking restart operations and rate limiting */
interface RestartHandlerState {
    isRestartInProgress: boolean;
    lastRestartTime: number;
    concurrentRequests: Set<string>;
    operationCount: number;
}
/** Rate limiting configuration for restart operations */
interface RateLimitConfig {
    /** Minimum time between restart operations in milliseconds */
    minInterval: number;
    /** Maximum concurrent restart requests allowed */
    maxConcurrent: number;
    /** Maximum restart operations per hour */
    maxPerHour: number;
}
/**
 * RestartHandler manages restart_server tool calls with secure config updates,
 * error handling, client notifications and rate limiting for system stability.
 */
export declare class RestartHandler extends EventEmitter<RestartHandlerEvents> {
    private readonly processManager;
    private readonly sendNotification;
    private readonly getServerInfo;
    private readonly state;
    private readonly rateLimit;
    /** Initialize RestartHandler with dependencies and configuration. */
    constructor(processManager: ProcessManager, sendNotification: (method: string, params?: Record<string, unknown>) => Promise<void>, getServerInfo: () => ChildServerInfo | null, rateLimitConfig?: Partial<RateLimitConfig>);
    /** Main entry point for handling restart_server tool calls. */
    handleRestartTool(request: JSONRPCRequest): Promise<JSONRPCResponse>;
    /** Validate restart request parameters. */
    validateRestartRequest(params: RestartServerRequest): {
        valid: boolean;
        error?: string;
    };
    /** Execute the restart operation with configuration updates. */
    executeRestart(params: RestartServerRequest): Promise<RestartServerResult>;
    /** Send notifications to client after successful restart. */
    sendRestartNotifications(): Promise<void>;
    /** Create a successful CallToolResult response for restart operations. */
    createRestartResult(requestId: RequestId, result: RestartServerResult): JSONRPCResponse;
    /** Validate and sanitize configuration updates for security. */
    private validateConfigUpdate;
    /** Sanitize configuration updates by removing dangerous values. */
    private sanitizeConfigUpdate;
    /** Check if environment variable name is dangerous. */
    private isDangerousEnvVar;
    /** Check if command line argument is dangerous. */
    private isDangerousArg;
    /** Apply rate limiting and atomically set restart flag if checks pass. */
    private checkRateLimitAndSetFlag;
    /** Create a JSON-RPC error response. */
    private createErrorResponse;
    /** Setup ProcessManager event listeners. */
    private setupProcessManagerListeners;
    /** Get current restart handler state for monitoring. */
    getState(): Readonly<RestartHandlerState>;
    /** Check if restart is in progress. */
    isRestartInProgress(): boolean;
}
export {};
//# sourceMappingURL=restart-handler.d.ts.map