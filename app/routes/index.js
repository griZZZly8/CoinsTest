import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bitgo: service('bitgo'),
    model() {
        return this.get('bitgo').wallets()
            .then(result => result.wallets)
            .catch(() => this.transitionTo('login'));
    }
});
