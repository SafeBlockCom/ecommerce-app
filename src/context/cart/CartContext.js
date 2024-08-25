import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import { HELPER } from "../../utils";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [cartShipmentTotal, setCartShipmentTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");
  const [items, setItems] = useState([]);
  console.log("-- cartItems: ", cartItems);
  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0);
    console.log("Total: ", Total);
    const ShipmentTotal = cartItems.reduce((a, b) => {
      console.log("Accumulator:", a);
      console.log("Current Item:", b);
      console.log("Shipping Price:", b?.shipping_price);
      console.log("Shipping Cost:", b?.shipping_cost);

      const calculatedValue =
        a +
        (b?.shipping_price <= 0
          ? b?.shipping_price
          : b?.shipping_cost <= 0
          ? b?.shipping_cost
          : 0);

      console.log("Calculated Value:", calculatedValue);
      return calculatedValue;
    }, 0);

    console.log("ShipmentTotal: ", ShipmentTotal);
    setCartShipmentTotal(ShipmentTotal);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
    console.log("items: ", items, " cartItems: ", cartItems);

    // Process each item in the cartItems array and add it to the items state
    const newItems = [];

    cartItems.map((item) => {
      const sales_price = item.price * item.qty;
      const ship_price =
        item.shipping_price > 0
          ? item.shipping_price
          : item?.shipping_cost > 0
          ? item.shipping_cost
          : 0;
      newItems.push({
        id: item.handle,
        name: item.name,
        sku: item.handle,
        quantity: item.qty,
        price: item.price,
        discount: 0,
        sale_price: sales_price,
        shipping_price: ship_price,
        sub_total: sales_price + ship_price,
        image: item.image,
        short_description: item.short_description,
      });
    });
    // Update the state with the new items
    setItems([...newItems]);
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (item, quantity) => {
    toast.success("Product Added Successfully !");
    const index = cartItems.findIndex((itm) => itm?.id === item?.id);
    console.log("--addToCart--");
    console.log("cartItems: ", cartItems, " item: ", item);
    if (index !== -1) {
      const _price = item.price - item.discounted_price;
      const ship_price =
        item.shipping_price > 0
          ? item.shipping_price
          : item?.shipping_cost > 0
          ? item.shipping_cost
          : 0;
      cartItems[index] = {
        ...item,
        qty: quantity,
        total: _price * quantity + parseInt(ship_price),
      };
      setCartItems([...cartItems]);
    } else {
      const _price = item.price - item.discounted_price;
      const ship_price =
        item.shipping_price > 0
          ? item.shipping_price
          : item?.shipping_cost > 0
          ? item.shipping_cost
          : 0;
      const product = {
        ...item,
        qty: quantity,
        total: _price * quantity + parseInt(ship_price),
      };
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e) => e.id !== item.id));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item, itemSelectedVariant = {}) => {
    let allowedQty = item?.qty;
    if (HELPER.isNotEmpty(itemSelectedVariant)) {
      let selected_variant = HELPER.getSelectedVariant(item);
      allowedQty = selected_variant?.max_quantity;
    }
    if (allowedQty >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
      toast.error("Product is out of stock !");
      setStock("Out of stock !");
    }
  };

  const resetCart = () => {
    localStorage.removeItem("cartList");
    setCartItems([]);
    setCartTotal(0);
    setCartShipmentTotal(0);
    setQuantity(1);
    setStock("InStock");
    setItems([]);
  };

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id);
      if (index !== -1) {
        const _price = item.price - item.discounted_price;
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: _price * quantity,
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const _price = item.price - item.discounted_price;
        const product = {
          ...item,
          qty: quantity,
          total: _price * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        items,
        setItems,
        cartShipmentTotal,
        setCartShipmentTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
        resetCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
