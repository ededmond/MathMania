import React from "react";
import { PromiseProvider } from "mongoose";

export const Row = ({ fluid, children , id }) => (
  <div className={`row${fluid ? "-fluid" : ""}`} id = {id || ""}>
    {children}
  </div>
);
