import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

const Page = ({ children, title, ...rest }: Props): JSX.Element => {
  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Page;
