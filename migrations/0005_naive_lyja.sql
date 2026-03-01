PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_room` (
	`user_id` text NOT NULL,
	`room_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `room_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_room`("user_id", "room_id") SELECT "user_id", "room_id" FROM `user_room`;--> statement-breakpoint
DROP TABLE `user_room`;--> statement-breakpoint
ALTER TABLE `__new_user_room` RENAME TO `user_room`;--> statement-breakpoint
PRAGMA foreign_keys=ON;