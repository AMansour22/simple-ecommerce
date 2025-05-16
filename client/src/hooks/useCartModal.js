const useCartModal = ({ cartItems = [] }) => {
  const totalPrice = cartItems
    .reduce(
      (total, item) =>
        total + parseFloat(item.product?.prices[0]?.amount) * item.quantity,
      0
    )
    .toFixed(2);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    totalPrice,
    totalItems,
  };
};

export default useCartModal;
