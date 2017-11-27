import { Team } from './team';
import { Field } from './field';

export class Match {
  _id: string;
  teams: {
    teamid: string | Team;
    teamName?: String;
    logo?: string;
    score?: number;
  }[];
  stadium?: string;
  weather?: string;
  startTime?: Date;
  competition?: string;
  round?: string;
  colors?: string[];
  sofaScoreId?: string;
  hasForecast?: boolean; /* deprecated */
  hasChat?: boolean; /* deprecated */
  hasPostmatch?: boolean; /* deprecated */
  hasPictures?: boolean; /* deprecated */
  hasBet?: boolean; /* deprecated */
  isDeleted?: boolean;
  hasRating?: boolean; /* deprecated */
  _fields?: Field[] | string[];
  referee?: string;
}
