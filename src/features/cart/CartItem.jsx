import { cartActions } from '../../store/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;

  const deleteItem = (pizzaId) => {
    dispatch(cartActions.deleteItem(pizzaId));
  };

  return (
    <li className="sm: py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={pizzaId} />
      <DeleteItem pizzaId={pizzaId} />
    </li>
  );
}

export default CartItem;
