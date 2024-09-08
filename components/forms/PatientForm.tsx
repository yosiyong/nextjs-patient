"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//formコントロール
import { Form } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import { useTranslations } from "next-intl"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import * as sdk from "node-appwrite";
import { ID, Query } from "node-appwrite";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// //Zod schemaでformの形状を定義⇒validation.tsで定義
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

// export const formSchema2 = (t: (key: string, options?: { field: string, length?: number }) => string) => {
//   z.object({
//       name: z
//           .string()
//           .min(2, t('validation.minLength',{ field: t('Name'), length: 2 }))
//           .max(50, t('validation.maxLength', { field: t('Name'), length: 50 })),
//       email: z.string().email(t('validation.invalid', { field: t('Email')})),
//       phone: z
//           .string()
//           .refine((phone) => /^\+\d{10,15}$/.test(phone), t('validation.invalid', { field: 'Email'})),
//   });
// };


const PatientForm = () => {
  const t = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);
  // const formSchema = UserFormValidation(t);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
     //入力されたformデータの検証
    setIsLoading(true);
    
    try{
      // const user = {
      //   name: values.name,
      //   email: values.email,
      //   phone: values.phone,
      // };
      const userData = {name, email, phone}
       
      // console.log('NEXT_PUBLIC_ENDPOINT:',process.env.NEXT_PUBLIC_ENDPOINT);
      // console.log('NEXT_PUBLIC_PROJECT_ID:',process.env.NEXT_PUBLIC_PROJECT_ID);
      // console.log('NEXT_PUBLIC_API_KEY:',process.env.NEXT_PUBLIC_API_KEY);
      // const client = new sdk.Client()
      //     .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT) // Your API Endpoint
      //     .setProject(process.env.NEXT_PUBLIC_PROJECT_ID) // Your project ID
      //     .setKey(process.env.NEXT_PUBLIC_API_KEY); // Your secret API key

      // const users = new sdk.Users(client);

      //  const newUser = await users.create(
      //   ID.unique(), 
      //   email, 
      //   phone, 
      //   undefined, 
      //   name)

      const newUser = await createUser(userData);
      console.log('onSubmit newUser:',newUser);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log('PatientForm onSubmit ERROR:',error);
    }

    setIsLoading(false);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
          </section>

          {/* name */}
          <CustomFormField 
            control={form.control} 
            fieldType={FormFieldType.INPUT} 
            name="name"
            label={t('Full name')} 
            placeholder="John Doe" 
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* email */}
          <CustomFormField 
            control={form.control} 
            fieldType={FormFieldType.INPUT} 
            name="email" 
            label={t("Email")}
            placeholder="JohnDoe@jsmastery.pro" 
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          {/* phone */}
          <CustomFormField 
            control={form.control} 
            fieldType={FormFieldType.PHONE_INPUT} 
            name="phone" 
            label={t("Phone Number")} 
            placeholder="(555) 123-1234" 
            iconSrc="/assets/icons/email.svg"
            iconAlt="phone"
          />

          <SubmitButton isLoading={isLoading}>{t("Get Started")}</SubmitButton>
        </form>
      </Form>
  )
}

export default PatientForm
