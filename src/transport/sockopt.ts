const enum TPROXY {
    redirect = "redirect",
    tproxy = "tproxy",
    off = "off"
}

/**
* Configuration used as a transparent proxy
*/
class SockoptObject {
    /**
     * an integer. Mark SO_MARK on outbound connections when its value is non-zero
     * * Applies to Linux systems only
     * * Requires CAP_NET_ADMIN permission.
     */
    mark: number = 0;

    /**
     * Whether to enable [TCP Fast Open](https://zh.wikipedia.org/wiki/TCP%E5%BF%AB%E9%80%9F%E6%89%93%E5%BC%80)
     *
     * When its value is true, TFO is forcibly turned on; when its value is false, TFO is forcibly closed; when this item does not exist, the system default setting is used
     *
     * Available for inbound and outbound connections
     *
     * Only available on the following versions (or newer) of the operating system:
     * * Windows 10 (1604)
     * * Mac OS 10.11 / iOS 9
     * * Linux 3.16: The system is enabled by default, no configuration is required
     * * FreeBSD 10.3
     */
    tcpFastOpen: boolean = false;

    /** [TCP Fast Open](https://zh.wikipedia.org/wiki/TCP%E5%BF%AB%E9%80%9F%E6%89%93%E5%BC%80 for inbound connections ) queue length */
    tcpFastOpenQueueLength: number = 4096;

    /**
     * Whether to enable transparent proxy (only for Linux)
     * * "redirect": Transparent proxy using Redirect mode. Supports TCP and UDP connections
     * * "tproxy": Transparent proxy using TProxy mode. Supports TCP and UDP connections
     * * "off": Turn off transparent proxy
     *
     * ! Transparent proxy requires Root or CAP_NET_ADMIN authority.
     */
    tproxy: TPROXY = TPROXY.off;

    /** TCP keep-alive packet sending interval in seconds (Linux only) */
    tcpKeepAliveInterval: number = 0;
}

export { TPROXY, SockoptObject };
