import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Patients table (for reference)
export const PatientsTable = sqliteTable("Patients", {
    id: integer("id").primaryKey(), // PatientId in API maps to this
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
});

// Appointments table
export const AppointmentsTable = sqliteTable("Appointments", {
    id: integer("id").primaryKey(), // AppointmentId in API maps to this
    patientId: integer("patientId")
        .notNull()
        .references(() => PatientsTable.id, { onDelete: "cascade" }),
    appointmentDate: text("appointmentDate").notNull(), // YYYY-MM-DD
    appointmentTime: text("appointmentTime").notNull(), // HH:MM
    reason: text("reason").notNull(),
});
