import { useState } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const PREFIX = "LatestProducts";

const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
};

const StyledCard = styled(Card)({
  [`&.${classes.root}`]: {
    height: "100%",
  },
  [`& .${classes.image}`]: {
    height: 48,
    width: 48,
  },
});

const data = [
  {
    id: "id-1",
    name: "Dropbox",
    imageUrl: "/static/images/products/product_1.png",
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: "id-2",
    name: "Medium Corporation",
    imageUrl: "/static/images/products/product_2.png",
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: "id-3",
    name: "Slack",
    imageUrl: "/static/images/products/product_3.png",
    updatedAt: moment().subtract(3, "hours"),
  },
  {
    id: "id-4",
    name: "Lyft",
    imageUrl: "/static/images/products/product_4.png",
    updatedAt: moment().subtract(5, "hours"),
  },
  {
    id: "id-5",
    name: "GitHub",
    imageUrl: "/static/images/products/product_5.png",
    updatedAt: moment().subtract(9, "hours"),
  },
];

const LatestProducts = ({ className, ...rest }: { className?: string }) => {
  const [products] = useState(data);

  return (
    <StyledCard className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </StyledCard>
  );
};

export default LatestProducts;
