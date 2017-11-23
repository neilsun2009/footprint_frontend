import { Team } from './team';

export class User {
    _id: string;
    username: string;
    colors?: string[];
    access: string;
    avatar?: string;
    number?: string;
    _teams?: Team[];
}
