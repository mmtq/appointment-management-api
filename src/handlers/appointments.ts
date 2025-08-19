import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/custom-error";
import { db } from "../db/db";
import { AppointmentsTable, PatientsTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { validationResult } from "express-validator";

// Get All Patients
export async function getAllPatients(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const patients = await db.select().from(PatientsTable)
        res.status(200).json({ patients });
    } catch (error) {
        next(new CustomError("Failed to get Patients", 500));
    }
}

// Create Appointments
export async function createAppointment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new CustomError(JSON.stringify(err.array()), 400));
        }
        const { patientId, appointmentDate, appointmentTime, reason } = req.body
        const patientExists = await db.select().from(PatientsTable).where(eq(PatientsTable.id, patientId))
        if (patientExists.length === 0) {
            return next(new CustomError("Patient not found", 404));
        }
        const appointment = await db.insert(AppointmentsTable).values({ patientId, appointmentDate, appointmentTime, reason }).returning()
        res.status(201).json({ appointment, message: "Appointment created successfully" });
    } catch (error) {
        next(new CustomError("Failed to create Appointment", 500));
    }
}

// Get All Appointments
export async function getAllAppointments(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const appointments = await db.select().from(AppointmentsTable)
        res.status(200).json({ appointments });
    } catch (error) {
        next(new CustomError("Failed to get Appointments", 500));
    }
}

// Get Single Appointment
export async function getAppointment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new CustomError(JSON.stringify(err.array()), 400));
        }

        const id = +req.params.id
        const appointment = await db.select().from(AppointmentsTable)
            .where(
                eq(
                    AppointmentsTable.appointmentId, id
                )
            )
        if (appointment.length === 0) {
            return next(new CustomError("Appointment not found", 404));
        }
        res.status(200).json({ appointment: appointment[0] });
    } catch (error) {
        next(new CustomError("Failed to get Appointment", 500));
    }
}

// Update Appointment
export async function updateAppointment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new CustomError(JSON.stringify(err.array()), 400));
        }

        const { patientId, appointmentDate, appointmentTime, reason } = req.body
        const patientExists = await db.select().from(PatientsTable).where(eq(PatientsTable.id, patientId))
        if (patientExists.length === 0) {
            return next(new CustomError("Patient not found", 404));
        }
        const id = +req.params.id
        const appointment = await db.update(AppointmentsTable)
            .set({ patientId, appointmentDate, appointmentTime, reason })
            .where(
                eq(
                    AppointmentsTable.appointmentId, id
                )
            ).returning()
        if (appointment.length === 0) {
            return next(new CustomError("Appointment not found", 404));
        }
        res.status(200).json({ appointment: appointment[0], message: "Appointment updated successfully" });
    } catch (error) {
        next(new CustomError("Failed to update Appointment", 500));
    }
}

// Delete Appointment
export async function deleteAppointment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new CustomError(JSON.stringify(err.array()), 400));
        }

        const id = +req.params.id
        const appointment = await db.delete(AppointmentsTable)
            .where(
                eq(
                    AppointmentsTable.appointmentId, id
                )
            ).returning({
                deletedAppointmentId: AppointmentsTable.appointmentId
            })
        if (appointment.length === 0) {
            return next(new CustomError("Appointment not found", 404));
        }
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        next(new CustomError("Failed to delete Appointment", 500));
    }
}