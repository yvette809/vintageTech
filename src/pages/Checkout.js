import React from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';

//react-stripe elements
import { CardElement, StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();

  //state values
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const isEmpty = !name || alert.show;

  const handleSubmit = async (e) => {
    showAlert({ msg: 'submittin order... please wait' });
    e.preventDefault();
    const response = await props.stripe.createToken().catch((error) => console.log(error));

    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });
      if (order) {
        showAlert({ msg: "Your order is complete" })
        clearCart()
        history.push("/")

      } else {
        showAlert({ msg: "there was an error with your order. Please try again!", type: 'danger' })
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  };

  if (cart.length < 1) return <EmptyCart />;
  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>
          order total: <span>${total}</span>
        </h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit</label>
          <p className="stripe-info">
            Test using this credit card: <span>4242 4242 4242 4242</span>
          </p>
          <br />
					enter any 5 digits for the zip code
					<br />
					enter any 3 digits for the cvc
				</div>
        {/* end of card element */}
        {/* Stripe Elements */}
        <CardElement className="card-element"></CardElement>
        {/* Stripe erros */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">Please fill out name field</p>
        ) : (
          <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block"></button>
        )}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51Hvi2TIdSsuQw9akzUMDVCPNQJF6QX4Y3qVvKOVzjKvEGuCmOma8kPhNtLM4MOMkyWSxy1BsoPQIymg3Ye9JZV7v00LniYF2iN">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
