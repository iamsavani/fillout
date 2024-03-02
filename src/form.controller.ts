import { Controller, Get, Param, Query } from '@nestjs/common';
import { FormService } from './form.service';

@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id/filteredResponses')
  async filteredResponses(
    @Param('id') id: string,
    @Query('filters') filters: string,
  ) {
    const filterObjects = filters ? JSON.parse(filters) : [];
    const responses = await this.formService.fetchAndFilterFormResponses(
      id,
      filterObjects,
    );
    return responses;
  }
}
