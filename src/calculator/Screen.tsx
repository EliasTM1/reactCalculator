import { Box } from "@chakra-ui/react";

type ScreenProps = {
  displayedValue: number | string
}

export const Screen = ({displayedValue}: ScreenProps) => {
	return (
		<Box fontSize='50px' width='300px' border='solid black 3px' textAlign="right">
			{displayedValue ?? 0}
		</Box>
	);
};
