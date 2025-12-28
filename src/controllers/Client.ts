import { Request, Response } from 'express';
import { Client } from '../models/client';

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err: any) {
    console.error('Get all clients error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    console.log('Create client request body:', req.body);
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err: any) {
    console.error('Create client error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};