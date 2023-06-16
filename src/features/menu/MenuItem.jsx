import Button from '../../UI/Button';
import { formatCurrency } from '../../utils/helpers';
import { cartActions } from '../../store/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import { getCurrentPizzaQuantity } from '../../store/cartSlice';

import { useDispatch, useSelector } from 'react-redux';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

const MenuItem = ({ pizza }) => {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentPizzaQuantity = useSelector(getCurrentPizzaQuantity(id));
  const isInCart = currentPizzaQuantity > 0;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice * 1,
      })
    );
  };

  return (
    <li className=" p flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className=" flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="item-center flex gap-3 md:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentPizzaQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={addToCart} type="small">
              Add To cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
