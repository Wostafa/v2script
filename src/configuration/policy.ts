/**
* Local policies can configure some user-related permissions, such as connection timeout settings
*
* Each connection processed by V2Ray corresponds to a user, and different policies are applied according to the user's level.
* Local policies can vary by level
*/
class PolicyObject {
    /**
     * A set of key-value pairs, each key is a number in the form of a string (required by JSON),
     * Such as "0", "1", etc., the double quotes cannot be omitted, this number corresponds to the user level
     *
     * Each value is a LevelPolicyObject
     *
     * This attribute is a private attribute and does not support direct calls. If you need to change it, please use the `setLevel()` or `removeLevel()` method
     */
    private levels: Map<string, LevelPolicyObject> = new Map([["0", new LevelPolicyObject()]]);
    system: SystemPolicyObject = new SystemPolicyObject();

    /**
     * Set local policy
     * @param level strategy level, its value is a string
     * @param policy policy content, its value is a LevelPolicyObject object
     * @returns current object
     */
    setLevel(level: string, policy: LevelPolicyObject): PolicyObject {
        this.levels.set(level, policy);
        return this;
    }

    /**
     * Delete local policy
     * @param level strategy level, its value is a string
     * @returns current object
     */
    removeLevel(level: string): PolicyObject {
        this.levels.delete(level);
        return this;
    }
}

/**
* Policy configuration
*/
class LevelPolicyObject {
    /**
     * Handshake time limit when connection is established
     *
     * The unit is in seconds. The default is 4
     *
     * When the inbound proxy handles a new connection, in the handshake phase (for example, VMess reads the header data to determine the target server address),
     * If the time used exceeds this time, the connection will be terminated
     */
    handshake: number = 4;

    /**
     * Time limit for connection idle
     *
     * The unit is in seconds. The default value is 300
     *
     * When the inbound and outbound proxy processes a connection, if no data is transmitted (including uplink and downlink data) within the connIdle time, the connection is terminated
     */
    connIdle: number = 300;

    /**
     * Time limit when connection downlink is closed
     *
     * The unit is in seconds. The default value is 2
     *
     * When the server (such as a remote website) closes the downlink connection, the outbound proxy will terminate the connection after waiting `uplinkOnly` time
     */
    uplinkOnly: number = 2;

    /**
     * time limit when connection uplink is closed
     *
     * The unit is in seconds. The default is 5
     *
     * When the client (such as a browser) closes the uplink connection, the inbound proxy will terminate the connection after waiting `downlinkOnly` time
     */
    downlinkOnly: number = 5;

    /**
     * When the value is `true`, enable the upstream traffic statistics of all users of the current level
     */
    statsUserUplink : boolean  =  false ;

    /**
     * When the value is `true`, enable the downstream traffic statistics of all users of the current level
     */
    statsUserDownlink : boolean  =  false ;

    /**
     * Internal cache size per connection. The unit is kB. When the value is 0, the internal cache is disabled
     *
     * Default value (V2Ray 4.4+):
     * * On ARM, MIPS, MIPSLE platforms, the default value is 0.
     * * On ARM64, MIPS64, MIPS64LE platforms, the default value is 4.
     * * On other platforms, the default is 512.
     *
     * Default (V2Ray 4.3-):
     * * On ARM, MIPS, MIPSLE, ARM64, MIPS64, MIPS64LE platforms, the default value is 16.
     * * On other platforms, the default is 2048.
     */
    bufferSize: number = 512;
}

/**
* The strategy of V2Ray system
*/
class SystemPolicyObject {
    /** When the value is true, enable the uplink traffic statistics of all inbound proxies*/
    statsInboundUplink: boolean = false;

    /** When the value is true, enable the downlink traffic statistics of all inbound proxies*/
    statsInboundDownlink: boolean = false;

    /** ( V2Ray 4.26.0+ ) When the value is true, enable the uplink traffic statistics of all outbound proxies*/
    statsOutboundUplink : boolean  =  false ;

    /** ( V2Ray 4.26.0+ ) When the value is true, enable the downlink traffic statistics of all outbound proxies*/
    statsOutboundDownlink : boolean  =  false ;
}

export { PolicyObject, LevelPolicyObject, SystemPolicyObject };
