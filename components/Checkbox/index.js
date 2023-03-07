
import { Box, Checkbox, Text, Flex, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      {/* checkbox address */}
      {props.data.map((item, index) => {
        return (
          <>
            <Box my="10px" mx="10px" borderBottom="1px" key={index}>
              <Checkbox variant="circle">
                <Text>{item.address}</Text>
              </Checkbox>
            </Box>
          </>
        );
      })}
    </>
  );
}
