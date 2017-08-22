import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import 'reflect-metadata'

export function IsNumber (validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  return (object: { [index: string]: string }, propertyName: string) => {
    registerDecorator({
      name: 'IsNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate (value: {}, args: ValidationArguments): boolean {
          const type = Reflect.getMetadata('design:type', args.object, args.property)
          if (type === Number && typeof value === 'string') {
            value = parseInt(value, 10)
            Object.defineProperty(arguments[1].object, arguments[1].property, { value })
            arguments[1].value = value
          }
          return typeof value === 'number' && !isNaN(value)
        },
        defaultMessage (): string {
          return 'Must be a number or string that can be parsed into number'
        }
      }
    })
  }
}
