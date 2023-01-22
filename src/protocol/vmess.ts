/** VMESS encryption method */
const enum VMESS_SECURITY {
    /** Recommended for use on PC */
    aes_128_gcm = "aes-128-gcm",

    /** Recommended for use on mobile phones */
    chacha20_poly1305 = "chacha20-poly1305",

    /** Automatic selection (aes-128-gcm encryption method when the running framework is AMD64, ARM64 or s390x, and Chacha20-Poly1305 encryption method in other cases) */
    auto = "auto",

    /** no encryption */
    none = "none",

    /** No encryption, no message authentication (v4.35.0+) */
    zero = "zero"
}

/** Vmess user configuration */
class VmessUserObject {
    /** The primary ID of the VMess user. Must be a valid UUID */
    id: string;

    /** 
     * In order to further prevent being detected, a user can generate multiple additional IDs on the basis of the main ID
     * 
     * Here you only need to specify the number of additional IDs, the recommended value is 0 to enable VMessAEAD
     *
     * If not specified, the default value is 0. The maximum value is 65535. This value cannot exceed the value specified by the server.
     */
    alterId: number = 0;

    /** user level*/
    level: number = 0;

    /** Encryption method, the client will use the configured encryption method to send data, and the server will automatically identify it, no need to configure*/
    security: VMESS_SECURITY = VMESS_SECURITY.auto;

    /**
     * UserObject 
     * @param user username
     * @param pass password
     */
    constructor(id: string) {
        this.id = id;
    }
}

/** Vmess server configuration */
class VmessServerObject {
    /** server address*/
    address: string;

    /** server port */
    port: number;

    /** user list*/
    users: VmessUserObject[];

    /**
     * ServerObject
     * @param address server address
     * @param port server port
     * @param users user configuration
     */
    constructor(address: string, port: number, users: VmessUserObject | VmessUserObject[]) {
        this.address = address;
        this.port = port;

        if (users instanceof VmessUserObject) users = [users];
        this.users = users;
    }
}

/** Vmess outbound configuration */
class VmessOutboundObject {
    /** An array containing a series of server configurations */
    vnext: VmessServerObject[];

    /**
     * VmessOutboundObject
     * @param servers server configuration
     */
    constructor(servers: VmessServerObject | VmessServerObject[]) {
        if (servers instanceof VmessServerObject) servers = [servers];
        this.vnext = servers;
    }
}

/** Vmess client configuration */
class VmessClientObject {
    /** User ID for VMess. Must be a valid UUID */
    id: string;

    /** user level*/
    level: number = 0;

    /**
     * In order to further prevent being detected, a user can generate multiple additional IDs on the basis of the main ID
     *
     * Here you only need to specify the number of additional IDs, the recommended value is 0 to enable VMessAEAD
     *
     * If not specified, the default value is 0. The maximum value is 65535. This value cannot exceed the value specified by the server.
     */
    alterId: number = 0;

    /** User email address, used to distinguish the traffic of different users */
    email: string;

    /**
     * VmessClientObject
     * @param id VMess user ID
     * @param email User email address, used to distinguish the traffic of different users
     */
    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }
}

/** Instruct the corresponding outbound protocol to use another server */
class DetourObject {
    /** An inbound protocol tag */
    to: string;

    /**
     * DetourObject
     * @param to an inbound protocol tag
     */
    constructor(to: string) {
        this.to = to;
    }
}

/** Default configuration for clients. Only valid when combined with detour */
class DefaultObject {
    /** user level*/
    level: number = 0;

    /**
     * In order to further prevent being detected, a user can generate multiple additional IDs on the basis of the main ID
     *
     * Here you only need to specify the number of additional IDs, the recommended value is 0 to enable VMessAEAD
     *
     * If not specified, the default value is 0. The maximum value is 65535. This value cannot exceed the value specified by the server.
     */
    alterId: number = 0;
}

/** Vmess inbound configuration */
class VmessInboundObject {
    /** A set of users recognized by the server. clients can be empty. When this configuration is used as a dynamic port, V2Ray will automatically create users. */
    clients: VmessClientObject[];

    /** Instruct the corresponding outbound protocol to use another server */
    detour: DetourObject = null;

    /** Default configuration for clients. Only valid when combined with detour */
    default: DefaultObject = null;

    /** 
     * Whether to prohibit the client from using insecure encryption
     * 
     * When the client specifies the following encryption methods, the server will actively disconnect
     * * `none`
     * * `aes-128-cfb`
     */
    disableInsecureEncryption: boolean = false;

    /**
     * VmessInboundObject
     * @param clients client configuration
     */
    constructor(clients: VmessClientObject | VmessClientObject[]) {
        if (clients instanceof VmessClientObject) clients = [clients];
        this.clients = clients;
    }
}

export { VmessUserObject, VMESS_SECURITY, VmessOutboundObject, VmessInboundObject, VmessClientObject, DetourObject, DefaultObject, VmessServerObject };
