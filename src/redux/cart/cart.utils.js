export const addItemToCart = (cartItems, cartItemsToAdd) => {
    const existingCartItems = cartItems.find(
        cartItem => cartItem.id === cartItemsToAdd.id
        );

    if(existingCartItems) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemsToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }

    return [...cartItems, {...cartItemsToAdd, quantity: 1}]
};

export const removeItemFromCart = (cartItems, cartItemsToRemove) => {
    const existingCartItems = cartItems.find(
        cartItem => cartItem.id === cartItemsToRemove.id
        );
    if(existingCartItems.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemsToRemove.id)
    }

    return cartItems.map(cartItem => 
        cartItem.id === cartItemsToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
}