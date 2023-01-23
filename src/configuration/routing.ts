/**
* V2Ray has a built-in routing module, which can send inbound data through different outbound connections according to needs, so as to achieve the purpose of on-demand proxy
*
* The common use of this function is to divert domestic and foreign traffic,
* V2Ray can judge the traffic of different countries or regions through the internal mechanism, and then send them to different outbound proxies
*/
class RoutingObject {
    /**
     * Domain name resolution strategy
     * * AsIs: Only use the domain name for routing, the default value;
     * * IPIfNonMatch: When the domain name does not match any domain-based rules, resolve the domain name to IP (A record or AAAA record) for IP-based rule matching;
     * When a domain name has multiple IP addresses, it will try to match all IP addresses until one of them matches an IP rule;
     * The resolved IP only works in routing, and the original domain name is still used in the forwarded data packets.
     * * IPOnDemand: When any IP-based rule is encountered during matching, immediately resolve the domain name to IP for matching.
     */
    domainStrategy: DOMAIN_STRATEGY = DOMAIN_STRATEGY.AsIs;

    /**
     * Select the domain name matching algorithm to use.
     * * linear: use linear matching algorithm, the default value;
     * * mph: use the minimal perfect hash algorithm (v4.36.1+)
     */
    domainMatcher: DOMAIN_MATCHER = DOMAIN_MATCHER.linear;

    /**
     * corresponds to an array, each item in the array is a rule
     *
     * For each connection, routing will judge according to these rules in turn. When a rule takes effect,
     * Forward this connection to its designated outboundTag (or balancerTag, V2Ray 4.4+)
     *
     * When no rule is matched, traffic is forwarded to the first outbound by default
     */
    rules: RuleObject[] = [];

    /**
     * An array, each item in the array is the configuration of a load balancer
     *
     * When a rule points to a load balancer, V2Ray will select an outbound through this load balancer, and then it will forward the traffic
     */
    balancers: BalancerObject[] = [];

    /**
     * RoutingObject
     * @param domainStrategy domain name resolution strategy
     */
    constructor(domainStrategy: DOMAIN_STRATEGY) {
        this.domainStrategy = domainStrategy;
    }
}

/**
* Domain name resolution strategy
* * AsIs: Only use the domain name for routing, the default value;
* * IPIfNonMatch: When the domain name does not match any domain-based rules, resolve the domain name to IP (A record or AAAA record) for IP-based rule matching;
* When a domain name has multiple IP addresses, it will try to match all IP addresses until one of them matches an IP rule;
* The resolved IP only works in routing, and the original domain name is still used in the forwarded data packets.
* * IPOnDemand: When any IP-based rule is encountered during matching, immediately resolve the domain name to IP for matching.
*/
const enum DOMAIN_STRATEGY {
    AsIs = "AsIs",
    IPIfNonMatch = "IPIfNonMatch",
    IPOnDemand = "IPOnDemand"
}

/**
* Select the domain name matching algorithm to use.
* * linear: use linear matching algorithm, the default value;
* * mph: use the minimal perfect hash algorithm (v4.36.1+)
*/
const enum DOMAIN_MATCHER {
    linear = "linear",
    mph = "mph"
}

/** Connection method */
const enum RULE_NETWORK {
    tcp = "tcp",
    udp = "udp",
    tcp_udp = "tcp,udp"
}

/** protocol */
const enum RULE_PROTOCOL {
    http = "http",
    tls = "tls",
    bittorrent = "bittorrent"
}

/** Routing rules */
class RuleObject {
    /**
     * Select the domain name matching algorithm to use. Here the priority of domainMatcher is higher than the domainMatcher configured by RoutingObject
     * * linear: use linear matching algorithm, the default value;
     * * mph: use the minimal perfect hash algorithm (v4.36.1+)
     */
    domainMathcer: DOMAIN_MATCHER = DOMAIN_MATCHER.linear;

    /** Currently only supports the field option, so it is set as a private attribute and does not support modification*/
    private type: string = "field";

    /**
     * An array, each item of the array is a match of a domain name
     *
     * There are several forms:
     * * Plain string: When this string matches any part of the target domain name, the rule takes effect.
     * For example `sina.com` can match `sina.com`, `sina.com.cn`, `sina.company` and `www.sina.com`, but not `sina.cn`
     * * Regular expression: starts with `regexp:`, the rest is a regular expression.
     * When this regular expression matches the target domain name, the rule takes effect.
     * For example `regexp:\.goo.*\.com$` matches `www.google.com`, `fonts.googleapis.com`, but not `google.com`
     * * Subdomain name (recommended): start with `domain:`, the rest is a domain name.
     * This rule takes effect when the domain name is the target domain name or its subdomain name.
     * For example `domain:v2ray.com` matches `www.v2ray.com`, `v2ray.com`, but not `xv2ray.com`
     * * Full match: start with `full:`, the rest is a domain name.
     * This rule takes effect when the domain name fully matches the target domain name.
     * For example `full:v2ray.com` matches `v2ray.com` but not `www.v2ray.com`
     * * Predefined domain name list: starts with `geosite:`, and the rest is a category name (domain name list).
     * Such as `geosite:google` or `geosite:cn`. Name and domain name list reference [predefined domain name list] (https://www.v2fly.org/config/routing.html#predefined domain name list)
     * * Load a domain name from a file: in the form of `ext:file:tag`, it must start with `ext:`, followed by the file name and tag, and the file is stored in the resource directory.
     * The file format is the same as `geosite.dat`, the label must exist in the file
     */
    domains: string[] = [];

    /**
     * An array, each item in the array represents an IP range. This rule takes effect when an item matches the target IP. There are several forms:
     * * IP: like 127.0.0.1
     * * [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing):release 10.0.0.0/8
     * * GeoIP:
     * * The form of `geoip:cn` is a forward match, that is, it matches "IP address in mainland China". Followed by two characters [country or region code](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing), supports all countries and regions that can access the Internet
     * * The form of `geoip:!cn` is a reverse match, that is, it matches a "non-mainland China IP address". Followed by two characters [country or region code](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing), supports all countries and regions that can access the Internet
     * * Special value: `geoip:private` (V2Ray 3.5+), contains all private addresses, such as 127.0.0.1
     * * Load IP from file:
     * * Forms such as `ext:file:tag` and `ext-ip:file:tag` are forward matching, that is, matching "IP address in tag"
     * * Forms such as `ext:file:!tag` and `ext-ip:file:!tag` are reverse matching, that is, matching "IP address not in the tag"
     * * Must start with `ext:` or `ext-ip:`, followed by file name, label or ! label, the file is stored in the resource directory, the file format is the same as geoip.dat, and the label must exist in the file.    
     */
    ip: string[] = [];

    /**
     * Destination port range, there are three forms:
     * * ab: a and b are both positive integers and less than 65536. This range is a closed interval before and after. When the port falls within this range, this rule takes effect
     * * a: a is a positive integer and less than 65536. This rule takes effect when the destination port is a
     * * (V2Ray 4.18+) A mixture of the above two forms, separated by a comma ",". Such as: 53,443,1000-2000.
     */
    port: number | string;

    /** Source port range, same format as `port` */
    sourcePort: number | string;

    /** When the connection mode is specified, this rule takes effect*/
    network: RULE_NETWORK;

    /**
     * An array, each item in the array represents an IP range, in the form of IP, CIDR, GeoIP and load IP from file
     *
     * When an item matches the source IP, this rule takes effect
     */
    source: string[] = [];

    /**
     * An array, each item in the array is an email address
     *
     * When an item matches the source user, this rule takes effect
     *
     * Currently Shadowsocks and VMess support this rule.
     */
    user: string[] = [];

    /**
     * An array, each item in the array is an identifier
     *
     * This rule takes effect when an item matches the identifier of the inbound protocol
     */
    inboundTag: string[];

    /**
     * An array, each item in the array represents a protocol
     *
     * This rule takes effect when a certain protocol matches the traffic of the current connection
     *
     * The sniffing option in the inbound proxy must be turned on
     */
    protocol: RULE_PROTOCOL[];

    /**
     * (V2Ray 4.18+) A script used to detect the attribute value of traffic. This rule takes effect when this script returns true
     *
     * The scripting language is [Starlark](https://github.com/bazelbuild/starlark), and its syntax is a subset of Python. The script accepts a global variable attrs, which contains traffic-related attributes
     *
     * Currently only HTTP inbound proxies will set this property
     *
     * Example:
     * * Detect HTTP GET: attrs[':method'] == 'GET'
     * * detect HTTP Path：attrs[':path'].startswith('/test')
     * * detect Content Type：attrs['accept'].index('text/html') >= 0
     */
    attrs: string = "";

    /** Corresponds to the flag of an additional outbound connection configuration */
    outboundTag: string;

    /**
     * Corresponds to the identifier of a load balancer
     *
     * balancerTag and outboundTag must be selected
     *
     * When specified at the same time, outboundTag takes effect
     */
    balancerTag: string;

    /**
     * RuleObject
     * @param network connection method, its value is RULE_NETWORK enumeration value
     * @param protocol An array, each item in the array represents a protocol
     * @param port target port range
     * @param sourcePort source port range
     * @param inboundTag An array, each item in the array is a tag
     * @param outboundTag corresponds to an additional outbound connection configuration identifier
     * @param balancerTag corresponds to the identifier of a load balancer
     */
    constructor(network: RULE_NETWORK, protocol: RULE_PROTOCOL[], port: number | string, sourcePort: number | string, inboundTag: string[], outboundTag: string, balancerTag: string) {
        this.network = network;
        this.protocol = protocol;
        this.inboundTag = inboundTag;
        this.outboundTag = outboundTag;
        this.balancerTag = balancerTag;
        this.port = port;
        this.sourcePort = sourcePort;
    }
}

/** Policy object for load balancing */
const enum BALANCER_STRATEGY {
    random = "random",
    leastPing = "leastPing"
}

/** load balancer */
class BalancerObject {
    /**
     * The identity of this load balancer
     *
     * Used to match the balancerTag in RuleObject
     */
    tag: string;

    /**
     * An array of strings, each of which will be used to match the prefix identified by the outbound protocol
     *
     * In the following outbound protocol identifiers: `[ "a", "ab", "c", "ba" ]`, `"selector": ["a"]` will match `[ "a" , "ab" ]`
     */
    selector: string[];

    /** Policy object for load balancing */
    strategy: { type: BALANCER_STRATEGY };

    /**
     * BalancerObject
     * @param tag The identifier of this load balancer
     * @param selector An array of strings, each of which will be used to match the prefix identified by the outbound protocol
     * @param strategy_type the strategy object for load balancing
     */
    constructor(tag: string, selector: string[], strategy_type: BALANCER_STRATEGY) {
        this.tag = tag;
        this.selector = selector;
        this.strategy = {
            type: strategy_type
        };
    }
}

export { RoutingObject, DOMAIN_MATCHER, DOMAIN_STRATEGY, RULE_NETWORK, RULE_PROTOCOL, RuleObject, BALANCER_STRATEGY, BalancerObject };
