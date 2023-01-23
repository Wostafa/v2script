/** Virtual DNS server */
export class FakeDnsObject {
    /** FakeDNS allocates IP address space. Addresses assigned by FakeDNS will match this CIDR expression */
    ipPool: string;

    /**
     * The number of "IP-domain name mapping" remembered by FakeDNS.
     *
     * When the number of domain names exceeds this value, old domain names will be eliminated according to [LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)) rules
     */
    poolSize: number;

    /**
     * FakeDnsObject
     * @param ipPool FakeDNS assigns IP address space
     * @param poolSize The number of "IP-domain name mapping" remembered by FakeDNS
     */
    constructor(ipPool: string, poolSize: number) {
        this.ipPool = ipPool;
        this.poolSize = poolSize;
    }
}
