import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bitgo: service('bitgo'),
    actions: {
        login(login, password) {
            this.get('bitgo').login(login, password)
                .then(() => this.transitionTo('index'))
                .catch(err => {
                    this.controller.set('error', err);
                });
        }
    }
});
