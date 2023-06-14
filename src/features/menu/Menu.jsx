import { getMenu } from '../../services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

const Menu = () => {
  const menu = useLoaderData();

  return (
    <ul className="px- divide-stone-2002 divide-y">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
