// "use client";

// import { Product } from "@/models/product";
// import ProductList from "@/components/ProductList";
// import { Box, FormControl, FormControlLabel, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
// import { Brand } from "@/models/brand";
// import { Type } from "@/models/type";

// const sortOptions = [
//   { value: "asc", label: "Ascending" },
//   { value: "desc", label: "Descending" }
// ];

// export default function Catalog({
//   products,
//   loading,
//   brands,
//   types,
//   selectedSort,
//   selectedBrandId,
//   selectedTypeId,
//   searchTerm,
//   totalItems,
//   currentPage,
//   onSortChange,
//   onBrandChange,
//   onTypeChange,
//   onSearchChange,
//   onPageChange
// }: {
//   products: Product[];
//   loading: boolean;
//   brands: Brand[];
//   types: Type[];
//   selectedSort: string;
//   selectedBrandId: number;
//   selectedTypeId: number;
//   searchTerm: string;
//   totalItems: number;
//   currentPage: number;
//   onSortChange: (selectedSort: string) => void;
//   onBrandChange: (selectedBrandId: number) => void;
//   onTypeChange: (selectedTypeId: number) => void;
//   onSearchChange: (searchTerm: string) => void;
//   onPageChange: (page: number) => void;
// }) {
//   if (loading) return <h3>Loading...</h3>;
//   if (!products) return <h3>Unable to load Products</h3>;

//   return (
//     <Grid container spacing={4}>
//       <Grid item xs={12}>
//         <Box mb={2} textAlign="center">
//           <Typography variant="subtitle1">
//             Displaying {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)} of {totalItems} items
//           </Typography>
//         </Box>
//         <Box mt={4} display="flex" justifyContent="center">
//           <Pagination
//             count={Math.ceil(totalItems / 10)}
//             color="primary"
//             onChange={(event, page) => onPageChange(page)}
//             page={currentPage}
//           />
//         </Box>
//       </Grid>
//       <Grid item xs={3}>
//         <Paper sx={{ mb: 2 }}>
//           <TextField
//             label="Search products"
//             variant="outlined"
//             fullWidth
//             value={searchTerm}
//             onChange={(e) => onSearchChange(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 onSearchChange(searchTerm);
//               }
//             }}
//           />
//         </Paper>
//         <Paper sx={{ mb: 2, p: 2 }}>
//           <FormControl>
//             <FormLabel id="sort-by-name-label">Sort by Name</FormLabel>
//             <RadioGroup
//               aria-label="sort-by-name"
//               name="sort-by-name"
//               value={selectedSort}
//               onChange={(e) => onSortChange(e.target.value)}
//             >
//               {sortOptions.map(({ value, label }) => (
//                 <FormControlLabel
//                   key={value}
//                   value={value}
//                   control={<Radio />}
//                   label={label}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Paper>
//         <Paper sx={{ mb: 2, p: 2 }}>
//           <FormControl>
//             <FormLabel id="brands-label">Brands</FormLabel>
//             <RadioGroup
//               aria-label="brands"
//               name="brands"
//               value={selectedBrandId}
//               onChange={(e) => onBrandChange(Number(e.target.value))}
//             >
//               {brands.map((brand) => (
//                 <FormControlLabel
//                   key={brand.id}
//                   value={brand.id.toString()}
//                   control={<Radio />}
//                   label={brand.name}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Paper>
//         <Paper sx={{ mb: 2, p: 2 }}>
//           <FormControl>
//             <FormLabel id="types-label">Types</FormLabel>
//             <RadioGroup
//               aria-label="types"
//               name="types"
//               value={selectedTypeId}
//               onChange={(e) => onTypeChange(Number(e.target.value))}
//             >
//               {types.map((type) => (
//                 <FormControlLabel
//                   key={type.id}
//                   value={type.id.toString()}
//                   control={<Radio />}
//                   label={type.name}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Paper>
//       </Grid>
//       <Grid item xs={9}>
//         <ProductList products={products} />
//       </Grid>
//       <Grid item xs={12}>
//         <Box mt={4} display="flex" justifyContent="center">
//           <Pagination
//             count={Math.ceil(totalItems / 10)}
//             color="primary"
//             onChange={(event, page) => onPageChange(page)}
//             page={currentPage}
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }
