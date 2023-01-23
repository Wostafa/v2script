/**
* The gRPC configuration of the current connection, only valid when this connection uses gRPC
*
* gRPC uses HTTP/2 protocol transmission, built-in connection multiplexing (mux) function
*/
export class grpcObject {
    /** The name of the gRPC service. Its function is similar to that of path, which is used to prevent detection of whether this transport protocol is deployed. A complex random string is recommended.
     *
     * According to the [gRPC specification official](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md#appendix-a---grpc-for-protobuf),
     * It is not recommended to use characters other than English uppercase and lowercase letters, numbers, underscores and English periods in this field.
     */
    serviceName: string;

    /**
     * grpcObject
     * @param serviceName the name of the gRPC service
     */
    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }
}
