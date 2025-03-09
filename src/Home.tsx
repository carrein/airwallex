import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Body } from "./components/Body";
import { Button } from "./components/Button";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Layout } from "./components/Layout";
import { Column } from "./components/layout/Column";
import { Modal } from "./components/Modal";
import { Paragraph, Title } from "./components/typography/Typography";
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAfterClose={() => setIsModalSuccess(false)}
      >
        {isModalSuccess ? (
          <RegistrationSuccess />
        ) : (
          <InviteRegistrationForm handleSubmitForm={onSubmit} />
        )}
      </Modal>
      <Layout>
        <Header />
        <Body>
          <BodyColumn>
            <TitleColumn>
              <Title>A better way to enjoy everyday</Title>
              <Paragraph>Be the first to know when we launch!</Paragraph>
            </TitleColumn>
            <Button onClick={() => setIsModalOpen(true)}>
              Be the first to know!
            </Button>
          </BodyColumn>
        </Body>
        <Footer />
      </Layout>
    </>
  );
};

const BodyColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const TitleColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
`;
