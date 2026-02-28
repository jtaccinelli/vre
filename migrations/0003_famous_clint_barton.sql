CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text,
	`name` text NOT NULL,
	`image_url` text,
	FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON UPDATE no action ON DELETE no action
);
