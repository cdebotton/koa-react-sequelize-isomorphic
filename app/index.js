import React from "react";
import ReactRouter from "react-router";
import routes from "./routes";
import {HistoryLocation} from "react-router";

ReactRouter.run(routes, HistoryLocation, (Handler, state) => {
  React.render(
    <Handler
      params={state.params}
      query={state.query} />,
    document
  );
});
