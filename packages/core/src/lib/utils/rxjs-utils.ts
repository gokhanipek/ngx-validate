import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function takeUntilDestroy<T>(component: any): MonoTypeOperatorFunction<T> {
  const proto = Object.getPrototypeOf(component);
  const onDestroy = proto.ngOnDestroy;
  const destroy$ = new Subject<void>();

  proto.ngOnDestroy = function() {
    onDestroy.apply(this, arguments);

    destroy$.next();
    destroy$.complete();
  };

  return takeUntil<T>(destroy$);
}
