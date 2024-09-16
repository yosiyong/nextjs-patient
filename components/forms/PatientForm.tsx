"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//formコントロール
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useTranslations, useLocale } from "next-intl"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}


const PatientForm = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  // const formSchema = UserFormValidation(t);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<ReturnType<typeof UserFormValidation>>>({
    resolver: zodResolver(UserFormValidation(t)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<ReturnType<typeof UserFormValidation>>) {
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
        router.push(`/${locale}/patients/${newUser.$id}/register`);
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
            locale={locale}
          />

          <SubmitButton isLoading={isLoading}>{t("Get Started")}</SubmitButton>
        </form>
      </Form>
  )
}

export default PatientForm
