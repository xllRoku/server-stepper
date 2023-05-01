import { test } from 'uuid-random';
import { VOFormatException } from '../../errors';
import { ValueObject } from './value.objects';

export class UuidVO extends ValueObject<string> {
    public equals(valueObject: UuidVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (!test(value)) {
            throw new VOFormatException(UuidVO.name, value);
        }
    }
}
