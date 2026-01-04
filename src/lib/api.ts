const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || 'Error en la solicitud' };
        }

        return { data };
    } catch (error) {
        console.error('API Error:', error);
        return { error: 'Error de conexión' };
    }
}

// ========== AUTH ==========
export const auth = {
    login: async (email: string, password: string) =>
        fetchApi<{ user: any; token: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    register: async (email: string, password: string, name: string) =>
        fetchApi<{ user: any; token: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        }),

    getMe: async () => fetchApi<any>('/auth/me'),
};

// ========== APPOINTMENTS ==========
export interface AppointmentData {
    patientName: string;
    patientEmail: string;
    patientPhone?: string;
    serviceId: string;
    date: string;
    notes?: string;
}

export const appointments = {
    getAvailability: async (date?: string) =>
        fetchApi<{ availability: any[]; bookedSlots: string[] }>(
            `/appointments/availability${date ? `?date=${date}` : ''}`
        ),

    create: async (data: AppointmentData) =>
        fetchApi<any>('/appointments', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getById: async (id: string) => fetchApi<any>(`/appointments/${id}`),

    cancel: async (id: string) =>
        fetchApi<any>(`/appointments/${id}`, { method: 'DELETE' }),

    // Admin
    getAll: async (params?: { status?: string; from?: string; to?: string }) => {
        const query = new URLSearchParams(params as Record<string, string>).toString();
        return fetchApi<any[]>(`/appointments${query ? `?${query}` : ''}`);
    },

    update: async (id: string, data: Partial<{ status: string; date: string; notes: string }>) =>
        fetchApi<any>(`/appointments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

// ========== CONTACT ==========
export interface ContactData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export const contact = {
    submit: async (data: ContactData) =>
        fetchApi<{ message: string; id: string }>('/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Admin
    getMessages: async (unreadOnly?: boolean) =>
        fetchApi<any[]>(`/contact${unreadOnly ? '?unreadOnly=true' : ''}`),

    markAsRead: async (id: string) =>
        fetchApi<any>(`/contact/${id}/read`, { method: 'PATCH' }),
};

// ========== BLOG ==========
export const blog = {
    getPosts: async (params?: { category?: string; limit?: number; page?: number }) => {
        const query = new URLSearchParams(params as Record<string, string>).toString();
        return fetchApi<{ posts: any[]; pagination: any }>(`/blog/posts${query ? `?${query}` : ''}`);
    },

    getPost: async (slug: string) => fetchApi<any>(`/blog/posts/${slug}`),

    getCategories: async () => fetchApi<any[]>('/blog/categories'),

    // Admin
    createPost: async (data: any) =>
        fetchApi<any>('/blog/posts', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updatePost: async (id: string, data: any) =>
        fetchApi<any>(`/blog/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deletePost: async (id: string) =>
        fetchApi<any>(`/blog/posts/${id}`, { method: 'DELETE' }),
};

export default {
    auth,
    appointments,
    contact,
    blog,
};
