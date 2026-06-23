import { z } from "zod";
import {
  projectSchema, serviceSchema, industrySchema, articleSchema,
  stackItemSchema, clientSchema,
} from "./schemas";

export type FieldType =
  | "text" | "textarea" | "slug" | "number" | "switch"
  | "string-list" | "paragraphs" | "image" | "gallery";

export interface FieldDef {
  name: string; label: string; type: FieldType;
}

export interface EntityConfig {
  key: string;
  table: string;
  label: string;
  titleField: string;
  ordered: boolean;
  publishable: boolean;
  schema: z.ZodTypeAny;
  fields: FieldDef[];
}

export const ENTITIES: Record<string, EntityConfig> = {
  projects: {
    key: "projects", table: "projects", label: "Project",
    titleField: "title", ordered: true, publishable: true, schema: projectSchema,
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "client", label: "Client", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "role", label: "Roles", type: "string-list" },
      { name: "stack", label: "Stack", type: "string-list" },
      { name: "tags", label: "Tags", type: "string-list" },
      { name: "gradient", label: "Gradient", type: "text" },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "gallery", label: "Gallery", type: "gallery" },
    ],
  },
  services: {
    key: "services", table: "services", label: "Service",
    titleField: "title", ordered: true, publishable: true, schema: serviceSchema,
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "short", label: "Short", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "outcomes", label: "Outcomes", type: "string-list" },
    ],
  },
  industries: {
    key: "industries", table: "industries", label: "Industry",
    titleField: "name", ordered: true, publishable: true, schema: industrySchema,
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "note", label: "Note", type: "textarea" },
    ],
  },
  articles: {
    key: "articles", table: "articles", label: "Article",
    titleField: "title", ordered: true, publishable: true, schema: articleSchema,
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "category", label: "Category", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "body", label: "Body", type: "paragraphs" },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "date", label: "Date", type: "text" },
      { name: "read_time", label: "Read time", type: "text" },
    ],
  },
  stack: {
    key: "stack", table: "stack_items", label: "Stack item",
    titleField: "name", ordered: true, publishable: false, schema: stackItemSchema,
    fields: [{ name: "name", label: "Name", type: "text" }],
  },
  clients: {
    key: "clients", table: "clients", label: "Client",
    titleField: "name", ordered: true, publishable: false, schema: clientSchema,
    fields: [{ name: "name", label: "Name", type: "text" }],
  },
};
