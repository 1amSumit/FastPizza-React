import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  console.log(navigation);
  return (
    <div className="layout">
      <Header />
      {isLoading && <Loader />}
      <Outlet />
      <CartOverview />
    </div>
  );
};

export default AppLayout;
