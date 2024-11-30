import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F5F6FA",
  border: "1px solid #D5D5D5",
  borderRadius: "50px",
  "&:hover": {
    backgroundColor: "#F5F6FA",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "black",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export const languages = [
  {
    code: "en",
    lang: "English",
  },
  {
    code: "fr",
    lang: "Français",
  },
  {
    code: "hi",
    lang: "हिंदी",
  },
];

export const BaseUrl = import.meta.env.VITE_API_URL;
