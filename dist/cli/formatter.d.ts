/**
 * Output formatting utilities for CLI mode
 *
 * Provides consistent JSON formatting and error handling for CLI output
 */
export interface CLIResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    metadata?: {
        command: string;
        timestamp: string;
        duration?: number;
    } | undefined;
}
export declare class OutputFormatter {
    /**
     * Format successful result
     */
    static success<T>(data: T, metadata?: CLIResult['metadata']): string;
    /**
     * Format error result
     */
    static error(error: Error | unknown, metadata?: CLIResult['metadata']): string;
    /**
     * Format raw output (for compatibility mode)
     */
    static raw(data: unknown): string;
    /**
     * Output to stdout
     */
    static output(data: string): void;
    /**
     * Output error to stderr and set exit code
     */
    static outputError(error: Error | unknown, exitCode?: number): void;
    /**
     * Create metadata for a command
     */
    static createMetadata(command: string, startTime?: number): CLIResult['metadata'];
    /**
     * Execute operation with timing and error handling
     */
    static executeWithTiming<T>(command: string, operation: () => Promise<T>, rawOutput?: boolean): Promise<void>;
}
//# sourceMappingURL=formatter.d.ts.map