import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducer/cartReducer";


const initialState ={
    cartList : [],
    total:0,
}

const CartContext = createContext(initialState);

export const CartProvider= ({children})=>
{
    const [state, dispatch] = useReducer(cartReducer, initialState) ; //state : CartList,total..etc dispatch: like set state with more power. 

    const addToCart= (product)=>
    {
       const updatedCartList = state.cartList.concat(product); //appends the clicked product object in the cartlist.
       updateTotal(updatedCartList);
       console.log(updatedCartList)
       dispatch({
        type:"ADD_TO_CART",
        payload:{
            products:updatedCartList ,
        },
       })

    }
    
    const removeFromCart= (product)=>
    {
        const updatedCartList = state.cartList.filter((current) => current.id !== product.id ) //if we use === this will filter the products except the id we are looking for so we need to use !== to choose that product alone .
        updateTotal(updatedCartList);
        dispatch ({
           type : "REMOVE_FROM_CART",
           payload : {
            products : updatedCartList,
           }
        })

    }

    const updateTotal = (products)=>
    {
        let total=0;
        products.forEach( (product)=> total = total+ product.price);
        dispatch({
            type:"UPDATE_TOTAL",
            payload:{
                total:total
            }
        })

    }




    const value={
        total: state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart,

    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart =()=>
{
    const context = useContext(CartContext);
    return context;

}
