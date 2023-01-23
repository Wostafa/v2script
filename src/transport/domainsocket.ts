/**
* Domain Socket uses standard Unix domain socket to transmit data
*
* Its advantage is that it uses the built-in transmission channel of the operating system without occupying the network cache. Compared with the local loopback network (local loopback), Domain socket is slightly faster.
*
* Currently only available on platforms that support Unix domain sockets, such as Linux and macOS. Not available prior to Windows 10 Build 17036.
*
* If domain socket is specified as the transmission method, the port and IP address configured in the inbound and outbound proxy will be invalid, and all transmissions will be replaced by domain socket
*/
export class DomainSocketObject {
    /** A valid file path. This file must not exist before running V2Ray */
    path: string;

    /** Is it an abstract domain socket */
    abstract: boolean = false;

    /** Whether the abstract domain socket has padding */
    padding: boolean = false;

    /**
     * DomainSocketObject
     * @param path a legal file path
     */
    constructor(path: string) {
        this.path = path;
    }
}
