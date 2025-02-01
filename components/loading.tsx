"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Box from "./box";

const LoadingTemplate = ({}) => {
  return (
    <Box className="h-full flex items-center justify-center">
      <AiOutlineLoading3Quarters
        color="#2c55e"
        size={40}
        className="animate-spin origin-center"
      />
    </Box>
  );
};

export default LoadingTemplate;
