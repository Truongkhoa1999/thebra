// import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { ProductProps } from '../../type/ProductProps';

export default function ProductCard() {
  return (
    <Card sx={{ 
    width: {
      xs: 110, // Width for mobile devices
      sm: 150, // Width for desktop devices
      md: 160, // Width for large screens
    },
    maxWidth: '100%', 
    boxShadow: 'lg',
    // marginLeft: {
    //   xs: '1em',
    //   sm:'1.5em',
    //   md:'2em'
    // },
    marginBottom:{
      xs: '1em',
      sm:'1.5em',
      md:'2em'
    }
    }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 90 }}>
          <img
            src='https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x'
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
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}