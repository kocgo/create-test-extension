export function pipe(...fns: ((...args: any[]) => any)[]) {
  return function piped(...v: any) {
    // Returns a function, no execution yet!
    for (let fn of fns) {
      v = fn(v); // Take the input, and start executing, re-assign 'v' each time
    }

    return v;
  };
}

export function compose(...fns: ((...args: any[]) => any)[]) {
  return pipe(...fns.reverse()); // Just reverse the order of functions
}
