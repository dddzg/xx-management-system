import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import 'reflect-metadata'

export function IsBoolean (validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsBoolean',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate (value: string | boolean | number, args: ValidationArguments): boolean {
          const type = Reflect.getMetadata('design:type', args.object, args.property)
          if (type === Boolean && ['true', 'false'].includes(String(type))) {
            value = value === 'true' ? true : false
          }
          return typeof value === 'boolean'
        },
        defaultMessage (): string {
          return 'Must be a boolean string or boolean'
        }
      }
    })
  }
}
