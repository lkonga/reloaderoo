/**
 * MCP-Compliant Logger
 *
 * Follows MCP specification for server-side logging:
 * - NEVER logs to stdout (interferes with protocol)
 * - Uses stderr for local development messages
 * - Sends proper log notifications to MCP client
 * - File-based logging for persistent storage
 *
 * Reference: https://modelcontextprotocol.io/docs/tools/debugging#server-side-logging
 */
type LogLevel = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical';
interface LogMessage {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
    source?: string;
}
declare class MCPLogger {
    private logFile;
    private currentLevel;
    private mcpServer;
    private isServerMode;
    private clientInfo;
    constructor(logFile?: string);
    /**
     * Set the MCP server instance for sending log notifications
     */
    setMCPServer(server: any): void;
    /**
     * Set log level
     */
    setLevel(level: LogLevel): void;
    /**
     * Set custom log file path
     */
    setLogFile(logFile: string): void;
    /**
     * Log debug message
     */
    debug(message: string, data?: any, source?: string): void;
    /**
     * Log info message
     */
    info(message: string, data?: any, source?: string): void;
    /**
     * Log notice message
     */
    notice(message: string, data?: any, source?: string): void;
    /**
     * Log warning message
     */
    warn(message: string, data?: any, source?: string): void;
    /**
     * Log error message
     */
    error(message: string, data?: any, source?: string): void;
    /**
     * Log critical message
     */
    critical(message: string, data?: any, source?: string): void;
    /**
     * Main logging method
     */
    private log;
    /**
     * Check if message should be logged based on current level
     */
    private shouldLog;
    /**
     * Write to stderr (MCP compliant for local logging)
     */
    private writeToStderr;
    /**
     * Write to log file
     */
    private writeToFile;
    /**
     * Get client info (parent process and MCP client)
     */
    private getClientInfo;
    /**
     * Format log message for output
     */
    private formatMessage;
    /**
     * Get default log file path
     */
    private getDefaultLogPath;
    /**
     * Ensure log directory exists
     */
    private ensureLogDirectory;
    /**
     * Get current log file path
     */
    getLogFile(): string;
}
export declare const logger: MCPLogger;
export { MCPLogger };
export type { LogLevel, LogMessage };
//# sourceMappingURL=mcp-logger.d.ts.map