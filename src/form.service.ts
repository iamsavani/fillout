import { applyFilters } from './utils/utils';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { preprocessFilters } from 'src/utils/utils';

@Injectable()
export class FormService {
  constructor(private readonly httpService: HttpService) {}
  async fetchAndFilterFormResponses(id: string, filters: any[]) {
    const headersRequest = {
      Authorization: `Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    try {
      const apiResponse = await this.httpService
        .get(`https://api.fillout.com/v1/api/forms/${id}/submissions`, {
          headers: headersRequest,
        })
        .toPromise();

      const filterMap = preprocessFilters(filters);
      const filteredResponses = apiResponse.data.responses.filter((response) =>
        applyFilters(response, filterMap),
      );
      const result = {
        responses: filteredResponses,
        totalResponses: filteredResponses.length,
        pageCount: Math.ceil(filteredResponses.length / 10), // Assuming pageSize is defined
      };
      return result;
    } catch (error) {
      return { error: true };
    }
  }
}
