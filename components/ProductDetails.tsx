"use client";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "@/models/product";
import agent from "@/utils/agent";
import Spinner from "@/components/Spinner";
import NotFound from "@/components/errors/NotFound";

interface ProductDetailsProp {
  id?: string; // Made optional to handle potential undefined cases
}

export default function ProductDetails({ id }: ProductDetailsProp) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    id &&
      agent.Store.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <Spinner message="Loading Product..." />;
  if (!product) return <NotFound />;

  // Render loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        color="error.main"
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  // Render product not found
  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6">No product found</Typography>
      </Box>
    );
  }

  // Helper Functions
  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);

  const extractImageName = (pictureURL: string | undefined): string =>
    pictureURL?.split("/").pop() || "placeholder.jpg";

  // Render product details
  return (
    <Grid container spacing={6}>
      {/* Product Image */}
      <Grid item xs={12} sm={6}>
        <img
          src={`/images/products/${extractImageName(product.pictureURL)}`}
          alt={`Image of ${product.name}`}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Grid>

      {/* Product Details */}
      <Grid item xs={12} sm={6}>
        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography gutterBottom color="secondary" variant="h4">
          {formatPrice(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Type</b>
                </TableCell>
                <TableCell>{product.producttype}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Brand</b>
                </TableCell>
                <TableCell>{product.productbrand}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
