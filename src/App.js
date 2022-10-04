import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculateTotals, getCartItems } from './features/cart/cartSlice'
import { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./components/Modal";
function App() {
  const { isOpen } = useSelector(state => state.modal)
  const { cartItems, isLoading } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])
  useEffect(() => {
    dispatch(getCartItems("Majd"));
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
