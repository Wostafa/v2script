/**
* Log configuration, indicating how V2Ray outputs logs
*/
class LogObject {
    /**
     * The file address of the access log, its value is a legal file address, such as `/var/log/v2ray/access.log` (Linux) or `C:\\Temp\\v2ray\\_access.log` (Windows )
     *
     * When this item is not specified or is empty, it means output the log to stdout
     *
     * V2Ray 4.20 added the special value `none`, that is, close the access log
     */
    access: string = "";

    /**
     * The file address of the error log, its value is a legal file address, such as `/var/log/v2ray/error.log` (Linux) or `C:\\Temp\\v2ray\\_error.log` (Windows )
     *
     * When this item is not specified or is empty, it means output the log to stdout
     *
     * V2Ray 4.20 added the special value `none`, that is to turn off the error log (equivalent to loglevel: "none").
     */
    error: string = "";

    /**
     * The level of the log. The default value is "warning".
     * * `debug`: Detailed debugging information, including all `info` content
     * * `info`: The status of V2Ray at runtime, does not affect normal use, and includes all `warning` content
     * * `warning`: V2Ray has encountered some problems, usually external problems, which do not affect the normal operation of V2Ray, but may affect the user experience, and include all `error` content
     * * `error`: V2Ray has encountered a problem that does not work properly and needs to be resolved immediately
     * * `none`: do not log anything
     */
    loglevel: LOGLEVEL = LOGLEVEL.warning;

    /**
     * Constructor
     * @param access The file address of the access log, its value is a legal file address
     * @param error The file address of the error log, its value is a legal file address
     * @param loglevel log level, its value is LOGLEVEL enumeration type, the default value is LOGLEVEL.warning
     */
    constructor(access?: string, error?: string, loglevel?: LOGLEVEL) {
        this.access = access || this.access;
        this.error = error || this.error;
        this.loglevel = loglevel || this.loglevel;
    }
}

/**
* * `debug`: Detailed debugging information, including all `info` content
* * `info`: The status of V2Ray at runtime, does not affect normal use, and includes all `warning` content
* * `warning`: V2Ray has encountered some problems, usually external problems, which do not affect the normal operation of V2Ray, but may affect the user experience, and include all `error` content
* * `error`: V2Ray has encountered a problem that does not work properly and needs to be resolved immediately
* * `none`: do not log anything
*/
const enum LOGLEVEL {
    warning = "warning",
    debug = "debug",
    info = "info",
    error = "error",
    none = "none"
}

export { LOGLEVEL, LogObject };
