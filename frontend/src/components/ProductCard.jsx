import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  Flex,
  Button,
  Input,
  Popover,
  Portal,
  Stack,
  VStack,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Destructure product with default values to avoid undefined errors
  const { image = "", name = "Unnamed Product", price = 0 } = product || {};

  const { deleteProduct, updateProducts } = useProductStore();

  const { open, onOpen, onClose } = useDisclosure();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (success) {
      toast.success(message, { duration: 3000, isClosable: true });
    } else {
      toast.error(message, { duration: 3000, isClosable: true });
    }
  };

  const [updateProduct, setUpdateProduct] = useState(product);

  const handleUpdateProduct = async (pid, updateProduct) => {
    const { success, message } = await updateProducts(pid, updateProduct);

    if (success) {
      toast.success(message, { duration: 3000, isClosable: true });
      onClose();
    } else {
      toast.error(message, { duration: 3000, isClosable: true });
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      boxShadow="md"
      transition="all 0.3s ease-in-out"
      _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
    >
      <Image
        src={image}
        alt={name}
        fallbackSrc="https://via.placeholder.com/300"
        objectFit="cover"
        width="100%"
        height="200px"
      />

      <Box p={5}>
        <Heading as="h3" size="md" mb={2}>
          {name}
        </Heading>
        <Text color={textColor} fontSize="xl" fontWeight="bold">
          ${price.toFixed(2)} {/* Format price to 2 decimal places */}
        </Text>

        <HStack mt={4} spacing={4} justify="space-between">
          <Popover.Root isOpen={open} onClose={onClose}>
            <Popover.Trigger asChild>
              <IconButton aria-label="Edit product" colorPalette="blue">
                <FaRegEdit />
              </IconButton>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Header>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Heading size="sm">Update Product</Heading>

                      <Popover.CloseTrigger
                        asChild
                        borderWidth={"0.5px"}
                        borderColor={"gray.600"}
                        bg={"gray.800"}
                        _hover={{ bg: "gray.700" }}
                        rounded={"full"}
                      >
                        <CloseButton
                          size={"sm"}
                          color={"white"}
                          fontWeight={"bolder"}
                        />
                      </Popover.CloseTrigger>
                    </Flex>
                  </Popover.Header>
                  <Popover.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        value={updateProduct.name}
                        onChange={(e) =>
                          setUpdateProduct({
                            ...updateProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        value={updateProduct.price}
                        onChange={(e) =>
                          setUpdateProduct({
                            ...updateProduct,
                            price: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={updateProduct.image}
                        onChange={(e) =>
                          setUpdateProduct({
                            ...updateProduct,
                            image: e.target.value,
                          })
                        }
                      />
                      <Button
                        colorPalette="blue"
                        w="full"
                        onClick={() =>
                          handleUpdateProduct(product._id, updateProduct)
                        }
                      >
                        Update
                      </Button>
                    </VStack>
                  </Popover.Body>
                  <Popover.CloseTrigger />
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>

          <IconButton
            aria-label="Remove product"
            colorPalette="red"
            onClick={() => handleDelete(product._id)}
          >
            <MdOutlineRemoveShoppingCart />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

// Default props to handle undefined product
ProductCard.defaultProps = {
  product: {
    image: "",
    name: "Unnamed Product",
    price: 0,
  },
};

export default ProductCard;
