import Service from '@ember/service';

export default Service.extend({
    url: 'https://test.bitgo.com/api/v2/',
    toket: null,

    login(email, password) {
        return fetch(this.get('url') + 'user/login', {
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
                this.setToken(json.access_token);
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
        return fetch(this.get('url') + 'tbtc/wallet', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.getToken()
            }
        }).then(this.checkAuth).then(response => response.json());
    },

    send(wallet, recipient, amount, passphrase) {
        return fetch(this.get('url') + `${wallet.coin}/wallet/${wallet.id}/sendcoins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify({
                amount: amount,
                address: recipient,
                walletPassphrase: passphrase
            })
        }).then(this.checkAuth).then(response => response.json());
    },

    setToken(value) {
        localStorage.setItem('token', `Bearer ${value}`);
    },

    getToken() {
        return localStorage.getItem('token');
    }
});
