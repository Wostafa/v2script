/**
* The connection observation component determines the state of the outbound agent by establishing a connection through the specified outbound connection at regular intervals
*
* (v4.38.0+) The observation results of the connection observation component can be used by other components, such as load balancer and API
*
* Default connection to api.v2fly.org for connection status detection
*
* Since the probe connection will be sent out periodically, this function may allow attackers on a privileged network path to obtain more information, please use it as appropriate
*/
export class ObservatoryObject {
    /**
     * An array of strings, each of which will be used to match the prefix identified by the outbound protocol
     *
     * In the following outbound protocol identifiers: `[ "a", "ab", "c", "ba" ]`, `"selector": ["a"]` will match `[ "a" , "ab" ]`.
     * The matched outbound connection will be connected periodically to determine whether it is available
     */
    subjectSelector: string[] = [];

    /** URL to check connection status. By default, the built-in connection state detection address will be used. (4.41.1+) */
    probeURL: string;

    /**
     * Interval between initiating probes
     *
     * Every time this time passes, a server status detection will be performed on a server
     *
     * The time format is number + unit, such as "10s", "2h45m", and the supported time units are ns, us, ms, s, m, h, corresponding to nanoseconds, microseconds, milliseconds, seconds, minutes, hours ( 4.41.1+)
     */
    probeInterval: string;

    /**
     * ObservatoryObject
     * @param probeURL URL used to detect connection status
     * @param probeInterval The interval for initiating a probe
     */
    constructor(probeURL: string, probeInterval: string) {
        this.probeInterval = probeInterval;
        this.probeURL = probeURL;
    }
}
