import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../components/core/Button";
import { Input } from "../components/form/Input";
import { Column } from "../components/layout/Column";
import { Error, Petite } from "../components/typography/Typography";
import { ENDPOINT } from "../constants/constants";

type InviteRegistrationFormFields = {
  fullName: string;
  email: string;
  confirmEmail: string;
};

type RegisterMutationData = {
  name: string;
  email: string;
};

type MutationErrorResponse = {
  errorMessage: string;
};

// TODO: Cheat a little here by passing a dispatch. Ideally we hoist state into a context to prevent state view coupling.
type InviteRegistrationFormProps = {
  setIsRegistrationSuccess: Dispatch<SetStateAction<boolean>>;
};

export const InviteRegistrationForm = ({
  setIsRegistrationSuccess,
}: InviteRegistrationFormProps) => {
  const [error, setError] = useState("");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteRegistrationFormFields>();

  // https://github.com/TanStack/query/discussions/1385
  // TODO: Ideally create a wrapper around this instead of baking fetch directly in component.
  const registerMutation = useMutation<
    unknown,
    MutationErrorResponse,
    RegisterMutationData
  >({
    mutationFn: async (data) => {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return response.json();
    },
    onSuccess: () => {
      setIsRegistrationSuccess(true);
    },
    onError: (error) => {
      setError(error.errorMessage);
    },
  });

  const handleSubmitForm: SubmitHandler<InviteRegistrationFormFields> = (
    data
  ) => {
    setError("");
    registerMutation.mutate({
      name: data.fullName,
      email: data.email,
    });
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormColumn>
        <FullNameColumn>
          <Input
            errorMessage={errors.fullName?.message}
            id="fullName"
            type="text"
            required
            label="Full Name"
            {...register("fullName", {
              minLength: {
                message: "Full Name needs to be at least 3 characters long.",
                value: 3,
              },
            })}
          />
          <Petite>• Must be a minimum of 3 characters.</Petite>
        </FullNameColumn>
        <Input
          errorMessage={errors.email?.message}
          id="email"
          type="email"
          required
          label="Email"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        <Input
          errorMessage={errors.confirmEmail?.message}
          id="confirmEmail"
          type="email"
          required
          label="Confirm Email"
          {...register("confirmEmail", {
            validate: (value) =>
              value === watch("email") || "Emails do not match.",
          })}
        />
      </FormColumn>
      <ButtonContainer>
        <Button isLoading={registerMutation.isPending} type="submit">
          Sign Me Up!
        </Button>
      </ButtonContainer>
      {error && <Error>{error}</Error>}
    </Form>
  );
};

const FullNameColumn = styled(Column)`
  gap: ${({ theme }) => theme.spacing.small};
`;

const FormColumn = styled(Column)`
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
