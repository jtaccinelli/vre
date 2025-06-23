CREATE TABLE `config` (
	`playlist_id` text PRIMARY KEY NOT NULL,
	`created_by` text NOT NULL,
	`contributor_ids` text NOT NULL,
	`contributor_vote_count` integer DEFAULT 1,
	`track_vote_count` integer DEFAULT 3,
	`enable_honourable_mentions` integer DEFAULT true,
	`enable_shame_votes` integer DEFAULT true,
	`enable_voting` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `vote` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`playlist_id` text NOT NULL,
	`voter_id` text,
	`contributor_ids` text,
	`track_ids` text,
	`honourable_mentions` text,
	`shame_votes` text
);
