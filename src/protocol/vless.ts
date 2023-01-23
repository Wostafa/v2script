import { FallbackObject } from "../../lib";

/** Vless server configuration */
class VlessServerObject {
    /** server address*/
    address: string;

    /** server port */
    port: number;

    /** user list*/
    users: VlessUserObject[];

    /**
     * VlessServerObject
     * @param address server address
     * @param port server port
     * @param users user configuration
     */
    constructor(address: string, port: number, users: VlessUserObject | VlessUserObject[]) {
        this.address = address;
        this.port = port;

        if (users instanceof VlessUserObject) users = [users];
        this.users = users;
    }
}

/** User configuration */
class VlessUserObject {
    /** The user ID of VLESS must be a legal UUID */
    id: string;

    /** At this stage, "none" needs to be filled in and cannot be left blank. */
    encryption: "none" = "none";

    /** user level*/
    level: number = 0;

    /**
     * VlessUserObject
     * @param id VLESS user ID
     */
    constructor(id: string) {
        this.id = id;
    }
}

/** Vless outbound configuration */
class VlessOutboundObject {
    /** server list*/
    vnext: VlessServerObject[];

    /**
     * VlessOutboundObject
     * @param servers server configuration
     */
    constructor(servers: VlessServerObject | VlessServerObject[]) {
        if (servers instanceof VlessServerObject) servers = [servers];
        this.vnext = servers;
    }
}

/** Vless client configuration */
class VlessClientObject {
    /** The user ID of VLESS must be a legal UUID */
    id: string;

    /** user level*/
    level: number = 0;

    /** User mailbox, used to distinguish the traffic of different users*/
    email: string;

    /**
     * VlessClientObject
     * @param id VLESS user ID
     * @param email user email
     */
    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }
}

/** Vless inbound configuration */
class VlessInboundObject {
    /** Client List*/
    clients: VlessClientObject[];

    /** Fallback shunt list */
    fallbacks: FallbackObject[];

    /**
     * VlessInboundObject
     * @param clients client list
     * @param fallbacks Fallback fallback list
     */
    constructor(clients: VlessClientObject | VlessClientObject[], fallbacks: FallbackObject | FallbackObject[]) {
        if (clients instanceof VlessClientObject) clients = [clients];
        if (fallbacks instanceof FallbackObject) fallbacks = [fallbacks];

        this.clients = clients;
        this.fallbacks = fallbacks;
    }
}

export { VlessUserObject, VlessServerObject, VlessClientObject, VlessInboundObject, VlessOutboundObject };
