import { NavLink } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  return (
    <header>
      <NavLink to="/">Fast React Pizza Co.</NavLink>
      <SearchOrder />
    </header>
  );
};

export default Header;
