import { PROTOCOL, StreamSettingsObject } from "../../lib";
import { DokodemodoorInboundObject, HTTPInboundObject, ShadowsocksInboundObject, SocksInboundObject, TrojanInboundObject, VlessInboundObject, VmessInboundObject } from "../protocol";

/**
* When the traffic is of the specified type, reset the destination of the current connection by the destination address included in it
*
* The fakedns+others option will give priority to FakeDNS virtual DNS server matching.
* If the IP address is within the IP address range of the virtual DNS server, but no corresponding domain name record is found, use the matching results of http and tls.
*
* This option is only valid when metadataOnly is false. (v4.38.0+)
*/
const enum DESTOVERRIDE {
    http = "http",
    tls = "tls",
    fakedns = "fakedns",
    fakedns_others = "fakedns+others"
}

/**
* try to detect the type of traffic
*/
class SniffingObject {
    /** Whether to enable traffic detection */
    enable: boolean;

    /**
     * When the traffic is of the specified type, reset the destination of the current connection by the destination address included in it
     *
     * The fakedns+others option will give priority to FakeDNS virtual DNS server matching.
     * If the IP address is within the IP address range of the virtual DNS server, but no corresponding domain name record is found, use the matching results of http and tls.
     *
     * This option is only valid when metadataOnly is false. (v4.38.0+)
     */
    destOverride : DESTOVERRIDE ;

    /**
     * Whether to use only metadata to infer destination addresses without intercepting traffic content. Only the metadata traffic object detection module will be activated.
     *
     * If only use metadata to infer destination address is turned off, the client must send data before the proxy server will actually establish a connection
     *
     * This behavior is incompatible with protocols such as SMTP that require the server to initiate the first message first.
     */
    metadataOnly: boolean;

    /**
     * SniffingObject
     * @param enable Whether to enable traffic detection
     * @param destOverride When the traffic is the specified type, reset the destination of the current connection according to the destination address included in it
     * @param metadataOnly Whether to use metadata only to infer destination address without intercepting traffic content
     */
    constructor(enable: boolean, destOverride: DESTOVERRIDE, metadataOnly: boolean) {
        this.enable = enable;
        this.destOverride = destOverride;
        this.metadataOnly = metadataOnly;
    }
}

/**
* Port allocation strategy.
*
* * "always" indicates that all specified ports are always assigned, and how many ports are specified in port, V2Ray will listen to these ports
* * "random" means randomly open ports, and randomly select concurrency ports in the port range every refresh minute to listen
*/
const enum INBOUND_STRATEGY {
    always = "always",
    random = "random"
}

/**
* Port assignment settings
*/
class AllocateObject {
    /**
     * Port allocation strategy.
     *
     * * "always" indicates that all specified ports are always assigned, and how many ports are specified in port, V2Ray will listen to these ports
     * * "random" means randomly open ports, and randomly select concurrency ports in the port range every refresh minute to listen
     */
    strategy: INBOUND_STRATEGY;

    /** Random port refresh interval, in minutes. The minimum value is 2, and the recommended value is 5. This property is only valid when strategy = random. */
    refresh: number;

    /** Random port number. The minimum value is 1, and the maximum value is one-third of the `port` range. The recommended value is 3. */
    concurrency: number;

    /**
     * AllocateObject
     * @param strategy port allocation strategy
     * @param refresh Random port refresh interval, in minutes
     * @param concurrency random port number
     */
    constructor(strategy: INBOUND_STRATEGY, refresh: number, concurrency: number) {
        this.strategy = strategy;
        this.refresh = refresh;
        this.concurrency = concurrency;
    }
}

/**
* The inbound connection is used to receive data sent from the client (browser or upper-level proxy server). Please refer to the protocol list for available protocols
*/
class InboundObject {
    /**
     * Listening address, only IP addresses are allowed, the default value is "0.0.0.0", which means receiving connections from all network cards.
     * In addition, the address of an existing network card must be specified
     *
     * v4.32.0+, support to fill in Unix domain socket, the format is an absolute path, like "/dev/shm/domain.socket",
     * You can add "@" at the beginning to represent [abstract](https://www.man7.org/linux/man-pages/man7/unix.7.html),
     * "@@" stands for abstract with padding
     *
     * When filling in the Unix domain socket, port and allocate will be ignored, and the protocol can temporarily choose VLESS, VMess, Trojan,
     * The transmission method can choose TCP, WebSocket, HTTP/2
     */
    listen: string = "0.0.0.0";

    /** port. Accepted formats are as follows:
     * * Integer value: the actual port number
     * * Environment variable: start with "env:", followed by the name of an environment variable, such as "env:PORT". V2Ray will parse this environment variable as a string
     * * String: It can be a string of numeric types, such as "1234"; or a range of values, such as "5-10" means port 5 to port 10, these 6 ports
     * * When there is only one port, V2Ray will listen for incoming connections on this port. When a port range is specified, depends on the allocate setting.
     */
    port: number | string;

    /** Connection protocol name, see [protocol list](https://www.v2fly.org/config/overview.html) for optional values ​​*/
    protocol: PROTOCOL;

    /** The specific configuration content varies depending on the protocol. See `InboundObject` in each protocol for details */
    settings: DokodemodoorInboundObject | HTTPInboundObject | ShadowsocksInboundObject | SocksInboundObject | TrojanInboundObject | VlessInboundObject | VmessInboundObject;

    /** [Underlying transport configuration](https://www.v2fly.org/config/transport.html#streamsettingsobject) */
    streamSettings: StreamSettingsObject = null;

    /** Try to detect the type of traffic */
    sniffing: SniffingObject = null;

    /** Port allocation settings */
    allocate: AllocateObject = null;

    /** The identifier of this inbound connection, used to locate this connection in other configurations. When it is not empty, its value must be unique among all tags */
    tag: string;

    /**
     * InboundObject
     * @param tag The identifier of this inbound connection, used to locate this connection in other configurations
     * @param listen listen address, only IP address is allowed
     * @param port port
     * @param protocol connection protocol name
     * @param settings configuration content
     * @param streamSettings underlying transmission configuration
     * @param sniffing the type of traffic to try to sniff
     * @param allocate port allocation settings
     */
    constructor(tag: string, listen: string, port: number | string, protocol: PROTOCOL, settings: DokodemodoorInboundObject | HTTPInboundObject | ShadowsocksInboundObject | SocksInboundObject | TrojanInboundObject | VlessInboundObject | VmessInboundObject) {
        this.listen = listen;
        this.port = port;
        this.protocol = protocol;
        this.settings = settings;
        this.tag = tag;
    }
}

export { DESTOVERRIDE, SniffingObject, INBOUND_STRATEGY, AllocateObject, InboundObject };
