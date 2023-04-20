import supabase from './client';
import { executeQuery } from "../utils";

export const getFiles = async () => executeQuery(supabase.from("files").select("*"));

export const getFilesByActorId = async (actorId) =>
  executeQuery(supabase.from("files").select("*").eq("actor", actorId));

export const getFilesByCompanyId = async (companyId) =>
  executeQuery(supabase.from("files").select("*").eq("company", companyId));

export const getFilesByActorIdAndCompanyId = async (actorId, companyId) =>
  executeQuery(
    supabase.from("files").select("*").eq("uploadBy", actorId).eq("company", companyId)
  );

export const getFileById = async (id) =>
  executeQuery(supabase.from("files").select("*").eq("id", id));

export const getFileByName = async (name) =>
  executeQuery(supabase.from("files").select("*").eq("name", name));

export const createFile = async (file) =>
  executeQuery(supabase.from("files").insert(file));

export const updateFile = async (file) =>
  executeQuery(supabase.from("files").update(file).eq("id", file.id));

export const deleteFile = async (id) =>
  executeQuery(supabase.from("files").delete().eq("id", id));


// Path: tools/supabase/files.js