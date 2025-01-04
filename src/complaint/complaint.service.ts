import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from 'src/complaint/complaint.entity';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,
  ) {}

  async create(reason: string, description: string, topicId: number, userId: number): Promise<Complaint> {
    const complaint = new Complaint();
    complaint.reason = reason;
    complaint.description = description;
    complaint.reviewed = false;
    complaint.userId = userId;
    complaint.topicId = topicId;
    await this.complaintRepository.save(complaint);
    return complaint;
  }

  async setReviewed(complaintId: number): Promise<null> {
    const complaint = await this.complaintRepository.findOneBy({ id: complaintId });
    if (!complaint) {
      throw new BadRequestException();
    }
    await this.complaintRepository.update({ id: complaintId }, { reviewed: true });
    return null;
  }
}
