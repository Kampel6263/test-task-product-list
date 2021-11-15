import { environment } from '@src/environment';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export class HttpService {
  /**
   * Init
   */
  public constructor(private handler?: (error: AxiosError) => any) {}

  /**
   * Send api request
   */
  public async request({ headers = {}, ...config }: AxiosRequestConfig) {
    try {
      const response = await axios({
        baseURL: environment.apiUrl,
        method: 'get',
        headers: {
          crossDomain: true,
          token: localStorage.getItem('AUTH_TOKEN'),
          ...headers
        },
        ...config
      });

      return response.data;
    } catch (error) {
      if (!this.handler) {
        throw error;
      }

      const handled = await this.handler(error);

      if (handled) {
        return;
      }

      throw error;
    }
  }
}
