const net = require("net");
const Client = require("./BaseClient")
const {getRandomInt} = require("./Utils");
const {HTTP_BASE_URL, API_VERSION, TERMINATOR} = require("./Settings");


class SocketClient extends Client {

    // Death By Captcha Socket API Client.

    async _call({cmd, payload={}, headers={}, files=null}) {
        payload['cmd'] = cmd;
        payload['version'] = API_VERSION;

        const options = {
            host: HTTP_BASE_URL,
            port: getRandomInt(8123, 8130)
        };

        if (files) {
            for (let file_key in files) {
                payload[file_key] = files[file_key];
            }
        }

        const request = JSON.stringify(payload) + TERMINATOR;

        let need_login = (cmd !== 'login');

        const login_request_token = JSON.stringify({
            'cmd': 'login',
            'authtoken': payload['authtoken']
        }) + TERMINATOR;

        const login_request = JSON.stringify({
            'cmd': 'login',
            'username': payload['username'],
            'password': payload['password']
        }) + TERMINATOR;

        return new Promise(((resolve, reject) => {
            const socket = net.createConnection(options, () => {
                if (need_login && (payload['username'] === "authtoken")) {
                    socket.write(login_request_token, 'utf8');
                } else if (need_login && (payload['username'] !== "authtoken")) {
                    socket.write(login_request, 'utf8');
                } else {
                    socket.write(request, 'utf8');
                }
            });

            socket.on('error', (err) => {
                reject(err.message);
            });

            let data = '';
            socket.on('data', (chunk) => {
                data += chunk;
                if (data.includes(TERMINATOR)) {
                    if (need_login) {
                        need_login = false;
                        data = '';
                        socket.write(request, 'utf8');
                    } else {
                        socket.end();

                        let result = "";
                        try {
                            result = JSON.parse(data.trimRight(TERMINATOR));
                        } catch (err) {
                            reject('Invalid API response');
                        }
                        console.log(result)
                        if (result['error']) {
                            if (result['error'] === 'not-logged-in' || result['error'] === 'invalid-credentials') {
                                reject('Access denied, check your credentials');
                            } else if (result['error'] === 'banned') {
                                reject('Access denied, account is suspended');
                            } else if (result['error'] === 'insufficient-funds') {
                                reject('CAPTCHA was rejected due to low balance');
                            } else if (result['error'] === 'invalid-captcha') {
                                reject('CAPTCHA is not a valid image');
                            } else if (result['error'] === 'service-overload') {
                                reject('CAPTCHA was rejected due to service overload, try again later');
                            } else {
                                reject('API server error ocurred: ' + result['error']);
                            }
                        } else {
                            if (cmd === 'user') {
                                resolve(result['user'] ? result : {'user': 0});
                            } else if (cmd === 'upload') {
                                resolve(result['captcha'] ? result : null);
                            } else if (cmd.includes('report')) {
                                resolve(result['is_correct'] ? !result['is_correct'] : null);
                            } else {
                                resolve(result['captcha'] ? result : {'captcha': 0});
                            }
                        }
                    }
                }
            });
        }));


    };

    async get_user() {
        // Fetch user details -- ID, balance, rate and banned status.
        const params = {
            'cmd': 'user',
            'payload': this.userpwd,
        };
        return await this._call(params);
    };

    async get_captcha(cid) {
        // Fetch a captcha details -- ID, text and correctness flag.
        const params = {
            'cmd': 'captcha',
            'payload': {
                'captcha': cid
            }
        };
        return await this._call(params);
    };

    async report(cid) {
        // Report a captcha as incorrectly solved.
        let payload = this.userpwd;
        payload['captcha'] = cid;
        const params = {
            'cmd': 'report',
            'payload': payload
        };
        return await this._call(params);
    };

    async upload({captcha=null, extra={}}) {

        // Upload a CAPTCHA.

        // Accept file names and file-like objects. Return CAPTCHA details
        // JSON on success.

        const banner = (extra.banner ? extra.banner : null);
        let files = {};
        if (captcha) {
            files['captcha'] = load_image(captcha);
        }
        if (banner) {
            files['banner'] = load_image(banner);
        }
        let payload = this.userpwd;
        for (let entry in extra) {
            if (entry !== 'banner') {
                payload[entry] = extra[entry];
            }
        }
        const params = {
            'cmd': 'upload',
            'payload': payload,
            'files': files
        };
        return await this._call(params);
    };

}

module.exports = SocketClient;
