import React from "react";
import { useParams } from "react-router-dom";

import Form from "components/Form";

const Update = () => {
  const { id } = useParams();
  return <Form id={id} />;
};

export default Update;
