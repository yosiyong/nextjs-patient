"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//formコントロール
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import { useTranslations } from "next-intl"


export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
//Zod schemaでformの形状を定義
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
  const t = useTranslations("common");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    //入力されたformデータの検証
    console.log(values)
  }

  return (
    <div>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default PatientForm
