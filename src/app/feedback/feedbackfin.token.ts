import { InjectionToken } from '@angular/core';
import { FeedbackFinConfig } from 'feedbackfin';

export type FeedbackfinProvider = {
  config: FeedbackFinConfig;
};
export const FeedbackFinToken = new InjectionToken<FeedbackfinProvider>('feedbackfin');
