interface SEOobject {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly twitterCard: string;
  readonly noindex: boolean;
  readonly ogType: TemplateType;
}
type TemplateType = "website" | "article";

declare type E164Number = string & {
  __tag?: "E164Number" | undefined;
};

interface DbPerson {
  readonly _id: string;
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly mothersMaidenName: string;
  readonly email: string;
  readonly about: string;
  readonly mothersMaidenName: string;
  readonly profilePhotoUrl: string;
  readonly phoneNumber: string;
  readonly contibutorId: string;
  readonly homeTown: string;
  readonly address: string;
  readonly dateOfDeath: string | null;
  readonly maritalStatus: "single" | "married" | "divorced" | "widowed";
  readonly facts: string[];
  readonly images: string[];
  readonly occupation: string;
  readonly placeOfBirth: string;
  readonly stateOfOrigin: string;
  readonly countryOfOrigin: string;
  readonly dateOfBirth: string;
  readonly showInPublicSearch: boolean;
  readonly isTreePrivate: boolean;
  readonly membership: string;
  readonly isTreePrivate: boolean;
  readonly personId: string;
}

interface APIResponse<TData> {
  success: boolean;
  data: Readonly<TData>;
  message: string;
}

interface DbPersonWithOutSuggestion {
  hasSugestion: false;
  personId: string;
}

interface DbPersonWithSuggestion {
  suggestions: DbSuggestion[];
  hasSugestion: true;
  _tempProfileId: string;
}

interface DbSuggestion {
  person: DbSuggestionPerson;
  contributor: DbContributor;
}

interface DbContributor {
  firstName: string;
  middleName: string;
  lastName: string;
}

interface DbSuggestionPerson {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  mothersMaidenName: string;
  phoneNumber: string;
  homeTown: string;
  facts: any[];
  userId: string;
  contibutorId: string;
  stateOfOrigin: string;
  countryOfOrigin: string;
  __v: number;
}

type DbCreatePerson = DbPersonWithSuggestion | DbPersonWithOutSuggestion;

interface DbLinks {
  readonly id: string;
  readonly description: string;
  readonly image: string;
  readonly label: string;
  readonly title: string;
  readonly parents: string[];
}
interface DbRelationship {
  links: DbLinks[];
  nodes: DbPerson[];
}
