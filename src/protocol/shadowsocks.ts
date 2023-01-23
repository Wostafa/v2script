/** Shadowsocks encryption method */
const enum SHADOWSOCKS_METHOD {
    aes_256_gcm = "aes-256-gcm",
    aes_128_gcm = "aes-128-gcm",
    chacha20_poly1305 = "chacha20-poly1305",
    chacha20_ietf_poly1305 = "chacha20-ietf-poly1305",
    none = "none"
}

/** Shadowssocks acceptable network connection types */
const enum SHADOWSOCKS_NETWORK {
    tcp = "tcp",
    udp = "udp",
    tcp_udp = "tcp,udp"
}

/** Shadowsocks inbound configuration */
class ShadowsocksInboundObject {
    /** Email address, used to identify the user */
    email: string;

    /** encryption method */
    method: SHADOWSOCKS_METHOD;

    /** password*/
    password: string;

    /** user level*/
    level: number = 0;

    /** Acceptable network connection types */
    network: SHADOWSOCKS_NETWORK = SHADOWSOCKS_NETWORK.tcp;

    /**
     * ShadowsocksInboundObject
     * @param email email address
     * @param password password
     * @param method encryption method
     */
    constructor(email: string, password: string, method: SHADOWSOCKS_METHOD) {
        this.email = email;
        this.password = password;
        this.method = method;
    }
}

/** Shadowsocks server configuration */
class  ShadowsocksServerObject  {
    /** Email address, used to identify the user */
    email: string;

    /** Server address, supports IPv4, IPv6 and domain names */
    address: string;

    /** server port */
    port: number;

    /** encryption method */
    method: SHADOWSOCKS_METHOD;

    /** password*/
    password: string;

    /** user level*/
    level: number = 0;

    /**
     * ShadowsocksServerObject
     * @param email email address
     * @param address Shadowsocks server address, supports IPv4, IPv6 and domain name
     * @param port Shadowsocks server port
     * @param password password
     * @param method encryption method
     */
    constructor(email: string, address: string, port: number, password: string, method: SHADOWSOCKS_METHOD) {
        this.email = email;
        this.address = address;
        this.port = port;
        this.method = method;
        this.password = password;
    }
}

/** Shadowsocks outbound configuration */
class ShadowsocksOutboundObject {
    /** server list*/
    servers: ShadowsocksServerObject[];

    /**
     * ShadowsocksOutboundObject
     * @param servers Shadowsocks service
     */
    constructor(servers: ShadowsocksServerObject | ShadowsocksServerObject[]) {
        if (servers instanceof ShadowsocksServerObject) servers = [servers];
        this.servers = servers;
    }
}

export { SHADOWSOCKS_METHOD, SHADOWSOCKS_NETWORK, ShadowsocksInboundObject, ShadowsocksOutboundObject, ShadowsocksServerObject };
