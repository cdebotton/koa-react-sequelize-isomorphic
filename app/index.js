import React from "react";
import ReactRouter from "react-router";
import router from "./router";

router.run((Handler, state) => {
  React.render(<Handler {...state} />, document);
});
