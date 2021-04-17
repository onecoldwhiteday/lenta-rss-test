import { SimpleChanges } from '@angular/core';

function ifChanged(changes: SimpleChanges, key: string,
                   method: (value: any, prevValue?: any) => any) {
  const change = changes[key];
  if (change !== undefined) {
    const value = change.currentValue;
    if (value !== undefined) {
      method(value, change.previousValue);
    }
  }
}

export const onChangeHelper = {
  ifChanged
};
