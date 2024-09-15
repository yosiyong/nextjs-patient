"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//formコントロール
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField , { FormFieldType } from "../CustomFormField"
import { useTranslations, useLocale } from "next-intl"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, getGenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { FileUploader } from "../FileUploader"

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm = ({user}:{user:User}) => {
  const t = useTranslations("common");
  const locale = useLocale();
    // const formSchema = UserFormValidation(t);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const GenderOptions = getGenderOptions(t);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
     //入力されたformデータの検証
    setIsLoading(true);
    
     // Store file info in form data as
     let formData;
     if (
       values.identificationDocument &&
       values.identificationDocument?.length > 0
     ) {
       const blobFile = new Blob([values.identificationDocument[0]], {
         type: values.identificationDocument[0].type,
       });
 
       formData = new FormData();
       formData.append("blobFile", blobFile);
       formData.append("fileName", values.identificationDocument[0].name);
     }

    try{
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      // const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/${locale}/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log('PatientForm onSubmit ERROR:',error);
    }

    setIsLoading(false);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
          <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">{t("register_title")}</p>
          </section>

          {/* Personal Information セクション*/}
          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">{t("Personal Information")}</h2>
            </div>
          
            {/* NAME */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label={t("Full name")}
              placeholder={t("name_placeholder")}
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            {/* EMAIL & PHONE */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label={t("Email address")}
                placeholder={t("email_placeholder")}
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />

              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label={t("Phone Number")}
                placeholder="(555) 123-4567"
                locale={locale}
              />
            </div>

            {/* BirthDate & Gender */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label={t("Date of birth")}
                locale={locale}
              />

              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label={t("Gender")}
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option, i) => (
                        <div key={option + i} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>

            {/* Address & Occupation */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label={t("Address")}
                placeholder={t("address_placeholder")}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label={t("Occupation")} 
                placeholder="Software Engineer"
              />
            </div>

            {/* Emergency Contact Name & Emergency Contact Number */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label={t("Emergency contact name")}
                placeholder="Guardian's name"
              />

              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label={t("Emergency contact number")}
                placeholder="(555) 123-4567"
                locale={locale}
              />
            </div>
          </section>

          {/* Medical Information セクション*/}
          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">{t("Primary care physicaian")}</h2>
            </div>

            {/* PRIMARY CARE PHYSICIAN */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="primaryPhysician"
                  label={t("Primary Physician")}
                  placeholder={t("physician_placeholder")}
                >
                {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
              </CustomFormField>
            </div>

            {/* INSURANCE & POLICY NUMBER */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label={t("Insurance provider")}
                placeholder="BlueCross BlueShield"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label={t("Insurance policy number")}
                placeholder="ABC123456789"
              />
            </div>

            {/* ALLERGY & CURRENT MEDICATIONS */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label={t("Allergies")}
                placeholder={t("allergies_placeholder")}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label={t("Current medications")}
                placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
              />
            </div>

            {/* FAMILY MEDICATION & PAST MEDICATIONS */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label={t("Family medical history")}
                placeholder={t("family_medical_history_placeholder")}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label={t("Past medical history")}
                placeholder={t("past_medical_history_placeholder")}
              />
            </div>
          </section>

          {/* Identification and Verfication セクション*/}
          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">{t("Identification and Verfication")}</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label={t("Identification Type")}
              placeholder={t("identification_type_placeholder")}
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label={t("Identification Number")}
              placeholder="123456789"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label={t("Identification Document")}
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
            />
          </section>

          {/* Consent and Privacy セクション*/}
          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">{t("Consent and Privacy")}</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label={t("treatmentConsent")}
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label={t("disclosureConsent")}
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label={t("privacyConsent")}
            />
          </section>
          
          <SubmitButton isLoading={isLoading}>{t("Submit and Continue")}</SubmitButton>
        </form>
      </Form>
  )
}

export default RegisterForm
