"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import agent from "@/utils/agent";
import { Add, Remove, Delete } from "@mui/icons-material";
import { BasketItem } from "@/models/basket";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Paper } from "@mui/material";

export default function Basket() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { Basket: BasketActions } = agent;

  const removeItem = (productId: number) => {
    BasketActions.removeItem(productId, dispatch);
  };

  const decrementItem = (productId: number, quantity: number = 1) => {
    BasketActions.decrementItemQuantity(productId, quantity, dispatch);
  };

  const incrementItem = (productId: number, quantity: number = 1) => {
    BasketActions.incrementItemQuantity(productId, quantity, dispatch);
  };

  // Define the extractImageName function
  const extractImageName = (item: BasketItem): string | null => {
    if (item && item.pictureUrl) {
      const parts = item.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
    return null;
  };

  // Function to format the price with TND currency symbol
  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("fr-TN", {
      style: "currency",
      currency: "TND",
      minimumFractionDigits: 2,
    }).format(price);

  if (!basket || basket.items.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ padding: 4 }}>
        Your basket is empty. Please add a few items!
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Image</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.pictureUrl && (
                  <img
                    src={"/images/products/" + extractImageName(item)}
                    alt={item.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => decrementItem(item.id)}
                  color="primary"
                  aria-label="decrease quantity"
                >
                  <Remove />
                </IconButton>
                {item.quantity}
                <IconButton
                  onClick={() => incrementItem(item.id)}
                  color="primary"
                  aria-label="increase quantity"
                >
                  <Add />
                </IconButton>
              </TableCell>
              <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeItem(item.id)}
                  color="secondary"
                  aria-label="remove item"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
