import {
  Button,
  Input,
  Modal,
  Spacer,
  Text,
  useInput,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Relation } from '../types/models';
import { ServerError } from '../types/requests';
import { useUser } from '../hooks/useUser';
import { PeerDropdown } from './PeerDropdown';
export const CreateRelation = () => {
  const [open, setOpen] = useState(false);
  const { value: name, bindings: nameBindings } = useInput('');
  const { value: description, bindings: descriptionBindings } = useInput('');
  const { value: peers, bindings: peersBindings } = useInput('');
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
    <>
      <Button onPress={() => setOpen(true)}>Create relation</Button>
      <Modal closeButton onClose={() => setOpen(false)} open={open} scroll>
        <Modal.Header>
          <Text size={18} weight="semibold">
            Create Relation
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
