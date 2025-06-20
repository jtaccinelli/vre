CREATE TABLE `category` (
	`handle` text,
	`title` text,
	`is_enabled` integer DEFAULT true,
	`can_expire` integer DEFAULT true,
	`verify_by` integer DEFAULT 1460,
	`expire_by` integer DEFAULT 2920,
	`fields` text DEFAULT '{}',
	`group` text,
	FOREIGN KEY (`group`) REFERENCES `group`(`handle`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_handle_unique` ON `category` (`handle`);--> statement-breakpoint
CREATE TABLE `entry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lng` real NOT NULL,
	`lat` real NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`type` text,
	`version` integer,
	FOREIGN KEY (`type`) REFERENCES `category`(`handle`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`version`) REFERENCES `version`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `group` (
	`handle` text,
	`title` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `group_handle_unique` ON `group` (`handle`);--> statement-breakpoint
CREATE TABLE `settings` (
	`is_need_images` integer,
	`is_allow_expire` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `version` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`body` text,
	`data` text,
	`is_hidden` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`verified_at` text DEFAULT (CURRENT_TIMESTAMP)
);
