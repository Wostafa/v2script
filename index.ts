import { 
    ApiObject, ApiService,
    BrowserForwarderObject, 
    DnsServerObject, QUERY_STRATEGY, DnsObject,
    FakeDnsObject, 
    DESTOVERRIDE, SniffingObject, INBOUND_STRATEGY, AllocateObject, InboundObject,
    LOGLEVEL, LogObject,
    ObservatoryObject, 
    OutboundObject, ProxySettingsObject, MuxObject,
    PolicyObject, LevelPolicyObject, SystemPolicyObject,
    ReverseObject, BridgeObject, PortalObject,
    RoutingObject, DOMAIN_MATCHER, DOMAIN_STRATEGY, RULE_NETWORK, RULE_PROTOCOL, RuleObject, BALANCER_STRATEGY, BalancerObject,
    StatsObject, 
    TransportObject,

    BLACKHOLE_RESPONSE, BlackholeOutboundObject,
    DNS_NETWORK, DnsOutboundObject,
    DOKODEMODOOR_NETWORK, DokodemodoorInboundObject,
    FREEDOM_STRATEGY, FreedomOutboundObject,
    HTTPInboundObject, HTTPOutboundObject, HTTPUserObject, HTTPServerObject,
    LoopbackOutboundObject,
    SHADOWSOCKS_METHOD, SHADOWSOCKS_NETWORK, ShadowsocksInboundObject, ShadowsocksOutboundObject, ShadowsocksServerObject,
    SocksOutboundObject, SocksInboundObject, SOCKS_AUTH, SocksServerObject, SocksUserObject,
    TrojanClientObject, TrojanServerObject, TrojanInboundObject, TrojanOutboundObject,
    VlessUserObject, VlessServerObject, VlessClientObject, VlessInboundObject, VlessOutboundObject,
    VmessUserObject, VMESS_SECURITY, VmessOutboundObject, VmessInboundObject, VmessClientObject, DetourObject, DefaultObject, VmessServerObject,

    NoneHeaderObject, HttpHeaderObject, TcpObject,
    KcpObject,
    WebSocketObject,
    HTTP_METHOD, HttpObject,
    QUIC_SECURITY, QUICObject,
    DomainSocketObject,
    grpcObject,
    TPROXY, SockoptObject
} from "./src";

/** v2ray */
export class v2ray {
    /** Log configuration, indicating how V2Ray outputs logs */
    log: LogObject = new LogObject();

    /** remote control*/
    api: ApiObject = null;

    /** Built-in DNS server, if this item does not exist, the DNS settings of this machine will be used by default*/
    dns: DnsObject = null;

    /** Routing function */
    routing: RoutingObject = null;

    /** Local policy, some permission-related configurations can be performed */
    policy: PolicyObject = new PolicyObject();

    /** An array, each element is an inbound connection configuration */
    inbounds: InboundObject[];

    /** An array, each element is an outbound connection configuration. The first element in the list acts as the primary outbound protocol. When the route match does not exist or no match is successful, the traffic is sent by the main outbound protocol*/
    outbounds: OutboundObject[];

    /** Used to configure how V2Ray establishes and uses network connections with other servers*/
    transport: TransportObject = null;

    /** Statistics*/
    stats: StatsObject = new StatsObject();

    /** reverse proxy */
    reverse: ReverseObject = null;

    /** Virtual DNS server */
    fakedns: FakeDnsObject[] = [];

    /** Browser forwarding module */
    browserForwarder: BrowserForwarderObject = null;

    /** Connect to the observation module */
    observatory: ObservatoryObject = null;

    /**
     * v2ray
     * @param inbounds inbound connection configuration
     * @param outbounds outbound connection configuration
     */
    constructor(inbounds: InboundObject | InboundObject[], outbounds: OutboundObject | OutboundObject[]) {
        if (inbounds instanceof InboundObject) inbounds = [inbounds];
        if (outbounds instanceof OutboundObject) outbounds = [outbounds];

        this.inbounds = inbounds;
        this.outbounds = outbounds;
    }
}

import {
    PROTOCOL, NETWORK, SECURITY,
    StreamSettingsObject,
    HEADER_OBJECT,
    AccountObject,
    FallbackObject
} from "./lib";

export {
    ApiObject, ApiService,
    BrowserForwarderObject,
    DnsServerObject, QUERY_STRATEGY, DnsObject,
    FakeDnsObject,
    DESTOVERRIDE, SniffingObject, INBOUND_STRATEGY, AllocateObject, InboundObject,
    LOGLEVEL, LogObject,
    ObservatoryObject,
    OutboundObject, ProxySettingsObject, MuxObject,
    PolicyObject, LevelPolicyObject, SystemPolicyObject,
    ReverseObject, BridgeObject, PortalObject,
    RoutingObject, DOMAIN_MATCHER, DOMAIN_STRATEGY, RULE_NETWORK, RULE_PROTOCOL, RuleObject, BALANCER_STRATEGY, BalancerObject,
    StatsObject,
    TransportObject,

    BLACKHOLE_RESPONSE, BlackholeOutboundObject,
    DNS_NETWORK, DnsOutboundObject,
    DOKODEMODOOR_NETWORK, DokodemodoorInboundObject,
    FREEDOM_STRATEGY, FreedomOutboundObject,
    HTTPInboundObject, HTTPOutboundObject, HTTPUserObject, HTTPServerObject,
    LoopbackOutboundObject,
    SHADOWSOCKS_METHOD, SHADOWSOCKS_NETWORK, ShadowsocksInboundObject, ShadowsocksOutboundObject, ShadowsocksServerObject,
    SocksOutboundObject, SocksInboundObject, SOCKS_AUTH, SocksServerObject, SocksUserObject,
    TrojanClientObject, TrojanServerObject, TrojanInboundObject, TrojanOutboundObject,
    VlessUserObject, VlessServerObject, VlessClientObject, VlessInboundObject, VlessOutboundObject,
    VmessUserObject, VMESS_SECURITY, VmessOutboundObject, VmessInboundObject, VmessClientObject, DetourObject, DefaultObject, VmessServerObject,

    NoneHeaderObject, HttpHeaderObject, TcpObject,
    KcpObject,
    WebSocketObject,
    HTTP_METHOD, HttpObject,
    QUIC_SECURITY, QUICObject,
    DomainSocketObject,
    grpcObject,
    TPROXY, SockoptObject,

    PROTOCOL, NETWORK, SECURITY,
    StreamSettingsObject,
    HEADER_OBJECT,
    AccountObject,
    FallbackObject
}
