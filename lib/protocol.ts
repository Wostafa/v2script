/** User configuration */
class AccountObject {
    /** username*/
    user: string;

    /** password*/
    pass: string;

    /**
     * AccountObject
     * @param user username
     * @param pass password
     */
    constructor(user: string, pass: string) {
        this.user = user;
        this.pass = pass;
    }
}


export { AccountObject };
