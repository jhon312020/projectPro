// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   backend: "http://127.0.0.1:8000/",
//   // backend: "http://192.168.101.4:8000/",
//   // "secure": false,
//   // backend: "http://stage.codecygnus.com/ProjectPro/backend/public",
//   apptoken: "sampleSketch2401*9003954!_valid",
//   address: "#165, 8th Cross, CIL Layout, RT Nagar PO, <br/> Bangalore-560032",
//   email: "info@inditechsoft.com",
//   mobile_number: "+91 82176 13476",
//   open_hours: "Mon-Fri: 10:00 AM - 5:00 PM",
//   admin_dashboard: "/admin/",
//   // payee_VPA: "jhon.312020@okicici",
//   payee_VPA: "muthuramg1980@sbi",
//   business_name: "Janakiraman",
//   company_name: "IndiTech Software Training and Solutions",
//   currency: "INR",
//   best_wishes: "Best wishes from IndiTechSoft!!!",
//   recaptcha: {
//     site_key: '6LdaIcgnAAAAAMxYWL55wSIBlqn5F6Ft33rF0qlp',
//     secret_key: '6LcTMcMnAAAAAGMgeQ2p56FnxpS243Sbsjnd8L5-'
//   }
// };

export const environment = {
  production: true,
  backend: "http://stage.codecygnus.com/ProjectPro/backend/public/",
  // backend: "http://127.0.0.1:8000/",
  apptoken: "sampleSketch2401*9003954!_valid",
  address: "#165, 8th Cross, CIL Layout, RT Nagar PO, <br/> Bangalore-560032",
  email: "info@inditechsoft.com",
  mobile_number: "+91 82176 13476",
  open_hours: "Mon-Fri: 10:00 AM - 5:00 PM",
  admin_dashboard: "/admin/",
  payee_VPA: "muthuramg1980@sbi",
  business_name: "IndiTechSoft",
  company_name: "IndiTech Software Training and Solutions",
  currency: "INR",
  best_wishes: "Best wishes from IndiTechSoft!!!",
  recaptcha: {
    site_key: '6LdaIcgnAAAAAMxYWL55wSIBlqn5F6Ft33rF0qlp',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// upi://pay?pa=&pn=&am=&cu=&tn=

// where:
// pa = Payee address or business virtual payment address (VPA).
// pn = Payee name or business name.
// am = Transaction amount.
// cu = Currency Code.
// tn = Transaction note.
