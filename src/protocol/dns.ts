/**
* Transport layer protocol for DNS traffic
*/
const enum DNS_NETWORK {
    tcp = "tcp",
    udp = "udp"
}

/**
* DNS is an outbound protocol primarily used to intercept and forward DNS queries
*
* This outbound protocol can only receive DNS traffic (including queries based on UDP and TCP protocols), other types of traffic will cause errors
*
* When processing DNS queries, this outbound protocol forwards IP queries (i.e. A and AAAA) to the built-in DNS server,
* Other types of query traffic will be forwarded to their original destination address
*/
class DnsOutboundObject {
    /** Modify the transport layer protocol of DNS traffic, the optional values ​​are `tcp` and `udp`. When not specified, keep the transmission mode of the source unchanged*/
    network: DNS_NETWORK;

    /** Modify DNS server address. When not specified, keep the address specified in the source unchanged */
    address: string;

    /** Modify the DNS server port. When not specified, keep the port specified in the source unchanged */
    port: number;

    /**
     * DnsOutboundObject
     * @param network Modify the transport layer protocol of DNS traffic
     * @param address Modify DNS server address
     * @param port Modify the DNS server port
     */
    constructor(network: DNS_NETWORK, address: string, port: number) {
        this.network = network;
        this.address = address;
        this.port = port;
    }
}

export { DNS_NETWORK, DnsOutboundObject };
