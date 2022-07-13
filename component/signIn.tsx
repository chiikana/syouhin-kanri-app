import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  VStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalBody,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { SmallCloseIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  AppContext,
  ChoiceSosialContext,
  UserNameContext,
} from "../pages/_app";

import { app } from "../src/utils/firebase/init";
// import { useAuthContext } from "../src/context/AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useAuthContext } from "../src/hooks/context/AuthContext";

export const EmailProvider = () => {
  // const { user } = useAuthContext();
  const auth = getAuth(app);
  // const isLoggedIn = !!user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/HomePage/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleClose = async () => {
    await router.push("/");
  };

  const { isSign, onSign } = useContext(AppContext);
  type FormSign = {
    Uname: string;
    Email: string;
    Upass: string;
  };

  const {
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormSign>({
    mode: "all",
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isChoice, onChoice } = useContext(ChoiceSosialContext);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toggleNavHoverColor = useColorModeValue("teal.50", "teal.900");
  const navAccentColor = "teal.400";
  const navAccentHoverColor = "teal.300";
  return (
    <Center>
      <VStack overflowX="auto" overflowY="auto">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Adress</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              {...register("Email", {
                required: true,
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                  message: "E-mailの書式ではありません。",
                },
              })}
              onChange={handleChangeEmail}
            />
            <ErrorMessage
              errors={errors}
              name="Uname"
              render={({ message }) => <Text color={"red.400"}>{message}</Text>}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              {...register("Upass", {
                required: true,
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,32}$/i,
                  message: "半角英数字8文字以上32文字以下のパスワードを入力",
                },
              })}
              onChange={handleChangePassword}
            />
            <ErrorMessage
              errors={errors}
              name="Upass"
              render={({ message }) => <Text color={"red.400"}>{message}</Text>}
            />
          </FormControl>
        </form>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => {
              onClose;
              onChoice(0);
              reset({ Uname: "", Email: "", Upass: "" });
              handleClose;
              // router.push("/HomePage/");
            }}
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            isLoading={isSubmitting}
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              onSign(true);
              reset({ Uname: "", Email: "", Upass: "" });
              onChoice(0);
              handleClose;
              // router.push("/HomePage/");
            }}
            disabled={!isValid}
          >
            Submit
          </Button>
        </Stack>
      </VStack>
    </Center>
  );
};

export const GuestProvider = () => {
  const { user } = useAuthContext();
  const auth = getAuth(app);
  // const isLoggedIn = !!user;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSign, onSign } = useContext(AppContext);
  const { isChoice, onChoice } = useContext(ChoiceSosialContext);
  const { userName, setUserName } = useContext(UserNameContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    onChoice(0);
    router.push("/HoemPage/");
    onSign(true);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleClose = async () => {
    await router.push("/HomePage/");
  };
  const setGuest = () => {
    setEmail(`"test@test.com"`);
    setPassword(`"test1111"`);
    setUserName(`"Guest"`);
  };
  const submitted = () => {
    setEmail(`"test@test.com"`);
    setPassword(`"test1111"`);
    setUserName(`"Guest"`);
    createUserWithEmailAndPassword(auth, email, password);
    onChoice(0);
    onSign(true);
    // router.push("/HoemPage/");
  };

  type FormSign = {
    Uname: string;
    Email: string;
    Upass: string;
  };

  const {
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormSign>({
    mode: "all",
  });

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toggleNavHoverColor = useColorModeValue("teal.50", "teal.900");
  const navAccentColor = "teal.400";
  const navAccentHoverColor = "teal.300";
  return (
    <Center>
      <VStack>
        <Text>ゲストログインしますか？</Text>
        <form onSubmit={handleSubmit}>
          <FormControl>{}</FormControl>
        </form>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => {
              onChoice(0);
              handleClose;
              // router.push("/HomePage/");
            }}
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              // setGuest;
              // submitted;
              setEmail(`"test@test.com"`);
              setPassword(`"test1111"`);
              setUserName(`"Guest"`);
              createUserWithEmailAndPassword(auth, email, password);
              onChoice(0);
              onSign(true);
              router.push("/HomePage/");
            }}
          >
            Submit
          </Button>
        </Stack>
      </VStack>
    </Center>
  );
};
