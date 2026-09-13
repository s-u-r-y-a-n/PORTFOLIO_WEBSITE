import axios from "axios";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Sends contact form payload to the backend SMTP endpoint.
 */
export async function sendContactMessage(data: ContactFormData): Promise<ContactApiResponse> {
  const response = await axios.post<ContactApiResponse>(`${API_BASE_URL}/submit-form`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
