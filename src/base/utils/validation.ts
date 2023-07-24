import type { InferType, ISchema } from "yup";

export interface HandleValidationArgs<T extends ISchema<unknown>> {
  onSuccess(data: InferType<T>): void;
  onError(data: string): void;
  schema: T;
  data: unknown;
}

export const handleSchemaValidation = async <T extends ISchema<unknown>>(
  args: HandleValidationArgs<T>
) => {
  const { data, onError, onSuccess, schema } = args;

  try {
    const res = await schema.validate(data);

    onSuccess(res);
  } catch (error) {
    const err = String(error).split(":");
    onError(err[1].trim());
  }
};
