import * as paypal from '@paypal/checkout-server-sdk'

 
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET_KEY_1,

  );
  const client = new paypal.core.PayPalHttpClient(environment);

  export default client;

  // bussiness
  //sb-jv1ij33092093@business.example.com
  //qK8=F7:c
  //cliente
  //sb-hx0kz28561924@personal.example.com
  //n<a>7yRC