CREATE TABLE `Appointments` (
	`id` integer PRIMARY KEY NOT NULL,
	`patientId` integer NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`reason` text NOT NULL,
	FOREIGN KEY (`patientId`) REFERENCES `Patients`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Patients` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL
);
