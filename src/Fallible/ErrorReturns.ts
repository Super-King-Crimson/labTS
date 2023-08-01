//now your errors don't even have to be errors!

type Result<T, E> = T | E;
type Option<T> = T | null;