import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PatientsTable = sqliteTable("Patients", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
})

export const AppointmentsTable = sqliteTable("Appointments", {
    id: integer("id").primaryKey(),
    patientId: integer("patientId")
        .notNull()
        .references(() => PatientsTable.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // YYYY-MM-DD
    time: text("time").notNull(), // HH:MM
    reason: text("reason").notNull(),
});
