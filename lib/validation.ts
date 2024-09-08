import { z } from "zod";
//import { useTranslations } from "next-intl"

export const UserFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });

// export const UserFormValidation = (t: (key: string, options?: { field: string, length?: number }) => string) => {
//     z.object({
//         name: z
//             .string()
//             .min(2, t('validation.minLength',{ field: t('Name'), length: 2 }))
//             .max(50, t('validation.maxLength', { field: t('Name'), length: 50 })),
//         email: z.string().email(t('validation.invalid', { field: t('Email')})),
//         phone: z
//             .string()
//             .refine((phone) => /^\+\d{10,15}$/.test(phone), t('validation.invalid', { field: 'Email'})),
//     });
// };

// export const PatientFormValidation = (t: (key: string, options?: { field: string, length?: number }) => string) => {
//     z.object({
//     name: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Name'), length: 2 }))
//         .max(50, t('validation.maxLength', { field: t('Name'), length: 50 })),
//     email: z.string().email("Invalid email address"),
//     phone: z
//         .string()
//         .refine((phone) => /^\+\d{10,15}$/.test(phone), t('validation.invalid', { field: t('Phone Number')})),
//     birthDate: z.coerce.date(),
//     gender: z.enum(["Male", "Female", "Other"]),
//     address: z
//         .string()
//         .min(5, t('validation.minLength',{ field: t('Address'), length: 5 }))
//         .max(500, t('validation.maxLength',{ field: t('Address'), length: 500 })),
//     occupation: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Occupation'), length: 2 }))
//         .max(500, t('validation.maxLength',{ field: t('Occupation'), length: 500})),
//     emergencyContactName: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Contact'), length: 2 }))
//         .max(50, t('validation.maxLength',{ field: t('Contact'), length: 50 })),
//     emergencyContactNumber: z
//         .string()
//         .refine(
//         (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
//         t('validation.invalid', { field: t('Phone Number')})
//         ),
//     primaryPhysician: z.string().min(2, t('validation.doctor')),
//     insuranceProvider: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Insurance'), length: 2 }))
//         .max(50, t('validation.maxLength',{ field: t('Insurance'), length: 50 })),
//     insurancePolicyNumber: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Policy'), length: 2 }))
//         .max(50, t('validation.maxLength',{ field: t('Policy'), length: 50 })),
//     allergies: z.string().optional(),
//     currentMedication: z.string().optional(),
//     familyMedicalHistory: z.string().optional(),
//     pastMedicalHistory: z.string().optional(),
//     identificationType: z.string().optional(),
//     identificationNumber: z.string().optional(),
//     identificationDocument: z.custom<File[]>().optional(),
//     treatmentConsent: z
//         .boolean()
//         .default(false)
//         .refine((value) => value === true, {
//         message: t('validation.consent', { field: t('treatment')}),
//         }),
//     disclosureConsent: z
//         .boolean()
//         .default(false)
//         .refine((value) => value === true, {
//         message: t('validation.consent', { field: t('disclosure')}),
//         }),
//     privacyConsent: z
//         .boolean()
//         .default(false)
//         .refine((value) => value === true, {
//         message: t('validation.consent', { field: t('privacy')}),
//         }),
//     });
// };

// export const CreateAppointmentSchema = (t: (key: string, options?: { field: string, length?: number }) => string) => {
//     z.object({
//     primaryPhysician: z.string().min(2, t('validation.doctor')),
//     schedule: z.coerce.date(),
//     reason: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Reason'), length: 2 }))
//         .max(500, t('validation.maxLength',{ field: t('Reason'), length: 500 })),
//     note: z.string().optional(),
//     cancellationReason: z.string().optional(),
//     });
// };
// export const ScheduleAppointmentSchema = (t: (key: string) => string) => {
//     z.object({
//     primaryPhysician: z.string().min(2, t('validation.doctor')),
//     schedule: z.coerce.date(),
//     reason: z.string().optional(),
//     note: z.string().optional(),
//     cancellationReason: z.string().optional(),
//     });
// };
// export const CancelAppointmentSchema = (t: (key: string, options?: { field: string, length?: number }) => string) => {
//     z.object({
//     primaryPhysician: z.string().min(2, t('validation.doctor')),
//     schedule: z.coerce.date(),
//     reason: z.string().optional(),
//     note: z.string().optional(),
//     cancellationReason: z
//         .string()
//         .min(2, t('validation.minLength',{ field: t('Reason'), length: 2 }))
//         .max(500, t('validation.maxLength',{ field: t('Reason'), length: 500 })),
//     });
// };
// export function getAppointmentSchema(type: string) {
//   switch (type) {
//     case "create":
//       return CreateAppointmentSchema;
//     case "cancel":
//       return CancelAppointmentSchema;
//     default:
//       return ScheduleAppointmentSchema;
//   }
// }
