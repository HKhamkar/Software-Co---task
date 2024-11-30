import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { MdLanguage } from "react-icons/md";
import { languages } from "../../helper/constant";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleMenuClose();
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <>
      <Tooltip title="Language" placement="bottom">
        <IconButton
          aria-label="more"
          id="long-button"
          sx={{ p: 0 }}
          onClick={handleMenuOpen}
        >
          <MdLanguage color="#7B7B7D" />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.code} onClick={() => changeLanguage(lng.code)}>
            {lng.lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
