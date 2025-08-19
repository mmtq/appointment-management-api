import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import app from "../server";

export const PatientsTable = sqliteTable("Patients", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
});

export const AppointmentsTable = sqliteTable("Appointments", {
    appointmentId: integer("appointmentId").primaryKey(),
    patientId: integer("patientId")
        .notNull()
        .references(() => PatientsTable.id, { onDelete: "cascade" }),
    appointmentDate: text("appointmentDate").notNull(), // YYYY-MM-DD
    appointmentTime: text("appointmentTime").notNull(), // HH:MM
    reason: text("reason").notNull(),
});
