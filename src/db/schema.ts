import { create } from "domain";
import { desc } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    // TODO: add banner fields
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idex").on(t.clerkId)]
);

export const userRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}))

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("name_index").on(t.name)]
);

export const categoryRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}))

export const videoVisibility = pgEnum("video_visibility", [
  "private",
  "public"
])

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  muxStatus: text("mux_status"),
  muxAssetId: text("mux_asset_id").unique(),
  muxUploadId: text("mux_upload_id").unique(),
  muxPlaybackId: text("mux_playback_id").unique(),
  muxTrackId: text("mux_track_id").unique(),
  muxTrackStatus: text("mux_track_status").unique(),
  thumbnailUrl: text("thumbanail_url"),
  previewUrl: text("preview_url"),
  duration: integer("duration").default(0).notNull(),
  visibility: videoVisibility("visibility").default("private").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}));