import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import "../src/styles/App.css";
import Cart from './components/Cart';
import CartPage from './components/CartPage';
import Contact from './components/Contact';
import EditUser from './components/EditUser';
import FemaleProducts from './components/FemaleProducts';
import { db } from './components/fire';
import Homepage from './components/Homepage';
import LoggedOnly from './components/LoggedOnly';
import LoginPage from './components/LoginPage';
import MaleProducts from './components/MaleProducts';
import Products from './components/Products';
import { setAllProducts } from './components/redux/ProductSlice';
import { setIsLoggedIn, setUserDetails } from './components/redux/UserSlice';



function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.ProductSlice.selectedProducts);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
        getDoc(doc(db, `/users/${user.uid}`)).then((res) => {
          dispatch(setUserDetails(res.data()));
          getDocs(collection(db, "products")).then((docs) => {
            dispatch(setAllProducts(docs.docs.map((doc) => ({ ...doc.data() }))));
          });
        });
      }
      else {
        dispatch(setIsLoggedIn(false));
      }
    });

  }, []);


  return (


    <HashRouter className='App'>


      {selectedProducts.length > 0 && <Cart products={selectedProducts} />}

      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<>Page not found.</>} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/edit-account' element={<LoggedOnly><EditUser /></LoggedOnly>} />
        <Route path='/products' element={<Products />}>
          <Route path='male' element={<MaleProducts />} />
          <Route path='female' element={<FemaleProducts />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
      </Routes>

    </HashRouter>

  )
}

export default App
