import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import 'reflect-metadata'

export function IsDateString (validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsDateString',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate (value: string | Date, args: ValidationArguments): boolean {
          const type = Reflect.getMetadata('design:type', args.object, args.property)
          if (type === Date && typeof value === 'string') {
            value = new Date(value)
          }
          if (/^\d+$/.test(value.toString()) && !isNaN(new Date(+value).getTime())) {
            value = new Date(+value).toDateString()
          }
          return !isNaN(Date.parse(value.toString())) || value instanceof Date
        },
        defaultMessage (): string {
          return 'Must be a date'
        }
      }
    })
  }
}
