import { Alert, Button, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "@remix-run/react";
import { useAccount } from "wagmi";
import type { LaborMarketNew } from "~/domain";
import { LaborMarketNewSchema } from "~/domain";
import { useCreateMarketplace } from "~/hooks/useCreateMarketplace";

export function UpdateMarketplace({ title }: { title: string }) {
  const navigate = useNavigate();
  const { isDisconnected } = useAccount();

  const form = useForm<LaborMarketNew>({
    initialValues: {
      title: "",
    },
    validate: zodResolver(LaborMarketNewSchema),
  });

  const { write, isLoading, isSuccess } = useCreateMarketplace({
    isEnabled: form.isValid(),
    data: form.values,
    onTransactionSuccess() {
      navigate("/app/brainstorm");
    },
    onWriteSuccess() {
      // TODO: toast message or some kind of feedback
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        write?.();
      })}
      className="space-y-7 p-3 max-w-3xl mx-auto"
    >
      <p>Is loading {JSON.stringify(isLoading)}</p>
      <p>is Success {JSON.stringify(isSuccess)}</p>
      <div className="space-y-3 mx-auto">
        <Title order={2} weight={600}>
          {title + " Marketplace"}
        </Title>
        <Text>
          Brainstorm marketplaces empower our community to crowdsource the best questions for crypto analysts to answer.
          Create a marketplace for you and peers to host, incentivize, and engage in brainstorms for any web3 challenge.
        </Text>
        <TextInput
          label="Title"
          placeholder="Marketplace name"
          className=" text-black w-full"
          {...form.getInputProps("title")}
        />
      </div>
      {isDisconnected && (
        <Alert color="red" variant="outline" title="Disconnected">
          Please connect wallet
        </Alert>
      )}
      <div className="flex flex-col sm:flex-row gap-5">
        <Button size="md" color="cyan" type="submit" disabled={isDisconnected}>
          Create
        </Button>
        <Button variant="default" color="dark" size="md">
          Cancel
        </Button>
      </div>
    </form>
  );
}
