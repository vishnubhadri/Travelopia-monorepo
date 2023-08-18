interface Enquiries {
  full_name: string
  email: string
  country_id: number | null
  message: string
  duration_from: Date | null
  duration_to: Date | null
  stage_id: number | null
  phone_number: number | null
  number_of_travelers: number
  status_of_enquiry?: string
}
export { Enquiries }
