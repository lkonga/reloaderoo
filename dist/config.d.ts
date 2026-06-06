/**
 * Comprehensive configuration system for mcpdev-proxy
 *
 * Provides robust configuration loading, validation, and management with support for:
 * - Environment variable mapping and type conversion
 * - Multi-source configuration merging with proper precedence
 * - Comprehensive validation with helpful error messages
 * - Runtime configuration updates with change tracking
 * - Type-safe configuration access and modification
 */
import { EventEmitter } from 'events';
import type { ProxyConfig, ProxyConfigUpdate, ConfigValidationResult } from './types.js';
/**
 * Configuration sources in priority order (highest to lowest)
 */
export declare enum ConfigSource {
    RUNTIME = "runtime",
    ENVIRONMENT = "environment",
    DEFAULT = "default"
}
/**
 * Configuration change event data
 */
export interface ConfigChangeEvent {
    source: ConfigSource;
    changes: Partial<ProxyConfig>;
    previousConfig: ProxyConfig;
    newConfig: ProxyConfig;
}
/**
 * Main configuration management class
 *
 * Provides comprehensive configuration loading, validation, merging, and runtime updates
 * with proper event emission and error handling.
 */
export declare class Config extends EventEmitter {
    private state;
    constructor();
    /**
     * Load configuration from all sources with proper precedence
     * Priority: Runtime > Environment > Default
     */
    loadConfig(): ConfigValidationResult;
    /**
     * Validate configuration with comprehensive checks
     */
    validateConfig(config: Partial<ProxyConfig>): ConfigValidationResult;
    /**
     * Merge configurations from all sources with proper precedence
     */
    mergeConfigs(): Partial<ProxyConfig>;
    /**
     * Generate configuration summary for diagnostics
     */
    getConfigSummary(): {
        sources: Record<ConfigSource, Partial<ProxyConfig>>;
        merged: ProxyConfig | null;
        validation: ConfigValidationResult | null;
        changeCount: number;
    };
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: ProxyConfigUpdate, source?: ConfigSource): ConfigValidationResult;
    /**
     * Get current merged configuration
     */
    getCurrentConfig(): ProxyConfig | null;
    /**
     * Get configuration from specific source
     */
    getSourceConfig(source: ConfigSource): Partial<ProxyConfig> | undefined;
    /**
     * Check if configuration has been loaded and is valid
     */
    isValid(): boolean;
    /**
     * Get last validation result
     */
    getLastValidation(): ConfigValidationResult | null;
    /**
     * Reset configuration to defaults
     */
    reset(): void;
    /**
     * Serialize configuration for debugging/logging
     */
    toJSON(): object;
}
/**
 * Create and load a new configuration instance
 */
export declare function createConfig(): {
    config: Config;
    result: ConfigValidationResult;
};
/**
 * Validate a configuration object without creating a Config instance
 */
export declare function validateConfigObject(config: Partial<ProxyConfig>): ConfigValidationResult;
/**
 * Load environment configuration without creating a Config instance
 */
export declare function getEnvironmentConfig(): Partial<ProxyConfig>;
/**
 * Check if a command exists and is executable
 */
export declare function validateCommand(command: string): {
    valid: boolean;
    path?: string;
    error?: string;
};
export default Config;
//# sourceMappingURL=config.d.ts.map