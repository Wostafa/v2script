class NoneHeaderObject {
    type: "none" = "none";
}

class HttpHeaderObject {
    type: "http" = "http";
    request: {
        version: string,
        method: string,
        path: string[],
        headers: any
    } = {
        version: "1.1",
        method: "GET",
        path: [
            "/"
        ],
        headers: {
            "User-Agent": [
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/53.0.2785.109 Mobile/14A456 Safari/601.1.46"
            ],
            "Accept-Encoding": [
                "gzip, deflate"
            ],
            "Connection": [
                "keep-alive"
            ],
            "Pragma": "no-cache"
        }
    };
    response: {
        version: string,
        status: string,
        reason: string,
        headers: any
    } = {
        version: "1.1",
        status: "200",
        reason: "OK",
        headers: {
            "Content-Type": [
                "application/octet-stream",
                "video/mpeg"
            ],
            "Transfer-Encoding": [
                "chunked"
            ],
            "Connection": [
                "keep-alive"
            ],
            "Pragma": "no-cache"
        }
    };
}

/**
* The TCP configuration of the current connection, only valid when this connection uses TCP
*/
class TcpObject {
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

    /**
     * Packet header masquerading settings
     *
     * HTTP masquerading cannot be diverted by other HTTP servers (such as Nginx), but it can be diverted by VLESS fallbacks path
     */
    header: NoneHeaderObject | HttpHeaderObject = new NoneHeaderObject();
}

export { NoneHeaderObject, HttpHeaderObject, TcpObject };
