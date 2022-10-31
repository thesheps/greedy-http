import { css } from "https://unpkg.com/lit?module";
import styles from "./pico-bootstrap-grid.min.css" assert { type: "css" };

export default [
  styles,
  css`
    a {
      color: darkGray;
      text-decoration: none;
    }
    a:hover {
      color: white;
      text-decoration: none;
    }
    a:active {
      color: white;
      text-decoration: none;
    }
  `,
];
