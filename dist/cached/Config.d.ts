import { ConfigInterface } from "./ConfigInterface";
/**
 * A class to manage the configuration settings of the application.
 */
export declare class Config {
    /**
     * The static data property to hold the configuration data.
     */
    static data: ConfigInterface;
    /**
     * Reads the configuration from a file and returns it.
     * If the configuration file does not exist, it creates a default configuration.
     *
     * @returns {ConfigInterface} The configuration data.
     */
    static read(): ConfigInterface;
}
