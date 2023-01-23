/** The browser forwarding module can use browser web pages to forward supported connections */
export class BrowserForwarderObject {
    /** The local listening address of the browser forwarding page */
    listenAddr: string;

    /** The local listening port of the browser forwarding page */
    listenPort: number;

    /**
     * BrowserForwarderObject
     * @param addr The local listening address of the browser forwarding page
     * @param port The local listening port of the browser forwarding page
     */
    constructor(addr: string, port: number) {
        this.listenAddr = addr;
        this.listenPort = port;
    }
}
