// import * as React from 'react';
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

export default function ProductCard({ className }: { className?: string }) {
  return (
    <Card
      className={className}
      sx={{
        width: {
          xs: 100, // Width for mobile devices
          sm: 150, // Width for desktop devices
          md: 160, // Width for large screens
        },
        height: {
          xs: 250, // Width for mobile devices
          sm: 150, // Width for desktop devices
          md: 160, // Width for large screens
        },
        maxWidth: "60%",
        boxShadow: "lg",
        marginBottom: {
          xs: "1em",
          sm: "1.5em",
          md: "2em",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ maxWidth: 80 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body3">Bluetooth Headset</Typography>
        <Typography fontWeight="xl">Super Rockez A400</Typography>

        <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
          2,900 THB
        </Typography>
        <Typography level="body2">
          (Only <b>7</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" sx={{backgroundColor: "brown"}} size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
