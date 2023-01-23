/**
* * When type is "none" (default value), Blackhole will close the connection directly
* * When type is "http", Blackhole will send back a simple HTTP 403 packet, then close the connection
*/
const enum BLACKHOLE_RESPONSE {
    none = "none",
    http = "http"
}

/**
* Blackhole is an outbound data protocol that blocks all data outbound
* Used together with routing (Routing), can achieve the effect of prohibiting access to certain websites
*/
class BlackholeOutboundObject {
    /**
     * Configure the response data of the black hole
     *
     * Blackhole will send the specified response data after receiving the data to be forwarded, and then close the connection
     *
     * Data to be forwarded will be discarded. If this is not specified, Blackhole will close the connection directly
     */
    response: {type: BLACKHOLE_RESPONSE } = {
        type: BLACKHOLE_RESPONSE.none
    };
}

export { BLACKHOLE_RESPONSE, BlackholeOutboundObject };
