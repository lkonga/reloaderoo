/**
 * ProcessManager - Manages child MCP server lifecycle with crash detection, auto-restart, and health monitoring
 */
import { EventEmitter } from 'events';
import { ChildProcess } from 'child_process';
import { ProxyConfig, ProxyConfigUpdate, ProcessState, ProxyError } from './types.js';
/** Events emitted by ProcessManager for state changes and lifecycle events */
export interface ProcessManagerEvents {
    'started': [pid: number];
    'stopped': [exitCode: number | null, signal: string | null];
    'crashed': [exitCode: number | null, signal: string | null, restartCount: number];
    'restarting': [reason: string];
    'restarted': [pid: number, restartTime: number];
    'restart-failed': [error: Error, restartCount: number];
    'error': [error: ProxyError];
}
/**
 * ProcessManager handles complete lifecycle of child MCP server processes with crash detection,
 * auto-restart with exponential backoff, health monitoring, and graceful shutdown capabilities.
 */
export declare class ProcessManager extends EventEmitter {
    private config;
    private state;
    constructor(config: ProxyConfig);
    /** Start the child MCP server process */
    spawn(): Promise<void>;
    /** Restart the child process with optional configuration updates */
    restart(configUpdate?: ProxyConfigUpdate): Promise<void>;
    /** Gracefully terminate the child process */
    terminate(): Promise<void>;
    /** Get current process state */
    getState(): ProcessState;
    /** Check if the child process is healthy and responsive */
    isHealthy(): Promise<boolean>;
    /** Get current restart count */
    getRestartCount(): number;
    /** Get the current child process instance (if any) */
    getChildProcess(): ChildProcess | null;
    private spawnChildProcess;
    private handleChildExit;
    private scheduleAutoRestart;
    private calculateRestartDelay;
    private terminateChild;
    private performHealthCheck;
    private applyConfigUpdate;
    private resetRestartCount;
    private setState;
    private clearTimeouts;
    private validateConfig;
    private createError;
    private sleep;
    /** Check if child process is currently running */
    isChildRunning(): boolean;
}
//# sourceMappingURL=process-manager.d.ts.map