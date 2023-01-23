import { DomainSocketObject, grpcObject, HttpObject, KcpObject, QUICObject, TcpObject, WebSocketObject } from "../transport";

/**
* The underlying transmission method (transport) is the way the current V2Ray node connects with other nodes
*
* The underlying transmission method provides a stable data transmission channel. Generally speaking, both ends of a network connection need to have a symmetrical transmission mode.
* For example, if one end uses WebSocket, then the other end must also use WebSocket, otherwise the connection cannot be established.
*/
export class TransportObject {
    /** Configuration for TCP connection */
    tcpSettings: TcpObject = null;

    /** Configuration for mKCP connection */
    kcpSettings: KcpObject = null;

    /** Configuration for WebSocket connection */
    wsSettings: WebSocketObject = null;

    /** Configuration for HTTP/2 connections */
    httpSettings: HttpObject = null;

    /** Configuration for QUIC connections */
    quicSettings: QUICObject = null;

    /** Configuration for Domain Socket connection */
    dsSettings: DomainSocketObject = null;

    /** Configuration for gRPC connection */
    grpcSettings: grpcObject = null;
}
