export function fetchCount(amount: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(amount);
    }, 500);
  });
}
