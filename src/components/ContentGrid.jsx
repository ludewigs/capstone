import { Grid } from '@chakra-ui/react';

export default function ContentGrid(props) {
  return (
    <Grid
      templateColumns="repeat(12, minmax(0, 1fr))"
      columnGap="5"
      {...props}
    />
  );
}
