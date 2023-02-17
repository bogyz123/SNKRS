import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const styles = {
        button: {
            background: 'green', color: 'white', fontFamily: 'Kanit', cursor: 'pointer', padding: '10px 20px', width: '100%'
        },
        form: {
            width: '25%',
            padding: '20px',
            marginInline: 'auto',
            background: '#ccc',
            color: 'white',
            borderRadius: '5px',
            marginTop: '1rem'
        }
    }

    const handlePay = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        if (error) {
            setError(true);
            setProcessing(false);
        }
        else {
            try {
                const res = await fetch('/payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: 1000, token: 'tok_visa' })
                });
                if (res.ok) {
                    setPaymentSuccess(true)
                }
                else {
                    setError(await res.text());
                }
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setProcessing(false);
            }
        }

    }
    return (
        <form onSubmit={handlePay} style={styles.form}>
            <CardElement />
            <button disabled={processing || !stripe} type='submit' style={styles.button}>Pay</button>
            {error && <p>{error}</p>}
            {paymentSuccess && <p>Successful!</p>}
        </form >
    )
}