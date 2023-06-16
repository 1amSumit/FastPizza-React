import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();
  const increaseItem = () => {
    dispatch(cartActions.increaseItemQuantity(pizzaId));
  };
  const decreaseItem = () => {
    dispatch(cartActions.decreaseItemQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button onClick={decreaseItem} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button onClick={increaseItem} type={'round'}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
