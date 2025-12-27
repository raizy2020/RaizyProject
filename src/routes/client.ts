// import express from 'express';
// import { getAllClients, getClientById, createClient, updateClient } from '../controllers/Client';

// const router = express.Router();

// router.get('/', getAllClients);
// router.get('/:id', getClientById);
// router.post('/', createClient);
// router.put('/:id', updateClient);

// export default router;
import express from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/Client';

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);
router.get('/:id', (req, res) => {
  getClientById(req, res);
});
router.put('/:id', (req, res) => {
  updateClient(req, res);
});
router.delete('/:id', (req, res) => {
  deleteClient(req, res);
});

export default router;