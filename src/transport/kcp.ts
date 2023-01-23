import { HEADER_OBJECT } from "../../lib";

/**
* mKCP uses UDP to simulate TCP connection, please make sure the firewall configuration on the host is correct
*
* mKCP sacrifices bandwidth to reduce latency. To transmit the same content, mKCP generally consumes more traffic than TCP
*/
class KcpObject {
    /**
     * Maximum transmission unit (maximum transmission unit)
     *
     * Please select a value between 576 - 1460
     */
    person : number  =  1350 ;

    /**
     * Transmission time interval (transmission time interval), in milliseconds (ms), mKCP will send data at this time frequency
     *
     * Please select a value between 10 - 100
     */
    tti: number = 50;

    /** Uplink capacity, that is, the maximum bandwidth used by the host to send data, in MB/s */
    uplinkCapacity: number = 5;

    /** Link capacity, that is, the maximum bandwidth used by the host to receive data, in MB/s */
    downlinkCapacity: number = 20;

    /**
     * Whether to enable congestion control
     *
     * After the congestion control is enabled, V2Ray will automatically monitor the network quality, and when the packet loss is serious, it will automatically reduce the throughput; when the network is smooth, it will also increase the throughput appropriately
     */
    congestion: boolean = false;

    /** The read buffer size of a single connection, in MB */
    readBufferSize: number = 2;

    /** The write buffer size of a single connection, in MB */
    writeBufferSize: number = 2;

    /** Packet header masquerading settings */
    header: { type: HEADER_OBJECT } = { type: HEADER_OBJECT.none };
}

export { KcpObject };
