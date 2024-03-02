import { Controller, Get, Param } from '@nestjs/common';
import { FormService } from './form.service';

@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id/filteredResponses')
  filteredResponses(@Param('id') id: string) {
    return id;
  }
}
