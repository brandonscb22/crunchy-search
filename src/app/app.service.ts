import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  data: any;
  constructor(private httpClient: HttpClient) { }

  getToken() {
    return this.httpClient.post('https://www.crunchyroll.com/auth/v1/token', 'grant_type=client_id',
      {
        headers: {
          'authority': 'www.crunchyroll.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'es-419,es;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          'authorization': 'Basic Y3Jfd2ViOg==',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '_ga=GA1.1.1438194736.1701753213; c_locale=esLA; c_visitor=eabb99cc-ce0f-467f-b497-8379d0a25681; __cfruid=4633d0c8d56cec4dfcf335da299d85659581c06f-1703820052; ab.storage.userId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%22490e323c-5a79-5ab5-8646-7f0c45147746%22%2C%22c%22%3A1703820060402%2C%22l%22%3A1703820060405%7D; ab.storage.deviceId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%227e694fa0-5a50-330b-0ffb-ec57e2e5f76e%22%2C%22c%22%3A1703820060415%2C%22l%22%3A1703820060415%7D; ab.storage.sessionId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%220c2b31b4-9c2f-647c-0fd5-673fa1c08c64%22%2C%22e%22%3A1703821860422%2C%22c%22%3A1703820060404%2C%22l%22%3A1703820060422%7D; session_id=b672019c45bf0a5e875515d23bd6d635; _gcl_au=1.1.206405652.1710205876; cf_clearance=L5RbD2i0OK5sh.1H7OhIHLvEoqQu3WPWWeDQ88iGWNU-1710205876-1.0.1.1-KPR2y8k9rFQBzRJRpo7Mrh4bxu231MPdq2s1QL0_lgEcwCacv5apjf3SRM9MOPojHVZd8O8uK20O2OdpHQxxsQ; __cf_bm=litf7_URXqIZjbWV_KY71F4PKe7tKtCquj_vdpMXYyw-1710209766-1.0.1.1-rTErZrWNjZjaVghe77egS3b5urt.QR4_.lzYLdFzhSPD4gwjyX9eyRI1_pxEqKthsJbSvLdltqZ9OE.LxY8ERB7.jRe5jabD_66U2qg4qmA; ajs_anonymous_id=a031d6d4-ee7d-4c48-b51c-fbf0182f0481; _ga_SYYQC1VW88=GS1.1.1710209770.11.1.1710211053.58.0.0; _dd_s=rum=0&expire=1710211959203; _ga_METRICID=GS1.1.1710209770.6.1.1710211059.0.0.0',
          'etp-anonymous-id': 'a031d6d4-ee7d-4c48-b51c-fbf0182f0481',
          'origin': 'https://www.crunchyroll.com',
          'referer': 'https://www.crunchyroll.com/es/videos/alphabetical',
          'Access-Control-Allow-Origin': '*'
        }
      })
  }

  getPaginates(start: number = 0, token: string, n: number = 50) {
    return this.httpClient.get(`https://www.crunchyroll.com/content/v2/discover/browse?start=${start}&n=${n}&sort_by=alphabetical&ratings=true&locale=es-419`,
      {
        headers: {
          'authority': 'www.crunchyroll.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'es-419,es;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '_ga=GA1.1.1438194736.1701753213; c_locale=esLA; c_visitor=eabb99cc-ce0f-467f-b497-8379d0a25681; __cfruid=4633d0c8d56cec4dfcf335da299d85659581c06f-1703820052; ab.storage.userId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%22490e323c-5a79-5ab5-8646-7f0c45147746%22%2C%22c%22%3A1703820060402%2C%22l%22%3A1703820060405%7D; ab.storage.deviceId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%227e694fa0-5a50-330b-0ffb-ec57e2e5f76e%22%2C%22c%22%3A1703820060415%2C%22l%22%3A1703820060415%7D; ab.storage.sessionId.80f403d2-1c18-471d-b0ef-243d1d646436=%7B%22g%22%3A%220c2b31b4-9c2f-647c-0fd5-673fa1c08c64%22%2C%22e%22%3A1703821860422%2C%22c%22%3A1703820060404%2C%22l%22%3A1703820060422%7D; session_id=b672019c45bf0a5e875515d23bd6d635; _gcl_au=1.1.206405652.1710205876; cf_clearance=L5RbD2i0OK5sh.1H7OhIHLvEoqQu3WPWWeDQ88iGWNU-1710205876-1.0.1.1-KPR2y8k9rFQBzRJRpo7Mrh4bxu231MPdq2s1QL0_lgEcwCacv5apjf3SRM9MOPojHVZd8O8uK20O2OdpHQxxsQ; __cf_bm=litf7_URXqIZjbWV_KY71F4PKe7tKtCquj_vdpMXYyw-1710209766-1.0.1.1-rTErZrWNjZjaVghe77egS3b5urt.QR4_.lzYLdFzhSPD4gwjyX9eyRI1_pxEqKthsJbSvLdltqZ9OE.LxY8ERB7.jRe5jabD_66U2qg4qmA; ajs_anonymous_id=a031d6d4-ee7d-4c48-b51c-fbf0182f0481; _ga_SYYQC1VW88=GS1.1.1710209770.11.1.1710211053.58.0.0; _dd_s=rum=0&expire=1710211959203; _ga_METRICID=GS1.1.1710209770.6.1.1710211059.0.0.0',
          'etp-anonymous-id': 'a031d6d4-ee7d-4c48-b51c-fbf0182f0481',
          'origin': 'https://www.crunchyroll.com',
          'referer': 'https://www.crunchyroll.com/es/videos/alphabetical',
          'Access-Control-Allow-Origin': '*'
        }
      })
  }

}
