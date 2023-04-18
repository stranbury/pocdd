import supabase from './client';
import { executeQuery } from '../utils';

export const getActors = async () => executeQuery(supabase.from('actor').select('*'));

export const getActorById = async (id) =>
  executeQuery(supabase.from('actor').select('*').eq('id', id));

export const getActorByUserId = async (userId) =>
  executeQuery(supabase.from('actor').select('*').eq('user', userId));

export const getActorByCompanyId = async (companyId) =>
  executeQuery(
    supabase
      .from('actor')
      .select('*')
      .eq('company', companyId)
      .eq('active', true)
  );

export const getActiveActor = async () =>
  executeQuery(supabase.from('actor').select('*').eq('active', true));

export const createActor = async (actor) =>
  executeQuery(supabase.from('actor').insert(actor));

export const updateActor = async (actor) =>
  executeQuery(supabase.from('actor').update(actor).eq('id', actor.id));

export const deleteActor = async (id) =>
  executeQuery(supabase.from('actor').delete().eq('id', id));
