const {POLLS_INTERVAL, DFLT_POLL_INTERVAL, DEFAULT_TOKEN_TIMEOUT, DEFAULT_TIMEOUT} = require("./Settings");
const {wait} = require("./Utils");

class Client {

    // Death by Captcha API Client.
    constructor(username, password) {
        if (username === 'authtoken'){
            console.log('using authtoken');
            this.userpwd = {
                'username' : username,
                'authtoken': password
            };
        }else{
            console.log('using username/password');
            this.userpwd = {
                'username': username,
                'password': password
            };
        }
    };

    async get_balance() {
        // Fetch user balance (in US cents).
        let user = await this.get_user();
        return user ? user.balance : null;
    }

    async get_text(cid) {
        // Fetch a CAPTCHA text.
        let captcha = await this.get_captcha(cid);
        return (captcha ? captcha['text'] : null);
    };

    async decode({captcha=null, timeout=null, extra={}}) {

        // Try to solve a CAPTCHA.
        // See Client.upload() for arguments details.
        // Uploads a CAPTCHA, polls for its status periodically with arbitrary
        // timeout (in seconds), returns CAPTCHA details if (correctly) solved.

        if (!timeout) {
            if (!captcha) {
                timeout = DEFAULT_TOKEN_TIMEOUT;
            } else {
                timeout = DEFAULT_TIMEOUT;
            }
        }

        const deadline = Date.now() + (0 < timeout ? timeout : DEFAULT_TIMEOUT) * 1000;
        let uploaded_captcha = await this.upload({captcha: captcha, extra: extra});

        if (uploaded_captcha) {
            let idx = 0;

            let get_captcha = () => this.get_captcha(uploaded_captcha['captcha']);
            let validate = captcha => captcha['text'] && captcha['is_correct'];

            let result = await get_captcha();
            while (!validate(result)) {
                let ms = (
                    POLLS_INTERVAL.length > idx
                        ? POLLS_INTERVAL[idx]
                        : DFLT_POLL_INTERVAL
                ) * 1000;

                if ((deadline > Date.now()) && (!result['text'])) {
                    await wait(ms);
                    result = await get_captcha();
                    idx++;
                } else if (result['text'] && result['is_correct']) {
                    return result
                } else {
                    return null
                }
            }
            return result;
        } else {
            return null
        }
    };
}

module.exports = Client;
