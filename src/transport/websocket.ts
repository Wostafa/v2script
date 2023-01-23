/**
* The WebSocket configuration of the current connection, only valid when this connection uses WebSocket
*
* Use standard WebSocket to transfer data. WebSocket connections can be diverted by other HTTP servers (such as Nginx) or by VLESS fallbacks path
*/
export class WebSocketObject {
    /**
     * v4.27.1+, only for inbound, whether to receive PROXY protocol
     *
     * When filling in true, after the bottom TCP connection is established, the requester must first send PROXY protocol v1 or v2, otherwise the connection will be closed
     *
     * [PROXY protocol](https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt) is dedicated to passing the real source IP and port of the request,
     * If you don't understand it, please ignore this item
     *
     * Common anti-generation software (such as HAProxy, Nginx) can be configured to send it, and VLESS fallbacks xver can also send it
     */
    acceptProxyProtocol: boolean = false;

    /** HTTP protocol path used by WebSocket */
    path: string = "/";

    /** Custom HTTP header, a key-value pair, each key represents the name of an HTTP header, and the corresponding value is a string */
    headers: any = null;

    /**
     * The maximum length of preamble data to be sent. Used to reduce connection establishment time (v4.37.0+)
     *
     * The data will be appended to the path in the form of Base64 RawURLEncoding, and it needs to be matched according to the prefix when forwarding
     *
     * If earlyDataHeaderName is set, the pre-data will be placed in the HTTP header (v4.39.0+)
     *
     * For the receiving end, setting it to any non-zero value means enabling pre-data support
     */
    maxEarlyData: number = 1024;

    /**
     * Whether to enable browser forwarding
     *
     * If browser forwarding is enabled, the corresponding WebSockets connection will be forwarded by the browser forwarding module and then sent to the Internet (v4.37.0+)
     *
     * The v4.37.0+ server-side program will automatically adapt to the browser forwarding function of the client without additional settings
     *
     * Only compatible with path-based prefixes or HTTP header-based prefixes whose name is `Sec-WebSocket-Protocol`
     */
    useBrowserForwarding: boolean = false;

    /**
     * The name of the HTTP header of the pre-data sent. After setting, the pre-data based on the HTTP header is enabled. If left blank use path-based prefix data (v4.39.0+)
     *
     * If and only if the name of the HTTP header is `Sec-WebSocket-Protocol`, the browser forwarding function based on the HTTP header can be enabled
     */
    earlyDataHeaderName: string = "";
}
