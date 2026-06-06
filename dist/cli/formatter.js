/**
 * Output formatting utilities for CLI mode
 *
 * Provides consistent JSON formatting and error handling for CLI output
 */
import { logger } from '../mcp-logger.js';
export class OutputFormatter {
    /**
     * Format successful result
     */
    static success(data, metadata) {
        const result = {
            success: true,
            data,
            metadata: metadata || undefined
        };
        return JSON.stringify(result, null, 2);
    }
    /**
     * Format error result
     */
    static error(error, metadata) {
        let errorInfo;
        if (error instanceof Error) {
            errorInfo = {
                code: error.name || 'ERROR',
                message: error.message,
                details: error.stack
            };
        }
        else {
            errorInfo = {
                code: 'UNKNOWN_ERROR',
                message: String(error),
                details: error
            };
        }
        const result = {
            success: false,
            error: errorInfo,
            metadata: metadata || undefined
        };
        return JSON.stringify(result, null, 2);
    }
    /**
     * Format raw output (for compatibility mode)
     */
    static raw(data) {
        return JSON.stringify(data, null, 2);
    }
    /**
     * Output to stdout
     */
    static output(data) {
        process.stdout.write(data);
        process.stdout.write('\n');
    }
    /**
     * Output error to stderr and set exit code
     */
    static outputError(error, exitCode = 1) {
        const formatted = OutputFormatter.error(error);
        process.stderr.write(formatted);
        process.stderr.write('\n');
        process.exit(exitCode);
    }
    /**
     * Create metadata for a command
     */
    static createMetadata(command, startTime) {
        const metadata = {
            command,
            timestamp: new Date().toISOString()
        };
        if (startTime) {
            metadata.duration = Date.now() - startTime;
        }
        return metadata;
    }
    /**
     * Execute operation with timing and error handling
     */
    static async executeWithTiming(command, operation, rawOutput = false) {
        const startTime = Date.now();
        try {
            const result = await operation();
            const metadata = OutputFormatter.createMetadata(command, startTime);
            if (rawOutput) {
                OutputFormatter.output(OutputFormatter.raw(result));
            }
            else {
                OutputFormatter.output(OutputFormatter.success(result, metadata));
            }
            process.exit(0);
        }
        catch (error) {
            logger.error(`Command failed: ${command}`, { error });
            // const metadata = OutputFormatter.createMetadata(command, startTime);
            OutputFormatter.outputError(error, 1);
        }
    }
}
//# sourceMappingURL=formatter.js.map