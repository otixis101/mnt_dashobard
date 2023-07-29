// import React, { useEffect, useState } from "react";
// // import { ConfigService } from "@nestjs/config";
// import { loadStripe } from "@stripe/stripe-js";
// import { Stripe } from "@stripe/stripe-js";
// // import Stripe from "stripe";

// // Create a new React Context for the Stripe instance
// const StripeContext = React.createContext<Stripe | null>(null);

// // interface StripeType {
// //   customers: {
// //     create: (params: any) => Promise<any>;
// //     // Add other customer-related methods if needed
// //   };
// //   paymentIntents: {
// //     create: (params: any) => Promise<any>;
// //     // Add other paymentIntent-related methods if needed
// //   };
// //   // Add other properties or methods as required
// // }

// // Custom hook to access the Stripe instance
// const useStripe = () => {
//   const stripe = React.useContext(StripeContext);
//   // if (!stripe) {
//   //   throw new Error("useStripe must be used within a StripeProvider");
//   // }
//   return stripe;
// };
// // const configService = new ConfigService(); // Replace this with actual configuration service

// interface StripeProviderProps {
//   children: React.ReactNode;
// }

// const StripeProvider = ({ children }: StripeProviderProps) => {
//   const [stripe, setStripe] = useState<Stripe | null>(null);

//   useEffect(() => {
//     if (!stripe) {
//       const stripePromise = loadStripe(
//         "pk_test_51NYE5GDKy1VubulbN6ZqL8G6ldNAmpGluBDJ5WvJgYWP1V6N30TC55teoC0m9UvmUv60TOm74hGKb0r88572xqYO00XPGNRRtV"
//       );
//       stripePromise.then((stripeInstance) => setStripe(() => stripeInstance));
//     }
//   }, [stripe]);

//   return (
//     <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
//   );
// };

// // const StripeProvider = ({ children }: StripeProviderProps) => {
// //   const [stripe, setStripe] = useState<Stripe | null>(null);

// //   useEffect(() => {
// //     if (!stripe) {
// //       const stripeInstance = new Stripe(
// //         configService.get('STRIPE_PUBLIC_KEY') ||
// //           "pk_test_51NYE5GDKy1VubulbN6ZqL8G6ldNAmpGluBDJ5WvJgYWP1V6N30TC55teoC0m9UvmUv60TOm74hGKb0r88572xqYO00XPGNRRtV",
// //         {
// //           apiVersion: "2022-11-15",
// //         }
// //       );
// //       setStripe(stripeInstance);
// //     }
// //   }, [stripe, configService]);

// //   return (<StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>)
// // };

// const useStripeService = () => {
//   const stripe = useStripe();

//   const createCustomer = async (name: string, email: string) => {
//     return stripe.customers.create({
//       name,
//       email,
//     });
//   };

//   const charge = async (
//     amount: number,
//     paymentMethodId: string,
//     customerId: string
//   ) => {
//     return stripe.paymentIntents.create({
//       amount,
//       customer: customerId,
//       payment_method: paymentMethodId,
//       currency: 'usd', // Make sure to provide the correct currency
//       confirm: true,
//     });
//   };

//   return { createCustomer, charge };
// };

// export default useStripeService;
// export { StripeProvider };
