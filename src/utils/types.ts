// type UserWithOnlyStreetAddress = OmitNext<User, 'address', 'street'>;

// type User = {
//   id: number,
//   name: string,
//   address: {
//     street: string,
//     zipcode: string,
//     geo: {
//       lat: string,
//       lng: string,
//     },
//   },
// };

// T is the Usert type
// K1 would be the union, id | name | address
// K2 would also be the union, street | zipcode | geo

// export type OmitNestedProp<T, K1 keyof T, K2 keyof T[K1]> = {
//   [P1 in K1]: {
//     [P2 in K2]:
//   };
// }

// OmitNestedProp<, "body", "psc"> = {
//   []
// }
