/** 可接收的网络协议类型 */
const enum DOKODEMODOOR_NETWORK {
    tcp = "tcp",
    udp = "udp",
    tcp_udp = "tcp,udp"
}

/**
 * Dokodemo door（任意门）是一个入站数据协议
 * 它可以监听一个本地端口，并把所有进入此端口的数据发送至指定服务器的一个端口，从而达到端口映射的效果
 */
/** Acceptable network protocol types */
const enum DOKODEMODOOR_NETWORK {
    tcp = "tcp",
    udp = "udp",
    tcp_udp = "tcp,udp"
}

/**
* Dokodemo door is an inbound data protocol
* It can listen to a local port and send all the data entering this port to a port of the specified server, so as to achieve the effect of port mapping
*/
class DokodemodoorInboundObject {
    /**
     * Forward traffic to this address
     *
     * It can be an IP address, like "1.2.3.4", or a domain name, like "v2ray.com"
     *
     * address can be null when followRedirect (see below) is true
     */
    address: string;

    /** Forward traffic to the specified port of the target address, range [1, 65535], value type*/
    port: number;

    /** Acceptable network protocol types. For example, when specified as `tcp`, any door will only receive TCP traffic*/
    network : DOKODEMODOOR_NETWORK  =  DOKODEMODOOR_NETWORK . tcp ;

    /** Time limit (seconds) for inbound data, the default value is 300 */
    timeout: number = 300;

    /**
     * When the value is `true`, dokodemo-door will identify the data forwarded by iptables and forward it to the corresponding target address.
     *
     * See [Transport Configuration](https://www.v2fly.org/config/transport.html) for details
     */
    followRedirect: boolean = false;

    /**
     * User level, all connections will use this user level
     */
    userLevel: number = 0;

    /**
     * DokodemodoorInboundObject
     * @param address forward traffic to this address
     * @param port forward traffic to the specified port of the target address
     * @param userLevel user level (optional)
     */
    constructor(address: string, port: number) {
        this.address = address;
        this.port = port;
    }
}

export { DOKODEMODOOR_NETWORK, DokodemodoorInboundObject };
