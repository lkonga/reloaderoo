/**
 * Comprehensive error handling system for mcpdev-proxy
 *
 * This module provides centralized error management with JSON-RPC compliance,
 * error classification, retry logic, and integration with the logging system.
 */
import { ProxyErrorCode } from './types.js';
import type { JSONRPCError, RequestId, ProxyError } from './types.js';
export declare const JSONRPC_ERROR_CODES: {
    readonly PARSE_ERROR: -32700;
    readonly INVALID_REQUEST: -32600;
    readonly METHOD_NOT_FOUND: -32601;
    readonly INVALID_PARAMS: -32602;
    readonly INTERNAL_ERROR: -32603;
    readonly SERVER_ERROR_START: -32099;
    readonly SERVER_ERROR_END: -32000;
};
export declare const PROXY_SPECIFIC_ERROR_CODES: {
    readonly CHILD_UNAVAILABLE: -32000;
    readonly RESTART_IN_PROGRESS: -32001;
    readonly RESTART_FAILED: -32002;
    readonly INVALID_RESTART_CONFIG: -32003;
    readonly CHILD_TIMEOUT: -32004;
    readonly CHILD_CRASHED: -32005;
    readonly RESTART_LIMIT_EXCEEDED: -32006;
    readonly INVALID_PROXY_CONFIG: -32007;
    readonly CHILD_START_FAILED: -32008;
};
/**
 * Error context information for debugging and logging
 */
export interface ErrorContext extends Record<string, unknown> {
    request?: unknown;
    childProcess?: {
        pid?: number;
        exitCode?: number | null;
        signal?: string | null;
    };
    timing?: {
        startTime?: number;
        duration?: number;
    };
    metadata?: Record<string, unknown>;
}
/**
 * Extended proxy error with additional context
 */
export declare class ProxyErrorExtended extends Error implements ProxyError {
    readonly code: ProxyErrorCode;
    readonly context?: Record<string, unknown>;
    readonly cause?: Error;
    readonly timestamp: number;
    readonly retryable: boolean;
    name: string;
    constructor(code: ProxyErrorCode, message: string, options?: {
        cause?: Error;
        context?: Record<string, unknown>;
        retryable?: boolean;
    });
}
/**
 * Centralized error handler for the proxy
 */
export declare class ProxyErrorHandler {
    private readonly maxRetries;
    private readonly retryDelayMs;
    private readonly circuitBreakerThreshold;
    private failureCount;
    private lastFailureTime;
    constructor(options?: {
        maxRetries?: number;
        retryDelayMs?: number;
        circuitBreakerThreshold?: number;
    });
    /**
     * Handle an error and determine the appropriate response
     */
    handleError(error: unknown, context?: ErrorContext): {
        code: number;
        message: string;
        data?: unknown;
    };
    /**
     * Create a JSON-RPC error response
     */
    createErrorResponse(error: unknown, requestId: RequestId | null, context?: ErrorContext): JSONRPCError;
    /**
     * Convert any error to a JSON-RPC error's error object
     */
    private toJSONRPCError;
    /**
     * Convert ProxyError to JSON-RPC error object
     */
    private proxyErrorToJSONRPC;
    /**
     * Convert standard Error to JSON-RPC error object
     */
    private standardErrorToJSONRPC;
    /**
     * Map ProxyErrorCode to JSON-RPC error code
     */
    private mapProxyErrorCode;
    /**
     * Infer error code from error properties
     */
    private inferErrorCode;
    /**
     * Log error with appropriate level and context
     */
    private logError;
    /**
     * Determine appropriate log level for error
     */
    private getErrorLogLevel;
    /**
     * Format error for structured logging
     */
    private formatErrorForLogging;
    /**
     * Sanitize error context to remove sensitive information
     */
    private sanitizeContext;
    /**
     * Determine if an error is retryable
     */
    isRetryableError(error: unknown): boolean;
    /**
     * Track failure for circuit breaker pattern
     */
    private trackFailure;
    /**
     * Check if circuit breaker is open
     */
    isCircuitBreakerOpen(operation: string): boolean;
    /**
     * Get circuit breaker key for an error
     */
    private getCircuitBreakerKey;
    /**
     * Clean up old failure tracking entries
     */
    private cleanupFailureTracking;
    /**
     * Calculate retry delay with exponential backoff
     */
    calculateRetryDelay(attemptNumber: number): number;
    /**
     * Check if retry attempt is within limits
     */
    canRetry(attemptNumber: number): boolean;
}
/**
 * Helper function to create a JSON-RPC error object
 */
export declare function createJSONRPCError(code: number, message: string, data?: unknown): JSONRPCError;
/**
 * Helper function to format error for display
 */
export declare function formatError(error: unknown): string;
/**
 * Type guard to check if value is a JSON-RPC error
 */
export declare function isJSONRPCError(value: unknown): value is JSONRPCError;
/**
 * Type guard to check if error is a ProxyError
 */
export declare function isProxyError(error: unknown): error is ProxyError;
/**
 * Sanitize error message for external communication
 */
export declare function sanitizeError(error: unknown): {
    message: string;
    code?: string;
};
export declare const errorHandler: ProxyErrorHandler;
//# sourceMappingURL=errors.d.ts.map