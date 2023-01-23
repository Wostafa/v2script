/** Reverse proxy is an additional function of V2Ray, which can forward the server-side traffic to the client, that is, reverse traffic forwarding*/
class ReverseObject {
    /** An array, each item represents a bridge */
    bridges: BridgeObject[] = [];

    /** An array, each item represents a portal */
    portals: PortalObject[] = [];
}

/** bridge */
class BridgeObject {
    /** An identifier, all connections sent by the bridge will carry this identifier. You can use inboundTag in routing for identification */
    tag: string;

    /** A domain name. The connection established by the bridge to the portal will be sent using this domain name. This domain name is only used for communication between bridge and portal, and does not have to exist */
    domain: string;
    
    /**
     * BridgeObject
     * @param tag identification
     * @param domain domain name
     */
    constructor(tag: string, domain: string) {
        this.tag = tag;
        this.domain = domain;
    }
}

/** portal */
class PortalObject {
    /** The identity of the portal. Use outboundTag in routing to forward traffic to this portal */
    tag: string;

    /** A domain name. When the portal receives traffic, if the target domain name of the traffic is this domain name, the portal considers the communication connection sent by the bridge on the current connection. Other traffic will be treated as traffic that needs to be forwarded. What the portal does is to identify and splice these two types of connections*/
    domain: string;

    /**
     * BridgeObject
     * @param tag identification
     * @param domain domain name
     */
    constructor(tag: string, domain: string) {
        this.tag = tag;
        this.domain = domain;
    }
}

export { ReverseObject, BridgeObject, PortalObject };
