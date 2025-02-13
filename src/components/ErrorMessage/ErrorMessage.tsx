import React from "react";

type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }: Props) => {
  return <p>{message}</p>;
};

export default ErrorMessage;
