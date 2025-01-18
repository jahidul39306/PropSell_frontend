import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation, useParams } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
    const {offerId} = useParams();
    const location = useLocation();
    const price = location.state?.price;
    const propertyId = location.state?.propertyId;


    return (
        <div className="px-5 py-5">
            <Elements stripe={stripePromise}>
                <CheckoutForm offerId={offerId} price={price} propertyId={propertyId}/>
            </Elements>
        </div>
    );
};

export default PaymentPage;