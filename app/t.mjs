import WDK, { PolicyViolationError } from '@tetherto/wdk';
import WalletManagerEvm from '@tetherto/wdk-wallet-evm';
const wdk = new WDK(WDK.getRandomSeedPhrase(12));
wdk.registerWallet('ethereum', WalletManagerEvm, {});
wdk.registerPolicy([{
  id: 'caja', name: 'Reglas de la caja', scope: 'project', wallet: 'ethereum',
  rules: [
    { name: 'tope-por-operacion', operation: 'transfer', action: 'DENY',
      reason: 'Supera el tope por operación',
      conditions: [ (ctx) => { console.log('   ctx keys:', Object.keys(ctx)); console.log('   ctx:', JSON.stringify(ctx.params ?? ctx).slice(0,300)); return true; } ] },
  ],
}]);
const a = await wdk.getAccount('ethereum', 0);
console.log('address:', await a.getAddress());
try {
  await a.transfer({ token: '0x'+'11'.repeat(20), recipient: '0x'+'22'.repeat(20), amount: 1n });
  console.log('NO bloqueó');
} catch (e) {
  console.log('tipo:', e.constructor.name);
  console.log('esPolicyViolation:', e instanceof PolicyViolationError);
  console.log('rule:', e.ruleName, '| reason:', e.reason, '| msg:', e.message);
}
