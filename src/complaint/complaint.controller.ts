import { Controller, Post, UseGuards, Request as NestRequest, Param, Body, Patch } from '@nestjs/common';
import { ComplaintService } from 'src/complaint/complaint.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

interface CreateComplaintProps {
  reason: string;
  description: string;
  topicId: number;
}

@Controller('complaints')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @UseGuards(AuthGuard)
  @Post('/:topicId')
  createComplaint(
    @Param() params: { topicId: number },
    @Body() requestDto: CreateComplaintProps,
    @NestRequest() request: RequestWithUser,
  ) {
    return this.complaintService.create(requestDto.reason, requestDto.description, params.topicId, request.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:complaintId')
  setReviewed(@Param() params: { complaintId: number }) {
    return this.complaintService.setReviewed(params.complaintId);
  }
}
