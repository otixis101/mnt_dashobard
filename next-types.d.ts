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
  readonly id: string;
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly mothersMaidenName: string;
  readonly email: string;
  readonly mothersMaidenName: string;
  readonly phoneNumber: string;
  readonly contibutorId: string;
  readonly homeTown: string;
  readonly address: string;
  readonly dateOfDeath: string | null;
  readonly maritalStatus: "single" | "married" | "divorced" | "widowed";
  readonly facts: string[];
  readonly occupation: string;
  readonly placeOfBirth: string;
  readonly dateOfBirth: string;
}
