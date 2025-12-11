import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Likes from "./pages/Likes/Likes";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Layout from "./shared/layout/layout";
import Notfound from "./pages/notfound/notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import { users as initialUsers } from "./data/users.js";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [cart, setCart] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [productLikes, setProductLikes] = useState({});

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (storedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(storedRecentlyViewed));
    }
    const storedLikes = localStorage.getItem('productLikes');
    if (storedLikes) {
      setProductLikes(JSON.parse(storedLikes));
    }
  }, []);

  const register = (email, password, name) => {
    const newUser = { email, password, name };
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      setUser(storedUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const skipAuth = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleLike = (productId) => {
    setProductLikes(prev => {
      const newLikes = { ...prev };
      newLikes[productId] = !newLikes[productId];
      localStorage.setItem('productLikes', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed(prev => {
      const newViewed = [productId, ...prev.filter(id => id !== productId)].slice(0, 5);
      localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
      return newViewed;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const authProps = { user, isAuthenticated, register, login, logout, skipAuth };
  const cartProps = { cart, addToCart, removeFromCart, updateQuantity, getTotal };
  const productProps = { recentlyViewed, productLikes, toggleLike, addToRecentlyViewed };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <Home {...authProps} recentlyViewed={recentlyViewed} />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <About />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <Products {...cartProps} {...productProps} cart={cart} />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <ProductDetails {...cartProps} {...productProps} cart={cart} />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/likes"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <Likes productLikes={productLikes} recentlyViewed={recentlyViewed} />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <Profile user={user} updateUser={updateUser} />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout cart={cart} isAuthenticated={isAuthenticated} logout={logout}>
            <ProtectedRoute isAuthenticated={isAuthenticated} {...authProps}>
              <Cart {...cartProps} />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/*"
        element={
            <Notfound />
        }
      />
    </Routes>
  );
}

export default App;
