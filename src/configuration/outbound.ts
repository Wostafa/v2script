import { PROTOCOL, StreamSettingsObject } from "../../lib";
import { BlackholeOutboundObject, DnsOutboundObject, FreedomOutboundObject, HTTPOutboundObject, LoopbackOutboundObject, ShadowsocksOutboundObject, SocksOutboundObject, TrojanOutboundObject, VlessOutboundObject, VmessOutboundObject } from "../protocol";

/**
* Outbound connections are used to send data to remote websites or next-level proxy servers. For available protocols, please refer to the protocol list
*/
class  OutboundObject  {
    /** The IP address used to send data, it is valid when the host has multiple IP addresses, the default value is `"0.0.0.0"`*/
    sendThrough: string = "0.0.0.0";

    /** Connection protocol name, see protocol list for optional values*/
    protocol: PROTOCOL;

    /** The specific configuration content varies depending on the protocol. See OutboundObject in each protocol for details */
    settings: BlackholeOutboundObject | DnsOutboundObject | FreedomOutboundObject | HTTPOutboundObject | LoopbackOutboundObject | ShadowsocksOutboundObject | SocksOutboundObject | TrojanOutboundObject | VlessOutboundObject | VmessOutboundObject;

    /**
     * The identifier of this outbound connection, used to locate this connection in other configurations
     *
     * When its value is not empty, it must be unique among all tags
     */
    tag: string;

    /** [Underlying transport configuration](https://www.v2fly.org/config/transport.html#streamsettingsobject) */
    streamSettings: StreamSettingsObject = null;

    /** Outbound proxy configuration. When the outbound proxy is in effect, the streamSettings for this outbound protocol will have no effect */
    proxySettings: ProxySettingsObject = null;

    /** Multiplexing (Mux) configuration */
    mux: MuxObject = null;

    /**
     * OutboundObject
     * @param tag The identifier for this outbound connection
     * @param protocol connection protocol name
     * @param settings specific configuration content
     * @param mux whether to enable multiplexing
     */
    constructor(
        tag: string,
        protocol: PROTOCOL, 
        settings: BlackholeOutboundObject | DnsOutboundObject | FreedomOutboundObject | HTTPOutboundObject | LoopbackOutboundObject | ShadowsocksOutboundObject | SocksOutboundObject | TrojanOutboundObject | VlessOutboundObject | VmessOutboundObject,
        mux: boolean
    ) {
        this.tag = tag;
        this.protocol = protocol;
        this.settings = settings;

        if (mux) this.mux = new MuxObject();
    }
}

/**
* Outbound proxy configuration
*/
class ProxySettingsObject {
    /** When another outbound connection is specified, the data sent by this outbound connection will be forwarded to the specified outbound connection */
    tag: string;

    /**
     * Whether to enable transport layer forwarding support
     *
     * When enabled, the transport layer protocol for this outbound connection will remain in effect (if supported by the transport layer protocol)
     *
     * If this option is not enabled, the transport layer protocol will be invalid when forwarding, and only the default TCP transport protocol can be used
     */
    transportLayer: boolean;

    /**
     * ProxySettingsObject
     * @param tag the identifier of another outbound connection
     * @param transportLayer Whether to enable transport layer forwarding support
     */
    constructor(tag: string, transportLayer: boolean) {
        this.tag = tag;
        this.transportLayer = transportLayer;
    }
}

/**
* Multiplexing configuration
*/
class MuxObject {
    /** Whether to enable Mux forwarding request, the default value `false` */
    enable: boolean = false;

    /**
     * Maximum number of concurrent connections. Minimum value 1, maximum value 1024, default value 8
     *
     * Fill in negative numbers, such as -1, do not load the mux module (v4.22.0+)
     *
     * This value indicates the maximum number of Mux connections carried by a TCP connection.
     * When the client sends 8 TCP requests and concurrency=8, V2Ray will only send one actual TCP connection, and all 8 requests of the client will be transmitted by this TCP connection
     */
    concurrency: number = 8;
}

export { OutboundObject, ProxySettingsObject, MuxObject };
