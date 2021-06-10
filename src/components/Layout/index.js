import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./elements";

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};
