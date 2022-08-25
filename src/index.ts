import { getOneofValue, isOneofGroup } from '@protobuf-ts/runtime';

type SimpleOneof =
    | { oneofKind: "a"; a: string; }
    | { oneofKind: "b"; b: number; }
    | { oneofKind: "c"; c: boolean; }
    | { oneofKind: undefined; };

// this works (similar to oneof.spec.ts)
function simpleTest(oneof: SimpleOneof): string | undefined {
    return getOneofValue(oneof, 'a');
}


interface Foo {
    foo: string;
}

interface Bar {
    bar: string;
}

// this type uses messages as oneof values
type FooBarOneof =
    | { oneofKind: "foo"; foo: Foo; }
    | { oneofKind: "bar"; bar: Bar; }
    | { oneofKind: undefined; };

function fooBarTest(oneof: FooBarOneof): void {
/*
Argument of type 'FooBarOneof' is not assignable to parameter of type 'UnknownOneofGroup'.
  Type '{ oneofKind: "foo"; foo: Foo; }' is not assignable to type 'UnknownOneofGroup'.
    Property 'foo' is incompatible with index signature.
      Type 'Foo' is not assignable to type 'UnknownScalar | UnknownMessage | undefined'.
        Type 'Foo' is not assignable to type 'UnknownMessage'.
          Index signature for type 'string' is missing in type 'Foo'.ts(2345)    
*/
    getOneofValue(oneof, 'foo');

    if (isOneofGroup(oneof)) {
        // Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)        
        getOneofValue(oneof, 'bar');
    }

}
