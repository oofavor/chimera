import {
  Button,
  Container,
  Input,
  Modal,
  Spacer,
  styled,
  Text,
  useInput,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { Relation } from '../types/models';
import type { ServerError } from '../types/requests';
import { useUser } from '../hooks/useUser';
import { PeerDropdown } from '../components/PeerDropdown';

const CreateRelation = () => {
  const [open, setOpen] = useState(false);
  const { value: name, bindings: nameBindings } = useInput('');
  const { value: description, bindings: descriptionBindings } = useInput('');
  const { user } = useUser();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '') return;

    const relation = {
      name,
      description,
      peerIDs: [user!.id],
    };

    setOpen(false);
    const req = await axios
      .post<Relation>('/api/relations', relation)
      .catch((err: ServerError | AxiosError) => {
        if (!axios.isAxiosError(err)) return;
        console.log(err.response?.data);
      });
    if (!req) return;
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="Name"
          fullWidth
          clearable
          bordered
          color="primary"
          size="lg"
          {...nameBindings}
        />
        <Spacer y={1} />
        <Input
          placeholder="Description"
          fullWidth
          clearable
          bordered
          color="primary"
          size="lg"
          {...descriptionBindings}
        />
        <Spacer y={1} />
        <PeerDropdown />
        <Spacer y={1} />
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

const Form = styled('form', {});

const LeftSide = styled('div', {});

export default CreateRelation;
