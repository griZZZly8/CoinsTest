import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bitgo: service('bitgo'),
    model(params) {
        return this.get('bitgo').wallets()
            .then(result => result.wallets.find(wallet => wallet.id === params.wallet_id))
            .catch(() => this.transitionTo('login'));
    },
    actions: {
        send(wallet, recipient, amount, passphrase) {
            this.get('bitgo').send(wallet, recipient, amount, passphrase)
                //.then(() => this.transitionTo('index'))
                .catch(err => {
                    this.controller.set('error', err);
                });
        }
    }
});
