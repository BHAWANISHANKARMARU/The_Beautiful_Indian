import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItems: () => {},
    removeItems: () => {},
    clearCart: () => {}  // ✅ Added in context shape
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEMS') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEMS') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        if (existingCartItemIndex === -1) return state;

        const existingItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        return { items: [] }; 
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    function addItems(item) {
        dispatch({ type: 'ADD_ITEMS', item });
    }

    function removeItems(id) {
        dispatch({ type: 'REMOVE_ITEMS', id });
    }

    function clearCart() {
        dispatch({ type: 'CLEAR_CART' }); 
    }

    const cartCtx = {
        items: state.items,
        addItems,
        removeItems,
        clearCart
    };

    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    );
}
