/** HTTP connection method */
const enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
    PUT = "PUT"
}

/**
* V2Ray 3.17 has added HTTP/2 based transmission mode. It is fully implemented in accordance with the HTTP/2 standard and can be transferred through other HTTP servers (such as Nginx).
*
* According to the suggestion of HTTP/2, the client and server must enable TLS at the same time to use this transmission method normally.
*
* In V2Ray 4.20, the mandatory conditions for the TLS configuration of the server are removed. In order to complete the TLS layer dialogue by the external gateway component in the special-purpose distribution deployment environment,
* V2Ray is used as a back-end application, and the gateway and V2Ray use plaintext http/2 called h2c for communication.
*/
class HttpObject {
    /**
     * An array of strings, each element is a domain name
     *
     * The client will randomly select a domain name from the list for communication, and the server will verify whether the domain name is in the list
     */
    host: string[] = [];

    /**
     * HTTP path, starting with /
     *
     * Client and server must match
     */
    path: string = "/";

    /** HTTP method */
    method: HTTP_METHOD = HTTP_METHOD.PUT;

    /** HTTP header, a key-value pair, each key represents the name of an HTTP header, and the corresponding value is an array*/
    headers: any = {};
}

export { HTTP_METHOD, HttpObject };
