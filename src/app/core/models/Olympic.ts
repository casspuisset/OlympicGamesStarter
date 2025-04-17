// Interface for olympic country
import { OlympicParticipation } from './Participation';

export interface OlympicCountry {
  id: number;
  country: string;
  participations: [
    {
      OlympicParticipation: OlympicParticipation;
    }
  ];
}
