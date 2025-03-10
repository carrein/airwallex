import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../components/core/Button";
import { Input } from "../components/form/Input";
import { Column } from "../components/layout/Column";
import { Error, Petite } from "../components/typography/Typography";
import { ENDPOINT } from "../constants/constants";

export type InviteRegistrationFormFields = {
  fullName: string;
  email: string;
  confirmEmail: string;
};

type MutationData = {
  name: string;
  email: string;
};

type InviteRegistrationFormProps = {
  setIsRegistrationSuccess: Dispatch<SetStateAction<boolean>>;
};

type ErrorResponse = {
  errorMessage: string; // Adjust this according to the actual structure of your error response
  // Add other properties if needed
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
  const mutation = useMutation<unknown, ErrorResponse, MutationData>({
    mutationFn: (data) =>
      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Send the data as JSON
      }).then((res) => {
        if (!res.ok) {
          // If the response is not ok, throw an error
          return res.json().then((errorData) => {
            throw errorData;
          });
        }
        return res.json(); // Return the response data if successful
      }),

    onSuccess: () => {
      setIsRegistrationSuccess(true);
    },
    onError: (error) => {
      console.log("e", error);
      setError(error.errorMessage);
    },
  });

  const handleSubmitForm: SubmitHandler<InviteRegistrationFormFields> = async (
    data
  ) => {
    mutation.mutate({
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
              message: "Entered value does not match email format.",
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
            validate: (value: string) =>
              value === watch("email") || "Emails do not match.",
          })}
        />
      </FormColumn>
      <Align>
        <Button isLoading={mutation.isPending} type="submit">
          I want in!
        </Button>
      </Align>
      {error && <Error>{error}</Error>}
    </Form>
  );
};

const FullNameColumn = styled(Column)`
  gap: 8px;
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

const Align = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
