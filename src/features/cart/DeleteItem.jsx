import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const DeleteItem = ({ pizzaId}) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(cartActions.deleteItem(pizzaId))}
      type="small"
    >
      Delete
    </Button>
  );
};

export default DeleteItem;
