import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Body } from "./components/Body";
import { Button } from "./components/Button";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Layout } from "./components/Layout";
import { Column } from "./components/layout/Column";
import { Modal } from "./components/Modal";
import {
  Brand,
  Paragraph,
  Petite,
  Tiny,
  Title,
} from "./components/typography/Typography";
import { ENDPOINT } from "./constants/constants";
import { InviteRegistrationForm } from "./registration/RegistrationForm";
import { RegistrationSuccess } from "./registration/RegistrationSuccess";

type FormFields = {
  fullName: string;
  email: string;
  confirmEmail: string;
};

interface MutationData {
  name: string;
  email: string;
}

// Page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const mutation = useMutation<unknown, unknown, MutationData>({
    mutationFn: (data) =>
      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Send the data as JSON
      }).then((res) => res.json()),
    onSuccess: () => {
      setIsModalSuccess(true);
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("e", data);
    mutation.mutate({
      name: data.fullName,
      email: data.email,
    });
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal
        className="modal"
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        onAfterClose={() => setIsModalSuccess(false)}
        contentLabel="Example Modal"
      >
        {isModalSuccess ? (
          <RegistrationSuccess />
        ) : (
          <InviteRegistrationForm handleSubmitForm={onSubmit} />
        )}
      </Modal>
      <Layout>
        <Header>
          <Brand>Broccoli & Co.</Brand>
        </Header>
        <Body>
          <BodyColumn>
            <TitleColumn>
              <Title>A better way to enjoy everyday.</Title>
              <Paragraph>Be the first to know when we launch</Paragraph>
            </TitleColumn>
            <Button onClick={openModal}>Be the first to know</Button>
          </BodyColumn>
        </Body>
        <Footer>
          <FooterColumn>
            <Petite>Made with ♥️ in Singapore.</Petite>
            <Petite>All rights reserved © 2025 Broccoli & Co.</Petite>
          </FooterColumn>
        </Footer>
      </Layout>
    </>
  );
};

const FullWidthColumn = styled(Column)`
  width: 100%;
`;

const FormColumn = styled(Column)`
  gap: ${({ theme }) => theme.spacing.medium};
`;

const BodyColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const TitleColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const FooterColumn = styled(Column)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
