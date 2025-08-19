import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAllPatients, getAppointment, updateAppointment } from "../handlers/appointments";
import { validateCreateAppointment, validateId, validateUpdateAppointment } from "../lib/validator-functions";

const appointmentsRouter = Router()

appointmentsRouter.get('/patients', getAllPatients)
appointmentsRouter.get('/appointments', getAllAppointments)
appointmentsRouter.get('/appointments/:id',validateId(), getAppointment)
appointmentsRouter.post('/add-appointment',validateCreateAppointment, createAppointment)
appointmentsRouter.put('/update-appointment/:id',validateUpdateAppointment, updateAppointment)
appointmentsRouter.delete('/delete-appointment/:id',validateId(), deleteAppointment)

export default appointmentsRouter