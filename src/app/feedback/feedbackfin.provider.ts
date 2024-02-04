import feedbackfin from 'feedbackfin';
import { FeedbackFinToken } from './feedbackfin.token';

export const FeedbackFinProvider = {
  provide: FeedbackFinToken,
  useValue: feedbackfin,
};
