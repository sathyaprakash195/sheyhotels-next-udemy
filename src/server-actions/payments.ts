'use server'
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GetStripeClientSecretKey = async ({
  amount,
}: {
  amount: number;
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "SheyHotels - Room Booking Payment",
    });

    return {
      success: true,
      data: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
