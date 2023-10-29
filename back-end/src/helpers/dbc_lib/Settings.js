// API version and unique software ID
const API_VERSION = 'DBC/NodeJS v4.6';

// Base HTTP API url
const HTTP_BASE_URL = 'api.dbcapi.me';

// Preferred HTTP API server's response content type, do not change...!!!
const HTTP_RESPONSE_TYPE = 'application/json';

const TERMINATOR = '\r\n';

// Default CAPTCHA timeout and decode() polling interval
const DEFAULT_TIMEOUT = 60;
const DEFAULT_TOKEN_TIMEOUT = 120;
const POLLS_INTERVAL = [1, 1, 2, 3, 2, 2, 3, 2, 2];
const DFLT_POLL_INTERVAL = 3;

module.exports = {
    API_VERSION,
    HTTP_BASE_URL,
    HTTP_RESPONSE_TYPE,
    TERMINATOR,
    DEFAULT_TIMEOUT,
    DEFAULT_TOKEN_TIMEOUT,
    POLLS_INTERVAL,
    DFLT_POLL_INTERVAL
}