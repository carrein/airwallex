import { useState } from "react";
import styled from "styled-components";
import { Body } from "./components/Body";
import { Button } from "./components/Button";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Layout } from "./components/Layout";
import { Column } from "./components/layout/Column";
import { Modal } from "./components/modal/Modal";
import { Subtitle, Title } from "./components/typography/Typography";
import { InviteRegistrationForm } from "./registration/RegistrationForm";
import { RegistrationSuccess } from "./registration/RegistrationSuccess";

// Page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
export const Home = () => {
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  return (
    <>
      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={() => setInviteModalOpen(false)}
        onAfterClose={() => setIsRegistrationSuccess(false)}
      >
        {isRegistrationSuccess ? (
          <RegistrationSuccess />
        ) : (
          <InviteRegistrationForm
            setIsRegistrationSuccess={setIsRegistrationSuccess}
          />
        )}
      </Modal>
      <Layout>
        <Header />
        <Body>
          <BodyColumn>
            <TitleColumn>
              <StyledTitle>A better way to enjoy everyday</StyledTitle>
              <StyledSubtitle>
                Be the first to know when we launch!
              </StyledSubtitle>
            </TitleColumn>
            <Button onClick={() => setInviteModalOpen(true)}>
              Discover What Awaits
            </Button>
          </BodyColumn>
        </Body>
        <Footer />
      </Layout>
    </>
  );
};

const StyledTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.white};
`;

const StyledSubtitle = styled(Subtitle)`
  color: ${({ theme }) => theme.colors.white};
`;

const BodyColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const TitleColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
`;
