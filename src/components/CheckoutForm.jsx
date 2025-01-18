/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ offerId, price, propertyId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useContext(GlobalContext);
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });

    }, [axiosSecure, price]);


    const paymentAccept = useMutation({
        mutationFn: async ({ offerId, transactionId, propertyId }) => {
            return await axiosSecure.patch(`/offer-payment/${offerId}`, { transactionId: transactionId, propertyId: propertyId })
        },
        onSuccess: () => {
            toast.success('Payment successful');
            navigate('/dashboard/property-bought');
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('Payment error', error)
            setError(error.message);
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;
                paymentAccept.mutate({ offerId, transactionId, propertyId })
            }
        }

    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 bg-slate-200 p-2 rounded-lg max-w-md mx-auto">
            <p className="font-bold text-purple-500">Property price: {price}</p>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn p-2 bg-purple-400 w-full">Pay</button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckoutForm;