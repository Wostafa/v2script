import { FallbackObject } from "../../lib";

/** Trojan client configuration */
class TrojanClientObject {
    /** password*/
    password: string;

    /** Email address, used to identify the user */
    email: string;

    /** user level*/
    level: number = 0;

    /**
     * TrojanClientObject
     * @param email email address
     * @param password password
     */
    constructor(email: string, password: string) {
        this.password = password;
        this.email = email;
    }
}

/** Trojan server configuration */
class TrojanServerObject {
    /** Server address, supports IPv4, IPv6 and domain names */
    address: string;

    /** server port */
    port: number;

    /** Email address, used to identify the user */
    email: string;

    /** password*/
    password: string;

    /** user level*/
    level: number = 0;

    /**
     * TrojanServerObject
     * @param address server address
     * @param port server port
     * @param email email address
     * @param password password
     */
    constructor(address: string, port: number, email: string, password: string) {
        this.address = address;
        this.port = port;
        this.email = email;
        this.password = password;
    }
}

/** Trojan inbound configuration */
class TrojanInboundObject {
    /** Client List*/
    clients: TrojanClientObject[];

    /** Fallback shunt list */
    fallbacks: FallbackObject[];

    /**
     * TrojanInboundObject
     * @param clients client list
     * @param fallbacks Fallback fallback list
     */
    constructor(clients: TrojanClientObject | TrojanClientObject[], fallbacks: FallbackObject | FallbackObject[]) {
        if (clients instanceof TrojanClientObject) clients = [clients];
        if (fallbacks instanceof FallbackObject) fallbacks = [fallbacks];

        this.clients = clients;
        this.fallbacks = fallbacks;
    }
}

/** Trojan outbound configuration */
class TrojanOutboundObject {
    /** server list*/
    servers: TrojanServerObject[];

    /**
     * TrojanOutboundObject
     * @param servers server configuration
     */
    constructor(servers: TrojanServerObject | TrojanServerObject[]) {
        if (servers instanceof TrojanServerObject) servers = [servers];
        this.servers = servers;
    }
}

export { TrojanClientObject, TrojanServerObject, TrojanInboundObject, TrojanOutboundObject };
