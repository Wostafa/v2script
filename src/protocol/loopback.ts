/**
* Loopback is an outbound protocol that enables outbound connections to be rerouted
*/
export class LoopbackOutboundObject {
    /** match the ID of the inbound source */
    inboundTag: string;

    /**
     * LoopbackOutboundObject
     * @param inboundTag matches the ID of the inbound source
     */
    constructor(inboundTag: string) {
        this.inboundTag = inboundTag;
    }
}
