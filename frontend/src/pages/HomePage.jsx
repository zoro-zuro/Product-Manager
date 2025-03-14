import React, { useEffect } from "react";
import { Container, Text, VStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching data from store:", error);
      }
    };
    fetchData();
  }, [fetchProducts]);

  if (!products) {
    return (
      <Container maxW="container-xl" py={12}>
        <VStack spacing={8}>
          <Spinner size="xl" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container-xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"cyan.400"}
          mb={8}
        >
          Current Products 🚀
        </Text>
        {Array.isArray(products) && products.length > 0 ? (
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
              lg: 3,
            }}
            gap={"20px"}
            w={"1060px"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Products Found 😔
            <Link to={"/create"}>
              <Text
                as="span"
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
