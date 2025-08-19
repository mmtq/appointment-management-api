export const appointmentsSwagger = {
  components: {
    schemas: {
      Appointment: {
        type: "object",
        required: ["patientId", "date", "time", "reason"],
        properties: {
          id: {
            type: "integer",
            description: "The auto-generated id of the appointment"
          },
          patientId: {
            type: "integer",
            description: "The id of the patient"
          },
          appointmentDate: {
            type: "string",
            format: "date",
            description: "The date of the appointment (YYYY-MM-DD)"
          },
          appointmentTime: {
            type: "string",
            description: "The time of the appointment (HH:MM)"
          },
          reason: {
            type: "string",
            description: "The reason for the appointment"
          }
        },
        example: {
          id: 1,
          patientId: 1,
          date: "2025-01-01",
          time: "10:00",
          reason: "Checkup"
        }
      },
      Patient: {
        type: "object",
        required: ["name", "email", "phone"],
        properties: {
          id: {
            type: "integer",
            description: "The auto-generated id of the patient"
          },
          name: {
            type: "string",
            description: "The name of the patient"
          },
          email: {
            type: "string",
            description: "The email of the patient"
          },
          phone: {
            type: "string",
            description: "The phone number of the patient"
          }
        },
        example: {
          id: 1,
          name: "John Doe",
          email: "jFbGc@example.com",
          phone: "123-456-7890"
        }
      }
    }
  },
  paths: {
    "/api/patients": {
      get: {
        summary: "Returns all patients",
        tags: ["Patients"],
        responses: {
          200: {
            description: "A list of patients",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Patient" } }
              }
            }
          }
        }
      }
    },
    "/api/appointments": {
      get: {
        summary: "Returns all appointments",
        tags: ["Appointments"],
        responses: {
          200: {
            description: "A list of appointments",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Appointment" } }
              }
            }
          }
        }
      }
    },
    "/api/appointments/{id}": {
      get: {
        summary: "Returns a single appointment",
        tags: ["Appointments"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "integer" },
            required: true,
            description: "The id of the appointment"
          }
        ],
        responses: {
          200: {
            description: "A single appointment",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" }
              }
            }
          }
        }
      }
    },
    "/api/add-appointment": {
      post: {
        summary: "Creates a new appointment",
        tags: ["Appointments"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  patientId: { type: "integer", example: 123 },
                  appointmentDate: { type: "string", example: "2025-08-20"},
                  appointmentTime: { type: "string", example: "14:30"},
                  reason: { type: "string", example: "Regular check-up" }
                },
                required: ["patientId", "appointmentDate", "appointmentTime", "reason"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "The created appointment",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" }
              }
            }
          }
        }
      }
    }
    ,
    "/api/update-appointment/{id}": {
      put: {
        summary: "Updates an existing appointment",
        tags: ["Appointments"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "integer" },
            required: true,
            description: "The id of the appointment"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  patientId: { type: "integer", example: 123 },
                  appointmentDate: { type: "string", example: "2025-08-20" },
                  appointmentTime: { type: "string", example: "14:30" },
                  reason: { type: "string", example: "Regular check-up" }
                },
                required: ["patientId", "appointmentDate", "appointmentTime", "reason"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "The updated appointment",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" }
              }
            }
          }
        }
      }
    },
    "/api/delete-appointment/{id}": {
      delete: {
        summary: "Deletes an existing appointment",
        tags: ["Appointments"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "integer" },
            required: true,
            description: "The id of the appointment"
          }
        ],
        responses: {
          200: {
            description: "Appointment deleted successfully"
          }
        }
      }
    }
  }
};
