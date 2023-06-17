import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

import Button from '../../UI/Button';
import Username from '../user/Username';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/redux';
import { cartActions, getTotalPrice } from '../../store/cartSlice';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../../store/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const CreateOrder = () => {
  const {
    status: addressStatus,
    position,
    address,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector(getTotalPrice);

  const isLoadingAddress = addressStatus === 'loading';

  const priorityValue = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityValue;

  if (cart.length < 0)
    return (
      <h2 className="mt-7 px-4 py-2 font-bold">
        Your cart is still empty start adding some pizzas!!
      </h2>
    );

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="px-6 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>Get Address</button>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={Username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span className="z-1000 absolute right-[3px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex  items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="address"
            value={
              position.latitude && position.longitude
                ? `${(position.latitude, position.longitude)}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order Now for  ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder;

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Pease provide your phone number we need it to contact with you.';
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(cartActions.clearCart());

  return redirect(`/order/${newOrder.id}`);
};
