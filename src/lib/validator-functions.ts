import { body, param } from "express-validator";

export function validateId() {
  return param("id")
    .notEmpty().withMessage("ID cannot be empty")
    .toInt().isInt().withMessage("ID must be an integer")
}

export function validatePatientId() {
  return body("patientId")
    .notEmpty().withMessage("Patient ID cannot be empty")
    .toInt().isInt().withMessage("Patient ID must be an integer")    
}

export function validateAppointmentDate() {
  return body("appointmentDate")
    .isISO8601({ strict: true }).withMessage("Date must be in YYYY-MM-DD format")
    .notEmpty().withMessage("Date cannot be empty")
}

export function validateAppointmentTime() {
  return body("appointmentTime")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:mm format (24-hour)")
    .notEmpty().withMessage("Time cannot be empty")
}

export function validateReason() {
  return body("reason")
    .isString().withMessage("Reason must be a string")
    .notEmpty().withMessage("Reason cannot be empty")
    .trim().escape()
}

export const validateCreateAppointment = [
  validatePatientId(),
  validateAppointmentDate(),
  validateAppointmentTime(),
  validateReason()
];

export const validateUpdateAppointment = [
  validateId(),
  validatePatientId(),
  validateAppointmentDate(),
  validateAppointmentTime(),
  validateReason()
];