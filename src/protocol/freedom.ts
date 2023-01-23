/**
* When the target address is a domain name, Freedom can directly send a connection to this domain name ("AsIs"), or establish a connection after resolving the domain name to IP ("UseIP", "UseIPv4" and "UseIPv6")
*
* The step of resolving IP will use V2Ray's built-in DNS
*/
const enum FREEDOM_STRATEGY {
    AsIs = "AsIs",
    UseIP = "UseIP",
    UseIPv4 = "UseIPv4",
    UseIPv6 = "UseIPv6"
}

/**
* Freedom is an outbound protocol that can be used to send (normal) TCP or UDP data to any network
*/
class FreedomOutboundObject {
    /**
     * When the target address is a domain name, Freedom can directly send a connection to this domain name ("AsIs"), or establish a connection after resolving the domain name to IP ("UseIP", "UseIPv4" and "UseIPv6")
     *
     * The step of resolving IP will use V2Ray's built-in DNS
     */
    domainStrategy: FREEDOM_STRATEGY = FREEDOM_STRATEGY.AsIs;

    /**
     * Freedom will force all data to be sent to the specified address (instead of the address specified by the inbound protocol)
     *
     * Its value is a string, example: `127.0.0.1:80`, `:1234`. When the address is not specified, such as `:443`, Freedom will not modify the original target address
     *
     * When the port is 0, such as `v2ray.com: 0`, Freedom will not modify the original port
     */
    redirect: string;

    /** User level, all connections use this level */
    userLevel: string;

    /**
     * FreedomOutboundObject
     * @param redirect Freedom will force all data to be sent to the specified address
     * @param userLevel user level
     */
    constructor(redirect: string, userLevel?:string) {
        this.redirect = redirect;
        this.userLevel = userLevel || this.userLevel;
    }
}

export { FREEDOM_STRATEGY, FreedomOutboundObject };
