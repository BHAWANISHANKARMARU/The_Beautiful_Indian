import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./Store/CartContext";
import { UserProgressContextProvider } from "./Store/UserProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Footer />
          <Cart/>
          <Checkout/>
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
