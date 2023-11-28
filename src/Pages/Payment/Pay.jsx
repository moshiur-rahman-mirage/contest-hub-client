import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';




const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PK)
const Pay = () => {
    return (
        <div>
                BECOME VIP
                <Elements stripe={stripePromise}>
                    <PaymentForm/>
                </Elements>
        </div>
    );
};

export default Pay;