/**
 * ### `use Debug instead`
 * ```
 * ``` */
declare var console: Console;

declare type StringKey = (string | number) | readonly (string | number);

declare type KeyLabel = { label: StringKey; value: StringKey };

declare type InputOptions =
  | Readonly<Array<StringKey | KeyLabel>>
  | Array<StringKey | KeyLabel>;
