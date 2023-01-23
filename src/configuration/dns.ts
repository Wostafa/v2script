/**
* V2Ray has a built-in DNS component
*
* Its main purpose is to perform DNS resolution on the target address (domain name), and provide judgment basis for IP routing rule matching
*/
class DnsObject {
    /**
     * Mapping of domain names and addresses,
     * Its value can be the mapping of "domain name and single address", "mapping of domain name and multiple addresses (address array)" (v4.37.3+), where the address can be IP or domain name
     *
     * When resolving the domain name, if the domain name matches an item in this list, when the address of the item is IP, the resolution result is the IP of the item, and no subsequent DNS resolution will be performed
     *
     * When the address of this item is a domain name, this domain name will be used for subsequent DNS resolution instead of the original domain name
     */
    hosts: Object;

    /** DNS server list, there are two valid writing methods: DNS address (string format) and DnsServerObject */
    servers: (string | DnsServerObject)[];

    /** The IP address of the current network. When used for DNS query, notify the DNS server of the geographic location of the client (not a private IP address) */
    clientIp: string;

    /**
     * The type of network to use for DNS queries. The default value is UseIP, that is, DNS queries the A and AAAA records of the domain name at the same time
     *
     * UseIPv4 and UseIPv6 are for querying only A records and only querying AAAA records respectively
     */
    queryStrategy: QUERY_STRATEGY = QUERY_STRATEGY.UseIP;

    /**
     * Disable DNS caching. The default is `false`, that is, not disabled
     *
     * This attribute is a private attribute and cannot be called directly. If you need to modify the attribute value, please use the `cache()` method to modify it
     */
    private disableCache: boolean = false;

    /**
     * Disable DNS fallback (fallback) queries. The default is `false`, that is, not disabled
     *
     * This attribute is a private attribute and cannot be called directly. If you need to modify the attribute value, please use the `fallback()` method to modify it
     */
    private disableFallback: boolean = false;

    /**
     * Disable performing a DNS fallback query when the DNS server's priority matching domain name list hits
     *
     * This attribute is a private attribute and cannot be called directly. If you need to modify the attribute value, please use the `fallbackIfMatch()` method to modify it
     */
    private disableFallbackIfMatch: boolean = false;

    /**
     * The query traffic sent by this DNS, except localhost and DOHL_ mode, will have this identifier, which can be matched by using inboundTag in routing
     *
     * Its default value is `"dns"`
     */
    tag: string = "dns";

    /**
     * DnsObject
     * @param host domain name and address mapping
     * @param servers DNS server list
     * @param clientIp IP address of the current network
     */
    constructor(host: Map<string, string | string[]>, servers: (string | DnsServerObject)[], clientIp: string) {
        this.hosts = Object.fromEntries(host.entries());
        this.servers = servers;
        this.clientIp = clientIp;
    }

    /**
     * Set whether the DNS cache is enabled
     * @param status DNS cache status, its value is `disable` | `enable`
     * @returns current object
     */
    cache(status: "disable" | "enable"): DnsObject {
        if (status === "disable") this.disableCache = true;
        else if (status === "enable") this.disableCache = false;
        return this;
    }

    /**
     * Set whether DNS fallback query is enabled
     * @param status DNS fallback query status, its value is `disable` | `enable`
     * @returns current object
     */
    fallback(status: "disable" | "enable"): DnsObject {
        if (status === "disable") this.disableFallback = true;
        else if (status === "enable") this.disableFallback = false;
        return this;
    }

    /**
     * Set to perform DNS fallback query when the priority matching domain name list of the DNS server is hit
     * @param status Rollback query status, its value is `disable` | `enable`
     * @returns current object
     */
    fallbackIfMatch(status: "disable" | "enable"): DnsObject {
        if (status === "disable") this.disableFallbackIfMatch = true;
        else if (status === "enable") this.disableFallbackIfMatch = false;
        return this;
    }
}

/**
* DNS server object
*/
class DnsServerObject {
    /** DNS server address, such as `8.8.8.8`, `tcp+local://8.8.8.8:53` and `https://dns.google/dns-query`, etc. */
    address: string;

    /**
     * DNS server port, such as `53`
     *
     * This item defaults to `53` by default
     *
     * This item is invalid when using DOH, DOHL, DOQL mode
     *
     * Non-standard ports should be specified in the URL
     */
    port: number;

    /**
     * The IP address of the current network
     *
     * When used for DNS query, notify the DNS server of the geographic location of the client (not a private IP address)
     *
     * The priority of `clientIp` here is higher than `clientIp` configured in the outer layer, so that "use different clientIp to obtain the resolution results of the same domain name in different regions from the same DNS server"
     */
    clientIp: string;

    /**
     * In the process of DNS fallback (fallback) query, whether to skip this DNS
     *
     * The default is false, that is, do not skip
     */
    skipFallback: boolean = false;

    /**
     * A list of domain names, the domain names contained in this list will use this server first for query
     *
     * The domain name format is the same as in the routing configuration
     */
    domains: string[] = [];

    /**
     * A list of IP ranges in the same format as in routing configuration
     *
     * When this option is configured, V2Ray DNS will verify the returned IP, and only return the address that satisfies the list of expectIPs. If this is not configured, the IP address will be returned unchanged
     */
    expectIPs: string[] = [];

    /**
     * DnsServerObject
     * @param address DNS server address
     * @param port DNS server port
     * @param clientIp IP address of the current network
     */
    constructor(address: string, port: number, clientIp: string) {
        this.address = address;
        this.port = port;
        this.clientIp = clientIp;
    }
}

/**
* The type of network to use for DNS queries. The default value is UseIP, that is, DNS queries the A and AAAA records of the domain name at the same time
*
* UseIPv4 and UseIPv6 are for querying only A records and only querying AAAA records respectively
*/
const enum QUERY_STRATEGY {
    UseIP = "UseIP",
    UseIPv4 = "UseIPv4",
    UseIPv6 = "UseIPv6"
}

export { DnsServerObject, QUERY_STRATEGY, DnsObject };
