import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Column } from "../components/layout/Column";
import { Tiny } from "../components/typography/Typography";

type FormFields = {
  fullName: string;
  email: string;
  confirmEmail: string;
};

type InviteRegistrationFormProps = {
  handleSubmitForm: SubmitHandler<FormFields>;
};

export const InviteRegistrationForm = ({
  handleSubmitForm,
}: InviteRegistrationFormProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormColumn>
        <FullWidthColumn>
          <label>Full Name</label>
          <Input
            required
            {...register("fullName", {
              minLength: 3,
            })}
          />
        </FullWidthColumn>
        <Tiny>🛈 Full Name needs to be at least 3 characters long.</Tiny>
        <FullWidthColumn>
          <label>Email</label>
          <Input required {...register("email")} />
        </FullWidthColumn>
        <FullWidthColumn>
          <label>Confirm Email</label>
          <Input
            required
            {...(register("confirmEmail"),
            {
              validate: (value: string) =>
                value === watch("email") || "Emails do not match",
            })}
          />
        </FullWidthColumn>
        <Button>Request An Invite</Button>

        {errors.fullName && <span>This field is required</span>}
      </FormColumn>
    </form>
  );
};

const FormColumn = styled(Column)`
  gap: ${({ theme }) => theme.spacing.medium};
`;

const FullWidthColumn = styled(Column)`
  width: 100%;
`;
