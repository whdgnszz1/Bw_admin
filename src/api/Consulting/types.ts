export interface CreateConsultingDTO {
  content: string;
  studentId: string;
  consultantId: string;
  startDate: string;
  endDate: string;
}

export interface ConsultingCommentDTO {
  consultingCommentId: number;
  consultingId: number;
  userId: number;
  userName: string;
  profileUrl: string;
  content: string;
  createdAt: Date;
}

export interface ConsultingDTO {
  consultingId: number;
  isRead: boolean;
  consultant: string;
  student: string;
  grade: number;
  content: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  comments: ConsultingCommentDTO[];
}
