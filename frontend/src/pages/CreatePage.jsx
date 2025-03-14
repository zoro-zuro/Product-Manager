import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useProductStore } from "../store/product.js";
import toast from "react-hot-toast";
import { useColorModeValue } from "../components/ui/color-mode.jsx";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProducts } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);
    console.log("success :", success);
    console.log("message: ", message);

    if (success) {
      toast.success(message, { duration: 3000, isClosable: true });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(message, { duration: 3000, isClosable: true });
    }
  };

  return (
    <Container maxW={"fit-content"}>
      <VStack spacing={8} width={"480px"}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              borderColor={"gray.300"}
              borderWidth={"1px"}
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              borderColor={"gray.300"}
              borderWidth={"1px"}
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
              placeholder="Product Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              borderColor={"gray.300"}
              borderWidth={"1px"}
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              bgColor={"blue.400"}
              onClick={handleAddProduct}
              w={"full"}
              fontSize={"md"}
              fontWeight={"bold"}
              fontFamily={"mono"}
              color={"whiteAlpha.800"}
              _hover={{ bgColor: "blue.500" }}
            >
              ADD PRODUCT
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
