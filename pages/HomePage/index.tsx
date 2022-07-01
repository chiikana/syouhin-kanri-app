import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Text,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "framer-motion";
import Layout from "../../component/layout";

type FormData = {
  id: string;
  name: string;
  stock: string;
  bought: string;
  selling: string;
};

export const HomePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitted,
      isSubmitting,
      touchedFields,
      submitCount,
    },
  } = useForm<FormData>({
    mode: "all",
    // reValidateMode: "onChange",
    // defaultValues: {
    //   id: "0",
    //   name: "",
    //   stock: "0",
    //   bought: "0",
    //   selling: "0",
    // },
  });
  // フォーム送信ボタンを押された時の処理
  const onsubmit = (data: FormData) => {
    console.log(data);
    reset(); // フォームに入力した値をリセット
  };
  // nameを監視
  // 入力のたびに更新される
  console.log(watch("id"));
  console.log(watch("name"));
  console.log(watch("stock"));
  console.log(watch("bought"));
  console.log(watch("selling"));
  const toast = useToast();
  const { isOpen: isAlert, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout>
        <VStack h={"100vh"} w={"100%"}>
          <Heading pt={"10"} pb={"10"}>
            HOME
          </Heading>
          <VStack spacing={"5px"} w={"100%"}>
            <form>
              <FormControl w={"100%"}>
                <FormLabel>id</FormLabel>
                <Input
                  size={"lg"}
                  textAlign={"left"}
                  variant="outline"
                  placeholder="idを入力"
                  type="text"
                  {...register("id", {
                    required: true,
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: "数字を入力してください。",
                    },
                  })}
                ></Input>
                <ErrorMessage
                  errors={errors}
                  name="id"
                  render={({ message }) => (
                    <Text color={"red.400"}>{message}</Text>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>name</FormLabel>
                <Input
                  size={"lg"}
                  textAlign={"left"}
                  variant="outline"
                  placeholder="商品名を入力"
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                ></Input>
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <Text color={"red.400"}>{message}</Text>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>stock</FormLabel>
                <InputGroup size={"lg"}>
                  <Input
                    _after={{ content: `"個"` }}
                    textAlign={"left"}
                    variant="outline"
                    placeholder="在庫数を入力"
                    type="text"
                    {...register("stock", {
                      required: true,
                      pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "数字を入力してください。",
                      },
                    })}
                  ></Input>
                  <InputRightAddon>個</InputRightAddon>
                </InputGroup>
                <ErrorMessage
                  errors={errors}
                  name="stock"
                  render={({ message }) => (
                    <Text color={"red.400"}>{message}</Text>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>bought</FormLabel>
                <InputGroup size={"lg"}>
                  <Input
                    size={"lg"}
                    textAlign={"left"}
                    variant="outline"
                    placeholder="仕入れ金額を入力"
                    type="text"
                    {...register("bought", {
                      required: true,
                      pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "数字を入力してください。",
                      },
                    })}
                  ></Input>
                  <InputRightAddon>円</InputRightAddon>
                </InputGroup>
                <ErrorMessage
                  errors={errors}
                  name="bought"
                  render={({ message }) => (
                    <Text color={"red.400"}>{message}</Text>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>selling</FormLabel>
                <InputGroup size={"lg"}>
                  <Input
                    size={"lg"}
                    textAlign={"left"}
                    variant="outline"
                    placeholder="販売金額を入力"
                    type="text"
                    {...register("selling", {
                      required: true,
                      pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "数字を入力してください。",
                      },
                    })}
                  ></Input>
                  <InputRightAddon>円</InputRightAddon>
                </InputGroup>
                <ErrorMessage
                  errors={errors}
                  name="selling"
                  render={({ message }) => (
                    <Text color={"red.400"}>{message}</Text>
                  )}
                />
              </FormControl>
              <HStack mt={"5"} mb={12}>
                <Spacer></Spacer>
                <Button
                  // type="submit"

                  disabled={!isValid}
                  isLoading={isSubmitting}
                  onClick={() => {
                    toast({
                      title: "送信完了しました。",
                      status: "success",
                      position: "bottom",
                      isClosable: true,
                    });
                  }}
                >
                  追加
                </Button>
              </HStack>
            </form>
            <>
              {isAlert ? (
                // <Alert status="success"

                // >
                //   <AlertIcon />
                //   送信成功
                //   <CloseButton onClick={onClose} />
                // </Alert>
                <motion.div>
                  <Alert status="success">
                    <AlertIcon />
                    送信成功
                    <CloseButton onClick={onClose} />
                  </Alert>
                </motion.div>
              ) : (
                <Button onClick={onOpen}></Button>
              )}
            </>
          </VStack>
        </VStack>
      </Layout>
    </>
  );
};
export default HomePage;
