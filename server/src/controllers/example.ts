import { Controller } from '../types/Controller';

export const get: Controller = async (req, res) => {
  res.json({ text: 'you shit' });
};
