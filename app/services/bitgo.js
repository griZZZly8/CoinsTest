import Service from '@ember/service';

export default Service.extend({
    url: 'http://localhost:3080/api/v2/',
    toket: null,

    login(email, password) {
        return this._fetch('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                otp: '000000'
            })
        }).then(response => response.json()).then(json => {
            if (json.access_token) {
                this._setToken(json.access_token);
            } else {
                throw json.message;
            }
        });
    },

    checkAuth(response) {
        if (response.status === 401) {
            throw response.statusText;
        } else {
            return response;
        }
    },

    wallets() {
        return this._fetch('tbtc/wallet')
            .then(this.checkAuth)
            .then(response => response.json())
            .then(json => {
                json.wallets.forEach(wallet => {
                    wallet.balanceFormatted = wallet.balance / 1e8;
                });
                return json;
            });
    },

    send(wallet, recipient, amount, passphrase) {
        return this.unlock().then(() => {
            return this._fetch(`${wallet.coin}/wallet/${wallet.id}/sendcoins`, {
                method: 'POST',
                body: JSON.stringify({
                    amount: amount * 1e8,
                    address: recipient,
                    walletPassphrase: passphrase
                })
            }).then(response => response.json()).then(json => {
                return this.lock().then(() => {
                    if (json.error) {
                        throw json.message;
                    } else {
                        return json;
                    }
                });
            })
        });
    },

    unlock() {
        return this._fetch('user/unlock', {
            method: 'POST',
            body: JSON.stringify({
                otp: '000000'
            })
        });
    },

    lock() {
        return this._fetch('user/lock', {
            method: 'POST'
        });
    },

    _fetch(url, data) {
        const commonData = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this._getToken()
            }
        };

        return fetch(this.get('url') + url, Object.assign(commonData, data));
    },

    _setToken(value) {
        localStorage.setItem('token', `Bearer ${value}`);
    },

    _getToken() {
        return localStorage.getItem('token');
    }
});
