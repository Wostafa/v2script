import { StreamSettingsObject } from "./streamsetting";
import { AccountObject } from "./protocol";

/** Transfer Protocol*/
const enum PROTOCOL {
    BlackHole = "blackhole",
    DNS = "dns",
     Dokodemo_door = "  dokodemo -door" ,
    Freedom = "freedom",
    HTTP = "http",
    Socks = "socks",
    VMess = "vmess",
    Shadowsocks = "shadowsocks",
    Trojan = "trojan",
    VLess = "vless",
    Loopback = "loopback"
}

/** Connection method */
const enum NETWORK {
    tcp = "tcp",
    kcp = "kcp",
    websocket = "ws",
    http = "http",
    domainsocket = "domainsocket",
    quic  =  "quic" ,
    grpc = "grpc"
}

/** verification method*/
const enum SECURITY {
    none = "none",
    tls = "tls"
}

/** Packet header masquerade type */
const enum HEADER_OBJECT {
    /** No masquerading, the sent data is a data packet without characteristics*/
    none = "none",

    /** Masquerading as SRTP packets, will be identified as video call data (such as FaceTime) */
    srtp = "srtp",

    /** Masquerading as a uTP packet, it will be identified as BT download data */
    utp = "utp",

    /** Packets disguised as WeChat video calls*/
    wechat_video = "wechat-video",

    /** Masquerade as a DTLS 1.2 packet */
    dtls = "dtls",

    /** Disguised as a WireGuard packet */
    wireguard = "wireguard"
}

/** Fallback shunt configuration */
class FallbackObject {
    /**
     * Try to match the TLS ALPN negotiation result, empty is any
     *
     * Only when necessary, VLESS will try to read the TLS ALPN negotiation result, if successful, output info realAlpn = to the log
     *
     * Purpose: Solve the problem that Nginx's h2c service cannot be compatible with http/1.1 at the same time. Nginx needs to write two lines of listen, which are used for 1.1 and h2c respectively
     *
     * Note: When "h2" exists in fallbacks alpn, Inbound TLS needs to set "alpn":["h2","http/1.1"] to support h2 access
     */
    alpn: string = "";

    /** Try to match the first packet HTTP PATH */
    path: string = "";

    /**
     * Determine the destination of TCP traffic after TLS decryption, currently supports two types of addresses: (This item is required, otherwise it cannot be started)
     *
     * * TCP, the format is "addr:port", where addr supports IPv4, domain name, and IPv6. If you fill in the domain name, it will directly initiate a TCP connection (without using the built-in DNS)
     * * Unix domain socket, the format is an absolute path, like "/dev/shm/domain.socket", you can add "@" at the beginning to represent [abstract](https://www.man7.org/linux/man- pages/man7/unix.7.html),
     * "@@" stands for abstract with padding
     *
     * ! If you only fill in the port, numbers or strings are acceptable, such as 80, "80", usually pointing to a plaintext http service (addr will be filled with "127.0.0.1").
     */
    dest: string | number;

    /**
     * send [PROXY protocol](https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt)，
     * The real source IP and port dedicated to the delivery request, fill in version 1 or 2, the default is 0, that is, not sent. If necessary, it is recommended to fill in 1
     *
     * Currently fill in 1 or 2, the functions are exactly the same, but the structure is different, and the former can be printed, while the latter is binary. Both TCP and WS inbound of V2Ray support receiving PROXY protocol.
     */
    xver: number = 0;

    /**
     * FallbackObject
     * @param dest determines the destination of TCP traffic after TLS decryption
     */
    constructor(dest: string | number) {
        this.dest = dest;
    }
}

export {
    PROTOCOL, NETWORK, SECURITY,
    StreamSettingsObject,
    HEADER_OBJECT,
    AccountObject,
    FallbackObject
}
