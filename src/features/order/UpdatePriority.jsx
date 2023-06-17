import Button from '../../UI/Button';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

const UpdatePriority = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>;
    </fetcher.Form>
  );
};

export default UpdatePriority;

export const action = async ({ params, request }) => {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
};
