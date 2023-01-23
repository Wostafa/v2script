import { HEADER_OBJECT } from "../../lib";

/** QUIC encryption method */
const enum QUIC_SECURITY {
    none = "none",
    aes_128_gcm = "aes-128-gcm",
    chacha20_poly1305 = "chacha20-poly1305"
}

/**
* The full name of QUIC is Quick UDP Internet Connection, which is a protocol proposed by Google that uses UDP for multi-channel concurrent transmission. Its main advantages are:
* * Reduced handshake latency (1-RTT or 0-RTT)
* * Multiplexing, and no TCP blocking problem
* * Connection migration, (mainly on the client side) when transferring from Wifi to 4G, the connection will not be disconnected.
*/
class QUICObject {
    /**
     * Encryption. The default is no encryption
     *
     * This encryption is the encryption of QUIC data packets, and the encrypted data packets cannot be detected
     */
    security: QUIC_SECURITY = QUIC_SECURITY.none;

    /**
     * The key used for encryption. can be any string
     *
     * Valid when security is not `none`
     */
    key: string = "";

    /** Packet header masquerading settings */
    header: { type: HEADER_OBJECT } = { type: HEADER_OBJECT.none };
}

export { QUIC_SECURITY, QUICObject };
