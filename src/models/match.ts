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
  hasForecast?: boolean;
  hasChat?: boolean;
  hasPostmatch?: boolean;
  hasPictures?: boolean;
  hasBet?: boolean;
  isDeleted?: boolean;
  hasRating?: boolean;
  _fields?: Field[] | string[];
  referee?: string;
}
