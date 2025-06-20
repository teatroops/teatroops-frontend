import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const addToCart = async (itemId, size, quantity = 1) => {
        // If size not provided, fetch from product
        if (!size) {
            const product = products.find(p => p._id === itemId);
            if (product && typeof product.size === 'string' && product.size) {
                size = product.size;
            }
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += quantity;
            }
            else {
                cartData[itemId][size] = quantity;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        let priceValue = typeof itemInfo.price === 'object' ? (itemInfo.price.offer ?? itemInfo.price.mrp) : itemInfo.price;
                        totalAmount += priceValue * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    // Persist cartItems in localStorage for guests
    useEffect(() => {
        if (!token) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, token]);

    useEffect(() => {
        const fetchUserProfile = async (tok) => {
            try {
                const res = await axios.get(backendUrl + '/api/user/profile', { headers: { token: tok } });
                if (res.data.success) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            }
        };
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            fetchUserProfile(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
            fetchUserProfile(token)
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, user, setUser
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;