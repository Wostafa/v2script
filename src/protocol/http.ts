import { AccountObject } from "../../lib";

/** HTTP inbound configuration */
class HTTPInboundObject {
    /** Timeout setting (seconds) for reading data from the client, `0` means unlimited time*/
    timeout: number = 300;

    /**
     * An array, each element in the array is a user account. The default value is empty
     *
     * When accounts is non-null, the HTTP proxy will perform `Basic Authentication` verification on inbound connections
     */
    accounts: AccountObject[] = [];

    /** When `true`, all HTTP requests are forwarded, not just proxy requests. If the configuration is improper, turning on this option will lead to an infinite loop */
    allowTransparent: boolean = false;

    /** User level, all connections use this level */
    userLevel: number = 0;
}

/** HTTP outbound configuration */
class HTTPOutboundObject {
    /** HTTP proxy server configuration, if more than one is configured, cycle (RoundRobin) */
    servers: HTTPServerObject [];

    /**
     * HTTPOutboundObject
     * @param servers HTTP proxy server configuration
     */
    constructor(servers: HTTPServerObject | HTTPServerObject[]) {
        if (servers instanceof HTTPServerObject) servers = [servers];
        this.servers = servers;
    }
}

/** HTTP proxy server configuration */
class HTTPServerObject {
    /** HTTP proxy server address */
    address: string;

    /** HTTP proxy server port */
    port: number;

    /** An array, each element in the array is a user account */
    users: AccountObject[] = null;

    /**
     * HTTPServerObject
     * @param address HTTP proxy server address
     * @param port HTTP proxy server port
     * @param users user accounts
     */
    constructor(address: string, port: number, users?: AccountObject | AccountObject[]) {
        this.address = address;
        this.port = port;
        this.users = (users instanceof AccountObject)?[users]:users || null;
    }
}

/** user account*/
class HTTPUserObject {
    /** username*/
    user: string;

    /** password*/
    pass: string;

    /** user level*/
    userLevel: number = 0;

    /**
     * UserObject 
     * @param user username
     * @param pass password
     */
    constructor(user: string, pass: string) {
        this.user = user;
        this.pass = pass;
    }
}

export { HTTPInboundObject, HTTPOutboundObject, HTTPUserObject, HTTPServerObject };
