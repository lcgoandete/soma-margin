const FormData = require("form-data");
const fetch = require("node-fetch");
const Client = require("./BaseClient");
const {HTTP_BASE_URL, HTTP_RESPONSE_TYPE, API_VERSION} = require("./Settings");
const {load_image} = require("./Utils");

class HttpClient extends Client {

    // Death by Captcha HTTP API client.

    async _call({cmd, payload=null, headers={}, files=null}) {

        const options = {
            headers: {
                Accept: HTTP_RESPONSE_TYPE,
                Agent: API_VERSION
            }
        }
        if (payload) {
            let form = new FormData();

            for (let entry in payload) {
                form.append(entry, payload[entry]);
            }
            if (files) {
                for (let file_key in files) {
                    form.append(file_key, files[file_key]);
                }
            }
            options.body = form;
            options.method = "POST"
        }

        let response = await fetch(`http://${HTTP_BASE_URL}/api/${cmd}`, options);

        switch (response.status) {
            case 200:
            case 303:
                let data = await response.json();

                if (cmd === 'user'){
                    return data.user ? data : {user: 0}
                } else if (cmd === 'captcha') {
                    return data.captcha ? data : null;
                } else if (cmd.includes('report')) {
                    // cb(!result['is_correct']);
                }
                else {
                    return data.captcha ? data : {'captcha': 0};
                }

                break;
            case 400:
            case 413:
                throw new Error('CAPTCHA was rejected by the service, check if it\'s a valid image');
            case 403:
                throw new Error('Access denied, please check your credentials and/or balance');
            case 503:
                throw new Error('CAPTCHA was rejected due to service overload, try again later');
            default:
                throw new Error('Invalid API response');
        }
    };

    async get_user() {
        const params = {
            'cmd': 'user',
            'payload': this.userpwd,
        };
        return await this._call(params);
    };

    async get_captcha(cid) {
        // Fetch a captcha details -- ID, text and correctness flag.
        const params = {
            'cmd': 'captcha/' + cid,
        };
        return await this._call(params);
    }

    async report(cid) {
        // Report a captcha as incorrectly solved.
        const params = {
            'cmd': 'captcha/' + cid + '/report',
            'payload': this.userpwd,
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
            files['captchafile'] = 'base64:' + load_image(captcha);
        }
        if (banner) {
            files['banner'] = 'base64:' + load_image(banner);
        }
        let payload = this.userpwd;

        for (let entry in extra) {
            payload[entry] = extra[entry];
        }

        const params = {
            'cmd': 'captcha',
            'payload': payload,
            'files': files
        };

        return await this._call(params);
    };

}

module.exports = HttpClient;
