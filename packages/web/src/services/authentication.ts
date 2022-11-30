import { EventSystem } from '@utils';

import { api } from './api';

// Types -----------------------------------------------------------------------

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Event = 'update';

// Core ------------------------------------------------------------------------

class AuthenticationManager {

  private readonly eventSystem = new EventSystem<Event>();

  async login(email: string, password: string) {
    const { data } = await api.post<Tokens>('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    this.eventSystem.trigger('update');
  }

  async register(whatsapp: string, email: string, password: string) {
    const { data } = await api.post<Tokens>('/auth/register', { whatsapp, email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    this.eventSystem.trigger('update');
  }

  async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.eventSystem.trigger('update');
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  }

  on(event: Event, callback: () => void) {
    this.eventSystem.on(event, callback);
  }
}

const authenticationManager = new AuthenticationManager();
export { authenticationManager };