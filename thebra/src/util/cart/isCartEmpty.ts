export const isCartEmpty = (): boolean => {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const cartLength = cart.length;
    return cartLength === 0; // Return true if the cart is empty (length is 0), otherwise return false
  };
  