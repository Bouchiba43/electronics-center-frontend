import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fade } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logOut } from "@/components/auth/accountSlice";
import Link from "next/link"; 

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account); // Get user data from state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ color: "white", typography: "h6" }}
        color="inherit"
      >
        Hi, {user?.username || "Guest"}
      </Button>
      <Menu 
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/basket" passHref>
            My Orders
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
