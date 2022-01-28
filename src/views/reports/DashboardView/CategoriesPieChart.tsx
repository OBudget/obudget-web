import clsx from "clsx";
import { styled } from "@mui/material/styles";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme,
} from "@mui/material";

const PREFIX = "CategoriesPieChart";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledCard = styled(Card)(() => ({
  [`&.${classes.root}`]: {
    height: "100%",
  },
}));

const CategoriesPieChart = ({ className, ...rest }: { className?: string }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [83, 44, 25, 22, 19, 15, 10],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.lime[600],
          colors.cyan[600],
          colors.deepPurple[600],
          colors.pink[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: [
      "Rent",
      "Food",
      "Car",
      "Utilities",
      "Vacation",
      "Fun Money",
      "Other",
    ],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <StyledCard className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Categories" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CategoriesPieChart;
