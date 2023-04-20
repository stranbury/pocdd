import supabase from './client';
import { executeQuery } from "../utils";

export const getCompanies = async () =>
  executeQuery(supabase.from("company").select('*'));

export const getActiveCompanies = async () =>
  executeQuery(
    supabase.from("company").select().is("active", true).order("id", { ascending: false })
  );

export const getCompanyByName = async (name) =>
  executeQuery(supabase.from("company").select("*").eq("name", name));

export const getCompanyById = async (id) =>
  executeQuery(supabase.from("company").select("*").eq("id", id));

export const createCompany = async (company) =>
  executeQuery(supabase.from("company").insert(company));

export const updateCompany = async (company) =>
  executeQuery(supabase.from("company").update(company).eq("id", company.id));

export const deleteCompany = async (id) =>
  executeQuery(supabase.from("company").delete().eq("id", id));
