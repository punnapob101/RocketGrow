import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-76a1e259`;

interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
  user?: any;
  accessToken?: string;
  progress?: any;
}

class ApiClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem('rocketGrowToken', token);
    } else {
      localStorage.removeItem('rocketGrowToken');
    }
  }

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('rocketGrowToken');
    }
    return this.accessToken;
  }

  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = options.headers && (options.headers as any).Authorization 
      ? undefined 
      : this.getAccessToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`API Error [${endpoint}]:`, data);
        return data;
      }

      return data;
    } catch (error) {
      console.error(`Network Error [${endpoint}]:`, error);
      return { 
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  async signup(name: string, email: string, password: string) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  async signin(email: string, password: string) {
    const response = await this.request('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.success && response.accessToken) {
      this.setAccessToken(response.accessToken);
    }

    return response;
  }

  async getUserProfile() {
    return this.request('/user-profile');
  }

  async updateCareer(career: string, careerName: string) {
    return this.request('/update-career', {
      method: 'POST',
      body: JSON.stringify({ career, careerName })
    });
  }

  async updateXP(xpToAdd: number) {
    return this.request('/update-xp', {
      method: 'POST',
      body: JSON.stringify({ xpToAdd })
    });
  }

  async updateProgress(type: string, itemId: string, progress: any) {
    return this.request('/update-progress', {
      method: 'POST',
      body: JSON.stringify({ type, itemId, progress })
    });
  }

  async getProgress(type: string) {
    return this.request(`/progress/${type}`);
  }

  async signout() {
    const response = await this.request('/signout', {
      method: 'POST'
    });
    
    if (response.success) {
      this.setAccessToken(null);
    }

    return response;
  }
}

export const apiClient = new ApiClient();
