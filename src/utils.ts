export function pipe(...fns: ((...args: any[]) => any)[]) {
  return function piped(...v: any) {
    // Returns a function, no execution yet!
    for (let fn of fns) {
      v = fn(v); // Take the input, and start executing, re-assign 'v' each time
    }

    return v;
  };
}

export const compose = (...fns: any) =>
  fns.reduceRight(
    (f: any, g: any) =>
      (...args: any) =>
        g(f(...args))
  );
