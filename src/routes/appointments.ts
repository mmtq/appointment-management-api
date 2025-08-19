import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAllPatients, getAppointment, updateAppointment } from "../handlers/appointments";

const appointmentsRouter = Router()

appointmentsRouter.get('/patients', getAllPatients)
appointmentsRouter.get('/appointments', getAllAppointments)
appointmentsRouter.get('/appointments/:id', getAppointment)
appointmentsRouter.post('/add-appointment', createAppointment)
appointmentsRouter.put('/update-appointment/:id', updateAppointment)
appointmentsRouter.delete('/delete-appointment/:id', deleteAppointment)

export default appointmentsRouter