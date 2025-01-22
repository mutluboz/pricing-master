"use client";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  mockPriceList1,
  mockPriceList2,
  mockPriceList3,
  mockPriceList4,
} from "@/domain/__mocks__/price-list-mocks";
import { PriceList } from "@/domain/price-list-aggregate/PriceList";
import { formatCurrency } from "@/utils/formatters";
import { PriceListStatus } from "@/domain/price-list-aggregate/enums/PriceListStatus";

// Import icons
import ShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TimerIcon from "@mui/icons-material/Timer";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import WeightIcon from "@mui/icons-material/LineWeight";

const priceLists = [
  mockPriceList1,
  mockPriceList2,
  mockPriceList3,
  mockPriceList4,
];

function PriceListCard({ priceList }: { priceList: PriceList }) {
  // Get rates for each zone
  const zoneRatesMap = new Map(
    priceList.zones.map((zone) => {
      const zoneRates = priceList.rates.filter(
        (r) => r.zoneId.toString() === zone.zoneId.toString()
      );
      return [zone, zoneRates];
    })
  );

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{priceList.carrier.toString()}</Typography>
            <Chip
              size="small"
              label={priceList.status.toLowerCase()}
              color={
                priceList.status === PriceListStatus.ACTIVE
                  ? "success"
                  : "default"
              }
            />
          </Stack>
        }
        subheader={priceList.service.toString()}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "& .MuiCardHeader-subheader": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack spacing={2}>
          {/* Origin Country */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              sx={{ backgroundColor: "primary.light", color: "white" }}
            >
              <PlaceIcon fontSize="small" />
            </IconButton>
            <Typography>
              From: <strong>{priceList.originCountry}</strong>
            </Typography>
          </Box>

          {/* Zones and Rates */}
          {Array.from(zoneRatesMap.entries()).map(([zone, rates], index) => {
            const lowestRate = rates[0];
            const highestRate = rates[rates.length - 1];

            return (
              <Box key={index} sx={{ pl: 1 }}>
                <Stack spacing={1}>
                  {/* Zone Details */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "primary.light", color: "white" }}
                    >
                      <PublicIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle2">
                      Zone {zone.zoneId.toString()}:{" "}
                      {zone.destinationCountries.join(", ")}
                    </Typography>
                  </Box>

                  {/* Weight Range and Price */}
                  <Box sx={{ pl: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <WeightIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {lowestRate.weightRange.min}-
                          {highestRate.weightRange.max}kg
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {formatCurrency(
                          lowestRate.rate.amount,
                          priceList.currency.toString()
                        )}{" "}
                        -{" "}
                        {formatCurrency(
                          highestRate.rate.amount,
                          priceList.currency.toString()
                        )}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Transit Time */}
                  <Box
                    sx={{
                      pl: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TimerIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {zone.transitTime.min}-{zone.transitTime.max} days
                    </Typography>
                  </Box>
                </Stack>
                {index < zoneRatesMap.size - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            );
          })}

          <Divider />

          {/* Additional Info */}
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ backgroundColor: "primary.light", color: "white" }}
              >
                <WalletIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2">
                Default Margin: {priceList.defaultMargin.Value}%
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ backgroundColor: "primary.light", color: "white" }}
              >
                <CalendarIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2">
                Effective from: {priceList.effectiveDate.toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function PriceListPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box mb={6} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Shipping Price Lists
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Compare shipping rates across different carriers and services
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {priceLists.map((priceList, index) => (
          <Grid item xs={12} md={6} key={index}>
            <PriceListCard priceList={priceList} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
