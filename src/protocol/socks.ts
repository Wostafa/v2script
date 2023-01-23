import { AccountObject } from "../../lib";

/** User configuration */
class SocksUserObject {
    /** username*/
    user: string;

    /** password*/
    pass: string;

    /** user level*/
    level: number = 0;

    /**
     * SocksUserObject
     * @param user username
     * @param pass password
     */
    constructor(user: string, pass: string) {
        this.user = user;
        this.pass = pass;
    }
}

/** Socks server configuration */
class  SocksServerObject  {
    /** server address*/
    address: string;

    /** server port */
    port: number;

    /** user list*/
    users: SocksUserObject[] = [];

    /**
     * ServerObject
     * @param address server address
     * @param port server port
     */
    constructor(address: string, port: number) {
        this.address = address;
        this.port = port;
    }
}

/** Socks outbound configuration */
class SocksOutboundObject {
    /** server list*/
    servers: SocksServerObject[];

    /** Socks version */
    version: "5" | "4a" | "4";

    /**
     * SocksOutbound
     * @param version Socks protocol version
     */
    constructor(version: "5" | "4a" | "4", servers: SocksServerObject | SocksServerObject[]) {
        this.version = version;

        if (servers instanceof SocksServerObject) servers = [servers];
        this.servers = servers;
    }
}

/** Socks authentication method */
const enum SOCKS_AUTH {
    /** Do not authenticate */
    noauth = "noauth",

    /** Password authentication*/
    password = "password"
}

/** Socks inbound configuration */
class SocksInboundObject {
    /** authentication method */
    auth: SOCKS_AUTH = SOCKS_AUTH.noauth;

    /**
     * An array, each element in the array is a user account
     * This option is only valid when auth is password.
     */
    accounts: AccountObject[] = null;

    /** Whether to enable UDP protocol support */
    udp: boolean = false;

    /**
     * SOCKS5 establishes a UDP session through the UDP ASSOCIATE command. In the reply to the command sent by the client, the server specifies the destination address of the client sending the packet
     *
     * v4.34.0+: The default value is empty, at this time, for clients connected through local loopback IPv4/IPv6,
     * Reply the corresponding loopback IPv4/IPv6 address; for non-local clients, reply the current inbound listening address
     *
     * v4.33.0 and earlier: Default value 127.0.0.1.
     * You can make V2Ray always reply to the address you configured by configuring this item. If you don't know what this item does, just leave it blank
     */
    ip: string = null;

    /** user level*/
    userLevel: number = 0;

    /**
     * SocksInboundObject
     * @param auth authentication method
     * @param account user list
     */
    constructor(auth?: SOCKS_AUTH, account?: AccountObject | AccountObject[]) {
        this.auth = auth || this.auth;

        if (account instanceof AccountObject) account = [account];
        this.accounts = account || null;
    }
}

export { SocksOutboundObject, SocksInboundObject, SOCKS_AUTH, SocksServerObject, SocksUserObject };
