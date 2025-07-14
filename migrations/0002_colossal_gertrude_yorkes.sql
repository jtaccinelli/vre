CREATE TABLE `room` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`client_id` text NOT NULL,
	`client_secret` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `form` ADD `room_id` text REFERENCES room(id);