import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | wallet-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render label and balance', async function(assert) {
    this.set('wallet', {
      label: 'test',
      balance: 42
    });
    
    await render(hbs`
      {{wallet-info wallet=wallet}}
    `);

    assert.equal(this.element.textContent.trim(), 'test 42 TBTC');
  });
});
