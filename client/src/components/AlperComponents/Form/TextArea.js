import React from "react";

export const TextArea = props => (
  <div className="form-group">
    <textarea style={{margin: 15}} className="form-control" rows="20" {...props} />
  </div>
);
