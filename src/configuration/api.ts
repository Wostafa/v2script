/**
* Some APIs can be opened in V2Ray for remote calling
 * 
* These APIs are based on [gRPC](https://grpc.io/),
* Most users will not use this API, novices can directly ignore this item
*
* When the remote control is enabled, V2Ray will build an outbound proxy by itself, marked with the value of the tag configuration,
* Users must manually route all gRPC inbound connections to this outbound proxy
 */
class ApiObject {
    /** Outbound proxy ID */
    tag: string = "api";

    /** Enabled API list */
    private services: ApiService[] = [];

    /**
     * Open the API service
     * @param service The API service that needs to be opened, its value is an ApiService type value or an array
     * @returns current object
     */
    open(service: ApiService | ApiService[]): ApiObject {
        if (typeof (service) === "string") {
            service = [service];
        }

        for (let i in service) {
            let exist: boolean = false;
            for (let j in this.services) {
                if (service[i] === this.services[j]) {
                    exist = true;
                    break;
                }
            }
            if (!exist) this.services.push(service[i]);
        }

        return this;
    }

    /**
     * Close the API service
     * @param service The API service that needs to be closed, its value is an ApiService type value or an array
     * @returns current object
     */
    close(service: ApiService | ApiService[]): ApiObject {
        if (typeof (service) === "string") {
            service = [service];
        }

        for (let i in service) {
            for (let j in this.services) {
                if (service[i] === this.services[j]) {
                    this.services.splice(Number(j), 1);
                }
            }
        }
        return this;
    }
}

/** List of supported APIs */
const enum ApiService {
    /** 
     * Some APIs that are modified for inbound and outbound proxies, the available functions are as follows
     * * Add a new inbound proxy
     * * Add a new outbound proxy
     * * Delete an existing inbound proxy
     * * Delete an existing outbound proxy
     * * Add a user in an inbound proxy (only supports VMess, VLESS, Trojan)
     * * Delete a user in an inbound proxy (only supports VMess, VLESS, Trojan)
     */
    HandlerService = "HandlerService",
    /** Support the restart of the built-in Logger, and can cooperate with logrotate to perform some operations on log files*/
    LoggerService = "LoggerService",
    /** Built-in data statistics service */
    StatsService = "StatsService",
    /** Connect Observation API (v4.38.0+) */
    ObservatoryService = "ObservatoryService"
}

export { ApiObject, ApiService };
